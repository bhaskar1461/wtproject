import express from "express";
import { requireAuth, requireRole } from "../middleware/auth.js";
import Ticket from "../models/Ticket.js";
import { createNotification } from "../utils/notifications.js";

const router = express.Router();

async function notifyTicketUpdate(ticket, title, message) {
  await createNotification({
    userId: ticket.user,
    title,
    message,
    ticketId: ticket._id,
  });
}

router.get("/", requireAuth, async (req, res) => {
  const filter = req.user.role === "admin" ? {} : { user: req.user._id };
  const tickets = await Ticket.find(filter)
    .populate("user", "name email rollNumber department role")
    .sort({ createdAt: -1 });

  return res.json({ tickets });
});

router.get("/admin/summary", requireAuth, requireRole("admin"), async (req, res) => {
  const tickets = await Ticket.find().sort({ createdAt: -1 }).populate(
    "user",
    "name email rollNumber department"
  );

  const summary = {
    total: tickets.length,
    open: tickets.filter((ticket) => ticket.status === "Open").length,
    inProgress: tickets.filter((ticket) => ticket.status === "In Progress").length,
    resolved: tickets.filter((ticket) => ticket.status === "Resolved").length,
  };

  return res.json({ summary, tickets });
});

router.get("/:id", requireAuth, async (req, res) => {
  const ticket = await Ticket.findById(req.params.id).populate(
    "user",
    "name email rollNumber department role"
  );

  if (!ticket) {
    return res.status(404).json({ message: "Ticket not found." });
  }

  if (req.user.role !== "admin" && ticket.user._id.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: "You do not have access to this ticket." });
  }

  return res.json({ ticket });
});

router.post("/", requireAuth, async (req, res) => {
  try {
    const { subject, category, priority, description } = req.body;

    const ticket = await Ticket.create({
      user: req.user._id,
      subject,
      category,
      priority,
      description,
    });

    await notifyTicketUpdate(
      ticket,
      "Ticket created",
      `Your ticket "${ticket.subject}" was submitted successfully.`
    );

    const populatedTicket = await ticket.populate(
      "user",
      "name email rollNumber department role"
    );

    return res.status(201).json({ ticket: populatedTicket });
  } catch (error) {
    return res.status(500).json({ message: "Could not create ticket.", error });
  }
});

router.patch("/:id", requireAuth, requireRole("admin"), async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found." });
    }

    const previousStatus = ticket.status;
    const { status, assignedTo, resolutionNote, priority } = req.body;

    if (status) {
      ticket.status = status;
    }

    if (assignedTo !== undefined) {
      ticket.assignedTo = assignedTo;
    }

    if (resolutionNote !== undefined) {
      ticket.resolutionNote = resolutionNote;
    }

    if (priority) {
      ticket.priority = priority;
    }

    if (ticket.status === "Resolved" && !ticket.resolvedAt) {
      ticket.resolvedAt = new Date();
    }

    if (ticket.status !== "Resolved") {
      ticket.resolvedAt = null;
    }

    await ticket.save();

    if (previousStatus !== ticket.status || assignedTo !== undefined || resolutionNote !== undefined) {
      const updateParts = [];

      if (previousStatus !== ticket.status) {
        updateParts.push(`status changed to ${ticket.status}`);
      }

      if (assignedTo) {
        updateParts.push(`assigned to ${assignedTo}`);
      }

      if (resolutionNote) {
        updateParts.push("resolution notes added");
      }

      await notifyTicketUpdate(
        ticket,
        "Ticket updated",
        `Your ticket "${ticket.subject}" was updated: ${updateParts.join(", ")}.`
      );
    }

    const populatedTicket = await ticket.populate(
      "user",
      "name email rollNumber department role"
    );

    return res.json({ ticket: populatedTicket });
  } catch (error) {
    return res.status(500).json({ message: "Could not update ticket.", error });
  }
});

router.post("/:id/feedback", requireAuth, async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found." });
    }

    if (ticket.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "You can only review your own ticket." });
    }

    const { rating, comment } = req.body;

    ticket.feedback = {
      rating,
      comment,
      submittedAt: new Date(),
    };

    await ticket.save();

    await createNotification({
      userId: req.user._id,
      title: "Feedback submitted",
      message: `Thanks for sharing feedback on "${ticket.subject}".`,
      ticketId: ticket._id,
    });

    return res.json({ ticket });
  } catch (error) {
    return res.status(500).json({ message: "Could not save feedback.", error });
  }
});

export default router;

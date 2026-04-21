import express from "express";
import { requireAuth } from "../middleware/auth.js";
import Notification from "../models/Notification.js";

const router = express.Router();

router.get("/", requireAuth, async (req, res) => {
  try {
    const notifications = await Notification.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .limit(50);

    return res.json({ notifications });
  } catch (error) {
    return res.status(500).json({ message: "Could not fetch notifications.", error });
  }
});

router.patch("/:id/read", requireAuth, async (req, res) => {
  try {
    await Notification.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      { read: true }
    );
    return res.json({ success: true });
  } catch (error) {
    return res.status(500).json({ message: "Could not mark notification as read.", error });
  }
});

export default router;

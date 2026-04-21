import express from "express";
import { requireAuth } from "../middleware/auth.js";

const router = express.Router();

router.post("/", requireAuth, (req, res) => {
  const { subject, body } = req.body;

  return res.json({
    message: "Email draft generated.",
    draft: {
      subject: subject || "Helpdesk follow-up",
      body:
        body ||
        "Hello team, I am following up on my helpdesk request. Please share the latest update when possible.",
    },
  });
});

export default router;

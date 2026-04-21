import express from "express";
import { requireAuth } from "../middleware/auth.js";

const router = express.Router();

router.get("/", requireAuth, (req, res) => {
  return res.json({
    tips: [
      "Use a clear subject with the exact location.",
      "Choose the right department to reduce routing delays.",
      "Add steps already tried so the helpdesk can respond faster.",
    ],
  });
});

export default router;

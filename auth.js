import bcrypt from "bcryptjs";
import express from "express";
import User from "../models/User.js";
import { requireAuth } from "../middleware/auth.js";
import { serializeUser } from "../utils/serializeUser.js";
import { signToken } from "../utils/token.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { name, email, rollNumber, department, password, role, adminCode } = req.body;

    if (!name || !email || !rollNumber || !department || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const existingUser = await User.findOne({
      $or: [{ email: email.toLowerCase() }, { rollNumber }],
    });

    if (existingUser) {
      return res
        .status(409)
        .json({ message: "Email or roll number already exists." });
    }

    const nextRole = role === "admin" ? "admin" : "student";

    if (
      nextRole === "admin" &&
      adminCode !== (process.env.ADMIN_ACCESS_CODE || "helpdesk-admin")
    ) {
      return res.status(403).json({ message: "Invalid admin access code." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email: email.toLowerCase(),
      rollNumber,
      department,
      password: hashedPassword,
      role: nextRole,
    });

    const token = signToken(user._id.toString());

    return res.status(201).json({
      token,
      user: serializeUser(user),
    });
  } catch (error) {
    return res.status(500).json({ message: "Registration failed.", error });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email?.toLowerCase() });

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    const token = signToken(user._id.toString());

    return res.json({
      token,
      user: serializeUser(user),
    });
  } catch (error) {
    return res.status(500).json({ message: "Login failed.", error });
  }
});

router.get("/me", requireAuth, async (req, res) => {
  return res.json({ user: serializeUser(req.user) });
});

router.put("/profile", requireAuth, async (req, res) => {
  try {
    const { name, email, rollNumber, department } = req.body;

    req.user.name = name ?? req.user.name;
    req.user.email = email?.toLowerCase() ?? req.user.email;
    req.user.rollNumber = rollNumber ?? req.user.rollNumber;
    req.user.department = department ?? req.user.department;

    await req.user.save();

    return res.json({ user: serializeUser(req.user) });
  } catch (error) {
    return res.status(500).json({ message: "Profile update failed.", error });
  }
});

export default router;

import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import authRoutes from "./routes/auth.js";
import emailRoutes from "./routes/emails.js";
import notificationRoutes from "./routes/notifications.js";
import prepRoutes from "./routes/prep.js";
import templateRoutes from "./routes/templates.js";
import { connectMongo } from "./mongoUri.js";

dotenv.config();

const app = express();
const port = Number(process.env.PORT || 5003);

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
  })
);
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ message: "College Helpdesk API is running." });
});

app.use("/api/auth", authRoutes);
app.use("/api/templates", templateRoutes);
app.use("/api/tickets", templateRoutes);
app.use("/api/prep", prepRoutes);
app.use("/api/emails", emailRoutes);
app.use("/api/notifications", notificationRoutes);

async function startServer() {
  try {
    await connectMongo(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Failed to start server", error);
    process.exit(1);
  }
}

startServer();

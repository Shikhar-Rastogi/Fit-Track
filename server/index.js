const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");

const UserRoutes = require("./routes/User.js");
const ChatRoutes = require("./routes/chat.js");

dotenv.config();

const app = express();

/* ===================== MIDDLEWARE ===================== */

// ✅ CORS (Frontend on Vercel + Local Dev)
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      /\.vercel\.app$/,  
    ],
    credentials: true,
  })
);


app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));

/* ===================== ROUTES ===================== */

app.use("/api/user", UserRoutes);
app.use("/api/chat", ChatRoutes);

// Health check (VERY IMPORTANT for Render testing)
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "OK" });
});

// Root route
app.get("/", (req, res) => {
  res.status(200).json({ message: "Server running" });
});

/* ===================== ERROR HANDLER ===================== */

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong";
  return res.status(status).json({
    success: false,
    status,
    message,
  });
});

/* ===================== DATABASE ===================== */

const connectDB = async () => {
  try {
    mongoose.set("strictQuery", true);
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.error("❌ MongoDB connection failed");
    console.error(error);
    process.exit(1);
  }
};

/* ===================== SERVER START ===================== */

const PORT = process.env.PORT || 8080;

const startServer = async () => {
  await connectDB();
  app.listen(PORT, () =>
    console.log(`🚀 Server running on port ${PORT}`)
  );
};

startServer();

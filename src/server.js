import "dotenv/config";

import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

import quoteRoutes from "./routes/quote.routes.js";
import contactRoutes from "./routes/contact.routes.js";
import { verifyEmailConnection } from "./services/email.service.js";


const app = express();

const PORT = Number(process.env.PORT) || 5000;

const FRONTEND_URL =
  process.env.FRONTEND_URL || "http://localhost:5173";

// ==========================================
// SECURITY
// ==========================================

app.use(helmet());

// ==========================================
// CORS
// ==========================================

app.use(
  cors({
    origin: FRONTEND_URL,
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  })
);

// ==========================================
// JSON BODY
// ==========================================

app.use(
  express.json({
    limit: "1mb",
  })
);

// ==========================================
// HEALTH CHECK
// ==========================================

app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "FlightsDealNow API is running",
    timestamp: new Date().toISOString(),
  });
});

// ==========================================
// QUOTE RATE LIMIT
// ==========================================

const quoteLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,

  standardHeaders: true,
  legacyHeaders: false,

  message: {
    success: false,
    message: "Too many quote requests. Please try again later.",
  },
});

// ==========================================
// QUOTE ROUTE
// ==========================================

app.use("/api/quote", quoteLimiter, quoteRoutes);
app.use("/api/contact", quoteLimiter, contactRoutes);
// ==========================================
// 404
// ==========================================

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "API endpoint not found.",
  });
});

// ==========================================
// GLOBAL ERROR HANDLER
// ==========================================

app.use((error, req, res, next) => {
  console.error("SERVER ERROR:", error);

  res.status(500).json({
    success: false,
    message: "Internal server error.",
  });
});

// ==========================================
// START SERVER
// ==========================================

const startServer = async () => {
  try {
    await verifyEmailConnection();

    app.listen(PORT, () => {
      console.log(
        `FlightsDealNow API running on port ${PORT}`
      );

      console.log(
        `Health: http://localhost:${PORT}/api/health`
      );
    });
  } catch (error) {
    console.error(
      "SMTP connection failed:",
      error.message
    );

    process.exit(1);
  }
};

startServer();
import express from "express";
import cors from "cors";
import routes from "./routes/index.js";

const app = express();

// CORS handles OPTIONS automatically - no manual handler needed
app.use(cors({
  origin: [
    "https://frelance-connect.vercel.app",
    "https://frelance-connect-kl9l.vercel.app",
    "http://localhost:5173",
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(express.json());

app.use((req, res, next) => {
  console.log("➡️", req.method, req.url);
  next();
});

app.use("/api", routes);
app.use((req, res) => {
  console.log("❌ No route matched:", req.method, req.url);
  res.status(404).json({ message: "Route not found", path: req.url });
});

export default app;
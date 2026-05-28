import express from "express";
import v1Routes from "./v1/index.js";

const router = express.Router();
console.log("✅ Routes loaded");
router.use("/v1", v1Routes);

export default router;
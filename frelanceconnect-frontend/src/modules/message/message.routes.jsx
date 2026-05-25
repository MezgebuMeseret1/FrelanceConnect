import { authMiddleware } from "../../core/middleware/auth.middleware.js";
router.post("/", authMiddleware, controller.sendMessage);
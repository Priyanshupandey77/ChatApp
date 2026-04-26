import express from "express";
import { CreateOrAccessChat } from "../controllers/chatController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, CreateOrAccessChat);

export default router;

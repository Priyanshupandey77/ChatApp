import express from "express";
import { CreateOrAccessChat, getChats } from "../controllers/chatController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, CreateOrAccessChat);
router.get("/",protect,  getChats);

export default router;

import express, { application } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { protect } from "./middleware/authMiddleware.js";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import { Server, Socket } from "socket.io";

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use("/api/auth", authRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () =>
  console.log(`Server is running on port ${PORT}`),
);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});

io.on("connection", (Socket) => {
  console.log("User connected:", Socket.id);

  Socket.on("joinChat", (chatId) => {
    Socket.join(chatId);
    console.log("User joined chat:", chatId);
  });

  Socket.on("disconnect", () => {
    console.log("User disconnected:", Socket.id);
  });
});

import express, { application } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { protect } from "./middleware/authMiddleware.js";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";


dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());
app.use("/api/auth", authRoutes);


app.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

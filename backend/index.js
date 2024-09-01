
import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { v2 as cloudinary } from "cloudinary";

import authRoutes from "./routers/authroute.js";
import userRoutes from "./routers/userroute.js";
import postRoutes from "./routers/postroute.js";
import notificationRoutes from "./routers/notification.js";
import cors from 'cors';

import connectMongoDB from "./db/mongodb.js";

dotenv.config();

cloudinary.config({
	cloud_name: "dddyfvbnk",
	api_key: "569288178987485",
	api_secret: "1ewYir7Pj6q3y2thfzLsc3UR9C0",
});

const app = express();
const PORT = 8080 || 5000;
const __dirname = path.resolve();
const corsOption = {
  origin: true,
  methods: ["POST", "GET", "PUT", "DELETE", "OPTIONS"],
  credentials: true,
};

app.use(cors(corsOption));
app.options("*", cors(corsOption));
app.use(express.json({ limit: "5mb" })); // to parse req.body
// limit shouldn't be too high to prevent DOS
app.use(express.urlencoded({ extended: true })); // to parse form data(urlencoded)

app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/notifications", notificationRoutes);

app.get("/",(req,res)=>{
  res.json({
    massage:"working",
  });
})
if ("development" === "production") {
	app.use(express.static(path.join(__dirname, "/frontend/dist")));

	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
	});
}

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
	connectMongoDB();
});

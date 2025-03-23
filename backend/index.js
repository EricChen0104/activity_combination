import express from "express";
import userRouter from "./routes/user.route.js";
import postRouter from "./routes/post.route.js";
import connectDB from "./lib/connectDB.js";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

const frontendURL = process.env.FRONTEND_URL || "http://localhost:5173";
console.log("FRONTEND_URL:", frontendURL);

app.use(
  cors({
    origin: frontendURL,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.get("/", (req, res) => {
  connectDB();
  res.status(200).send("API is running");
});

app.use("/users", userRouter);
app.use("/posts", postRouter);

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    message: error.message || "Something went wrong!!",
    status: error.status,
    stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
  });
});

let isConnected = false;
app.use(async (req, res, next) => {
  if (!isConnected) {
    console.log("Attempting DB connection:", new Date());
    await connectDB();
    console.log("DB connected:", new Date());
    isConnected = true;
  }
  next();
});

export default app;

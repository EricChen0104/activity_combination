import express from "express";
import userRouter from "./routes/user.route.js";
import postRouter from "./routes/post.route.js";
import connectDB from "./lib/connectDB.js";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

const frontendURL = process.env.FRONTEND_URL || "http://localhost:5173"; // Use environment variable, default to localhost

// Production CORS configuration (recommended)
app.use(
  cors({
    origin: frontendURL, //  Allow requests from this origin only
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"], // Specify allowed methods
    allowedHeaders: ["Content-Type", "Authorization"], // Specify allowed headers (important if you're using Authorization headers)
  })
);
// app.get("/test", (req, res) => {
//   res.status(200).send("it works!");
// });

app.use("/users", userRouter);
app.use("/posts", postRouter);

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    message: error.message || "Something went wrong!!",
    status: error.status,
    stack: error.stack,
  });
});

const port = process.env.PORT || 3000; // Use environment variable for port

app.listen(port, () => {
  connectDB();
  console.log("Server is running");
});

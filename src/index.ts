import express, { Request, Response } from "express";
import * as dotenv from "dotenv";
import mongoose, { connect } from "mongoose";
import Helmet from "helmet";
import morgan from "morgan";
import userRouter from "./PGB_server/routers/userRouter";
import lessonRouter from "./PGB_server/routers/lessonRouter";
import courseRouter from "./PGB_server/routers/courseRouter";
import moduleRouter from "./PGB_server/routers/moduleRouter";

dotenv.config();
const port = process.env.PORT; // default port to listen

mongoose
  .connect(process.env.MONGO_DB)
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((error) => {
    console.log(` MongoDB failed to connect: ${error}`);
  });

const app = express();
app.use(express.json());
app.use(Helmet());
app.use(morgan("common"));

app.use("/user", userRouter);
app.use("/lesson", lessonRouter);
app.use("/course", courseRouter);
app.use("/module", moduleRouter);

// define a route handler for the default home page
app.get("/", (req, res) => {
  res.send("Hello my finish world!");
});

// start the Express server
app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});

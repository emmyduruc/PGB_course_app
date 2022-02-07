import express, { Request, Response } from "express";
import * as dotenv from "dotenv";
import mongoose, { connect } from "mongoose";
import cors from "cors";
import Helmet from "helmet";
import morgan from "morgan";
import userRouter from "./PGB_server/routers/userRouter";
import lessonRouter from "./PGB_server/routers/lessonRouter";
import courseRouter from "./PGB_server/routers/courseRouter";
import moduleRouter from "./PGB_server/routers/moduleRouter";
import googleLoginRouter from "./PGB_server/routers/googleLoginRouter";
import passport from "passport";
import { googleStrategy, jwtStrategy } from "./PGB_server/passport/passport";

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

app.use(cors());

app.use(passport.initialize());

passport.use(googleStrategy);

passport.use(jwtStrategy);

app.use(express.json());
app.use(Helmet());
app.use(morgan("common"));

app.use("/user", userRouter);
app.use("/lesson", lessonRouter);
app.use("/course", courseRouter);
app.use("/module", moduleRouter);
app.use("/google_login", googleLoginRouter);

// define a route handler for the default home page
app.get("/", (req, res) => {
  res.send("Hello welcome to PGB server!");
});

// start the Express server
app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});

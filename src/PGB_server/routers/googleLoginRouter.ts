import passport from "passport";

import express from "express";
import goggleLoginUsers from "../controllers/googleLoginController";

const router = express.Router();

router.post(
  "/",
  passport.authenticate("google-id-token", { session: false }),
  goggleLoginUsers
);

export default router;

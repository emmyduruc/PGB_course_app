import express from "express";

import {
  register,
  login,
  updateUser,
  findAllUser,
  findUserById,
  adminCheck,
  deleteUser,
  followUser,
} from "../controllers/userControllers";

const router = express.Router();

// Every path we define here will get /api/v1/movies prefix

router.post("/", register);
router.get("/", findAllUser);
router.post("/", adminCheck);
router.post("/login", login);
router.put("/:userId", updateUser);
router.put("/:userId/follow", followUser);
router.get("/:userId", findUserById);
router.delete("/:userId", deleteUser);

export default router;

import express from "express";

import {
  createLesson,
  updateLesson,
  deleteLesson,
  findAllLesson,
  findLessonById,
} from "../controllers/lessonsController";

const router = express.Router();

// Every path we define here will get /api/v1/course prefix

router.post("/", createLesson);
router.get("/", findAllLesson);
router.put("/:lessonId", updateLesson);
router.get("/:lessonId", findLessonById);
router.delete("/:lessonId", deleteLesson);

export default router;

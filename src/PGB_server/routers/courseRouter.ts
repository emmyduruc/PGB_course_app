import express from "express";

import {
  createCourse,
  updateCourse,
  deleteCourse,
  findAllCourses,
  findCourseById,
} from "../controllers/courseControllers";

const router = express.Router();

// Every path we define here will get /api/v1/course prefix

router.post("/", createCourse);
router.get("/", findAllCourses);
router.put("/:courseId", updateCourse);
router.get("/:courseId", findCourseById);
router.delete("/:courseId", deleteCourse);

export default router;

import { Request, Response, NextFunction } from "express";
import { BadRequestError } from "../helpers/errorHandlers";
import Users from "../models/userModel";
import coursesModel, { CourseDocument } from "../models/coursesModel";
import courseService from "../services/courseServices";

//POST/creates course
export const createCourse = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { desc, title, module } = req.body;
    const courses = new coursesModel({
      desc,
      title,
      module,
    });
    const createdCourses = await courseService.createCourses(courses);
    res.json(createdCourses);
  } catch (error) {
    if (error instanceof Error && error.name == "ValidationError") {
      next(new BadRequestError("Invalid Request", error));
    } else {
      next(error);
    }
  }
};

//PUT
export const updateCourse = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const update = req.body;
    const courseId = req.params.courseId;
    const updatedCourse = await courseService.updateCourses(courseId, update);
    res.json(updatedCourse);
  } catch (error) {
    if (error instanceof Error && error.name == "ValidationError") {
      next(new BadRequestError("Invalid Request", error));
    } else {
      next(error);
    }
  }
};

// GET /courses (gets all existing lesson)
export const findAllCourses = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await courseService.findAllCourses());
  } catch (error) {
    if (error instanceof Error && error.name == "ValidationError") {
      next(new BadRequestError("Invalid Request", error));
    } else {
      next(error);
    }
  }
};

// GET /lesson/:lessonId //get the existing resource
export const findLessonById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await courseService.findAllCoursesById(req.params.courseId));
  } catch (error) {
    if (error instanceof Error && error.name == "ValidationError") {
      next(new BadRequestError("Invalid Request", error));
    } else {
      next(error);
    }
  }
};

// DELETE /course/:courseId //Delete an existing resource
export const deleteCourse = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await courseService.deleteCoursesById(req.params.courseId);
    res.status(204).end();
  } catch (error) {
    if (error instanceof Error && error.name == "ValidationError") {
      next(new BadRequestError("Invalid Request", error));
    } else {
      next(error);
    }
  }
};

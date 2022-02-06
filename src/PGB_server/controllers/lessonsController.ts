import { Request, Response, NextFunction } from "express";
import { BadRequestError } from "../helpers/errorHandlers";
import Users from "../models/userModel";
import lessonModel, { lessonDocument } from "../models/lessonsModel";
import lessonService from "../services/lessonServices";

//POST/creates lessons
export const createLesson = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { desc, title, lesson } = req.body;
    const lessons = new lessonModel({
      desc,
      title,
      lesson,
    });
    const createdLesson = await lessonService.createLessons(lessons);
    res.json(createdLesson);
  } catch (error) {
    if (error instanceof Error && error.name == "ValidationError") {
      next(new BadRequestError("Invalid Request", error));
    } else {
      next(error);
    }
  }
};

//PUT
export const updateLesson = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const update = req.body;
    const lessonId = req.params.lessonId;
    const updatedLesson = await lessonService.updateLessons(lessonId, update);
    res.json(updatedLesson);
  } catch (error) {
    if (error instanceof Error && error.name == "ValidationError") {
      next(new BadRequestError("Invalid Request", error));
    } else {
      next(error);
    }
  }
};

// GET /lessons (gets all existing lesson)
export const findAllLesson = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await lessonService.findAllLessons());
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
    res.json(await lessonService.findAllLessonsById(req.params.lessonId));
  } catch (error) {
    if (error instanceof Error && error.name == "ValidationError") {
      next(new BadRequestError("Invalid Request", error));
    } else {
      next(error);
    }
  }
};

// DELETE /lesson/:lessonId //Delete an existing resource
export const deleteLesson = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await lessonService.deleteLessonById(req.params.lessonId);
    res.status(204).end();
  } catch (error) {
    if (error instanceof Error && error.name == "ValidationError") {
      next(new BadRequestError("Invalid Request", error));
    } else {
      next(error);
    }
  }
};

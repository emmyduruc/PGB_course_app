import { lessonDocument } from "../models/lessonsModel";
import Lessons from "../models/lessonsModel";
import {
  ForbiddenError,
  InternalServerError,
  NotFoundError,
} from "../helpers/errorHandlers";

//POST
const createLessons = async (userDocument: lessonDocument) => {
  const createdLessons = await userDocument.save();
  return createdLessons;
};

//PUT to update
const updateLessons = async (
  lessonId: string,
  update: Partial<lessonDocument>
): Promise<lessonDocument | null> => {
  const foundLessons = await Lessons.findByIdAndUpdate(lessonId, update, {
    new: true,
  });

  if (!foundLessons) {
    throw new NotFoundError(`Lesson ${lessonId} not found`);
  }

  return foundLessons;
};

//GET all lessons
const findAllLessons = async (): Promise<lessonDocument[]> => {
  return Lessons.find();
};

//GET a lessons byId
const findAllLessonsById = async (
  lessonId: string
): Promise<lessonDocument> => {
  const foundLesson = await Lessons.findById(lessonId);

  if (!foundLesson) {
    throw new NotFoundError(`Lesson ${lessonId} not found`);
  }

  return foundLesson;
};

//Delete lessons by Id
const deleteLessonById = async (lessonId: string): Promise<lessonDocument> => {
  const foundLesson = await Lessons.findById(lessonId);

  if (!foundLesson) {
    throw new NotFoundError(`Lesson ${lessonId} not found`);
  }

  return foundLesson;
};

export default {
  createLessons,
  updateLessons,
  deleteLessonById,
  findAllLessons,
  findAllLessonsById,
};

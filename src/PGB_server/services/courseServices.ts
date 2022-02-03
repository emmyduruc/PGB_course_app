import { CourseDocument } from "../models/coursesModel";
import Courses from "../models/coursesModel";
import {
  ForbiddenError,
  InternalServerError,
  NotFoundError,
} from "../helpers/errorHandlers";

//POST courses
const createCourses = async (courseDocument: CourseDocument) => {
  const createdLessons = await courseDocument.save();
  return createdLessons;
};

//PUT to update
const updateCourses = async (
  courseId: string,
  update: Partial<CourseDocument>
): Promise<CourseDocument | null> => {
  const foundLessons = await Courses.findByIdAndUpdate(courseId, update, {
    new: true,
  });

  if (!foundLessons) {
    throw new NotFoundError(`Lesson ${courseId} not found`);
  }

  return foundLessons;
};

//GET all courses
const findAllCourses = async (): Promise<CourseDocument[]> => {
  return Courses.find();
};

//GET a courses byId
const findAllCoursesById = async (
  courseId: string
): Promise<CourseDocument> => {
  const foundCourses = await Courses.findById(courseId);

  if (!foundCourses) {
    throw new NotFoundError(`Lesson ${courseId} not found`);
  }

  return foundCourses;
};

//Delete courses by Id
const deleteCoursesById = async (courseId: string): Promise<CourseDocument> => {
  const foundCourses = await Courses.findById(courseId);

  if (!foundCourses) {
    throw new NotFoundError(`Lesson ${courseId} not found`);
  }
  return foundCourses;
};

export default {
  createCourses,
  updateCourses,
  deleteCoursesById,
  findAllCourses,
  findAllCoursesById,
};

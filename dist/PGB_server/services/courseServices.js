"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const coursesModel_1 = __importDefault(require("../models/coursesModel"));
const errorHandlers_1 = require("../helpers/errorHandlers");
//POST courses
const createCourses = (courseDocument) => __awaiter(void 0, void 0, void 0, function* () {
    const createdLessons = yield courseDocument.save();
    return createdLessons;
});
//PUT to update
const updateCourses = (courseId, update) => __awaiter(void 0, void 0, void 0, function* () {
    const foundLessons = yield coursesModel_1.default.findByIdAndUpdate(courseId, update, {
        new: true,
    });
    if (!foundLessons) {
        throw new errorHandlers_1.NotFoundError(`Lesson ${courseId} not found`);
    }
    return foundLessons;
});
//GET all courses
const findAllCourses = () => __awaiter(void 0, void 0, void 0, function* () {
    return coursesModel_1.default.find();
});
//GET a courses byId
const findAllCoursesById = (courseId) => __awaiter(void 0, void 0, void 0, function* () {
    const foundCourses = yield coursesModel_1.default.findById(courseId);
    if (!foundCourses) {
        throw new errorHandlers_1.NotFoundError(`Lesson ${courseId} not found`);
    }
    return foundCourses;
});
//Delete courses by Id
const deleteCoursesById = (courseId) => __awaiter(void 0, void 0, void 0, function* () {
    const foundCourses = yield coursesModel_1.default.findById(courseId);
    if (!foundCourses) {
        throw new errorHandlers_1.NotFoundError(`Lesson ${courseId} not found`);
    }
    return foundCourses;
});
exports.default = {
    createCourses,
    updateCourses,
    deleteCoursesById,
    findAllCourses,
    findAllCoursesById,
};
//# sourceMappingURL=courseServices.js.map
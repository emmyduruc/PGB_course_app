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
exports.deleteCourse = exports.findCourseById = exports.findAllCourses = exports.updateCourse = exports.createCourse = void 0;
const errorHandlers_1 = require("../helpers/errorHandlers");
const coursesModel_1 = __importDefault(require("../models/coursesModel"));
const courseServices_1 = __importDefault(require("../services/courseServices"));
//POST/creates course
const createCourse = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { desc, title, module } = req.body;
        const courses = new coursesModel_1.default({
            desc,
            title,
            module,
        });
        const createdCourses = yield courseServices_1.default.createCourses(courses);
        res.json(createdCourses);
    }
    catch (error) {
        if (error instanceof Error && error.name == "ValidationError") {
            next(new errorHandlers_1.BadRequestError("Invalid Request", error));
        }
        else {
            next(error);
        }
    }
});
exports.createCourse = createCourse;
//PUT
const updateCourse = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const update = req.body;
        const courseId = req.params.courseId;
        const updatedCourse = yield courseServices_1.default.updateCourses(courseId, update);
        res.json(updatedCourse);
    }
    catch (error) {
        if (error instanceof Error && error.name == "ValidationError") {
            next(new errorHandlers_1.BadRequestError("Invalid Request", error));
        }
        else {
            next(error);
        }
    }
});
exports.updateCourse = updateCourse;
// GET /courses (gets all existing lesson)
const findAllCourses = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.json(yield courseServices_1.default.findAllCourses());
    }
    catch (error) {
        if (error instanceof Error && error.name == "ValidationError") {
            next(new errorHandlers_1.BadRequestError("Invalid Request", error));
        }
        else {
            next(error);
        }
    }
});
exports.findAllCourses = findAllCourses;
// GET /lesson/:courseId //get the existing resource
const findCourseById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.json(yield courseServices_1.default.findAllCoursesById(req.params.courseId));
    }
    catch (error) {
        if (error instanceof Error && error.name == "ValidationError") {
            next(new errorHandlers_1.BadRequestError("Invalid Request", error));
        }
        else {
            next(error);
        }
    }
});
exports.findCourseById = findCourseById;
// DELETE /course/:courseId //Delete an existing resource
const deleteCourse = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield courseServices_1.default.deleteCoursesById(req.params.courseId);
        res.status(204).end();
    }
    catch (error) {
        if (error instanceof Error && error.name == "ValidationError") {
            next(new errorHandlers_1.BadRequestError("Invalid Request", error));
        }
        else {
            next(error);
        }
    }
});
exports.deleteCourse = deleteCourse;
//# sourceMappingURL=courseControllers.js.map
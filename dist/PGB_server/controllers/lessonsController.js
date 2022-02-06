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
exports.deleteLesson = exports.findLessonById = exports.findAllLesson = exports.updateLesson = exports.createLesson = void 0;
const errorHandlers_1 = require("../helpers/errorHandlers");
const lessonsModel_1 = __importDefault(require("../models/lessonsModel"));
const lessonServices_1 = __importDefault(require("../services/lessonServices"));
//POST/creates lessons
const createLesson = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { desc, title, lesson } = req.body;
        const lessons = new lessonsModel_1.default({
            desc,
            title,
            lesson,
        });
        const createdLesson = yield lessonServices_1.default.createLessons(lessons);
        res.json(createdLesson);
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
exports.createLesson = createLesson;
//PUT
const updateLesson = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const update = req.body;
        const lessonId = req.params.lessonId;
        const updatedLesson = yield lessonServices_1.default.updateLessons(lessonId, update);
        res.json(updatedLesson);
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
exports.updateLesson = updateLesson;
// GET /lessons (gets all existing lesson)
const findAllLesson = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.json(yield lessonServices_1.default.findAllLessons());
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
exports.findAllLesson = findAllLesson;
// GET /lesson/:lessonId //get the existing resource
const findLessonById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.json(yield lessonServices_1.default.findAllLessonsById(req.params.lessonId));
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
exports.findLessonById = findLessonById;
// DELETE /lesson/:lessonId //Delete an existing resource
const deleteLesson = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield lessonServices_1.default.deleteLessonById(req.params.lessonId);
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
exports.deleteLesson = deleteLesson;
//# sourceMappingURL=lessonsController.js.map
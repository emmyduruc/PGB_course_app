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
const lessonsModel_1 = __importDefault(require("../models/lessonsModel"));
const errorHandlers_1 = require("../helpers/errorHandlers");
//POST
const createLessons = (lessonDocument) => __awaiter(void 0, void 0, void 0, function* () {
    const createdLessons = yield lessonDocument.save();
    return createdLessons;
});
//PUT to update
const updateLessons = (lessonId, update) => __awaiter(void 0, void 0, void 0, function* () {
    const foundLessons = yield lessonsModel_1.default.findByIdAndUpdate(lessonId, update, {
        new: true,
    });
    if (!foundLessons) {
        throw new errorHandlers_1.NotFoundError(`Lesson ${lessonId} not found`);
    }
    return foundLessons;
});
//GET all lessons
const findAllLessons = () => __awaiter(void 0, void 0, void 0, function* () {
    return lessonsModel_1.default.find();
});
//GET a lessons byId
const findAllLessonsById = (lessonId) => __awaiter(void 0, void 0, void 0, function* () {
    const foundLesson = yield lessonsModel_1.default.findById(lessonId);
    if (!foundLesson) {
        throw new errorHandlers_1.NotFoundError(`Lesson ${lessonId} not found`);
    }
    return foundLesson;
});
//Delete lessons by Id
const deleteLessonById = (lessonId) => __awaiter(void 0, void 0, void 0, function* () {
    const foundLesson = yield lessonsModel_1.default.findById(lessonId);
    if (!foundLesson) {
        throw new errorHandlers_1.NotFoundError(`Lesson ${lessonId} not found`);
    }
    return foundLesson;
});
exports.default = {
    createLessons,
    updateLessons,
    deleteLessonById,
    findAllLessons,
    findAllLessonsById,
};
//# sourceMappingURL=lessonServices.js.map
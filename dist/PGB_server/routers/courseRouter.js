"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const courseControllers_1 = require("../controllers/courseControllers");
const router = express_1.default.Router();
// Every path we define here will get /api/v1/course prefix
router.post("/", courseControllers_1.createCourse);
router.get("/", courseControllers_1.findAllCourses);
router.put("/:courseId", courseControllers_1.updateCourse);
router.get("/:courseId", courseControllers_1.findCourseById);
router.delete("/:courseId", courseControllers_1.deleteCourse);
exports.default = router;
//# sourceMappingURL=courseRouter.js.map
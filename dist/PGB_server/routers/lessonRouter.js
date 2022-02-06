"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const lessonsController_1 = require("../controllers/lessonsController");
const router = express_1.default.Router();
// Every path we define here will get /api/v1/course prefix
router.post("/", lessonsController_1.createLesson);
router.get("/", lessonsController_1.findAllLesson);
router.put("/:lessonId", lessonsController_1.updateLesson);
router.get("/:lessonId", lessonsController_1.findLessonById);
router.delete("/:lessonId", lessonsController_1.deleteLesson);
exports.default = router;
//# sourceMappingURL=lessonRouter.js.map
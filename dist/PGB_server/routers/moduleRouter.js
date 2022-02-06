"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const moduleControllers_1 = require("../controllers/moduleControllers");
const router = express_1.default.Router();
// Every path we define here will get /api/v1/movies prefix
router.post("/", moduleControllers_1.createModule);
router.get("/", moduleControllers_1.findAllModule);
router.put("/:moduleId", moduleControllers_1.updateModule);
router.get("/:moduleId", moduleControllers_1.findModuleById);
router.delete("/:moduleId", moduleControllers_1.deleteModule);
exports.default = router;
//# sourceMappingURL=moduleRouter.js.map
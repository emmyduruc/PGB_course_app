"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const welcomeController_1 = require("../controllers/welcomeController");
const router = express_1.default.Router();
router.post("/", welcomeController_1.welcome);
//# sourceMappingURL=welcome.js.map
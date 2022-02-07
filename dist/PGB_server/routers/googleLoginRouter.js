"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const express_1 = __importDefault(require("express"));
const googleLoginController_1 = __importDefault(require("../controllers/googleLoginController"));
const router = express_1.default.Router();
router.post("/", passport_1.default.authenticate("google-id-token", { session: false }), googleLoginController_1.default);
exports.default = router;
//# sourceMappingURL=googleLoginRouter.js.map
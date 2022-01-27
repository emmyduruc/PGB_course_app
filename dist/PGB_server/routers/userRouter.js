"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userControllers_1 = require("../controllers/userControllers");
const router = express_1.default.Router();
// Every path we define here will get /api/v1/movies prefix
router.post("/", userControllers_1.createUser);
router.get("/", userControllers_1.findAllUser);
router.post("/", userControllers_1.adminCheck);
router.post("/login", userControllers_1.login);
router.put("/:userId", userControllers_1.updateUser);
router.put("/:userId/follow", userControllers_1.followUser);
router.get("/:userId", userControllers_1.findUserById);
router.delete("/:userId", userControllers_1.deleteUser);
exports.default = router;
//# sourceMappingURL=userRouter.js.map
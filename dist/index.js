"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv = __importStar(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const userRouter_1 = __importDefault(require("./PGB_server/routers/userRouter"));
const lessonRouter_1 = __importDefault(require("./PGB_server/routers/lessonRouter"));
const courseRouter_1 = __importDefault(require("./PGB_server/routers/courseRouter"));
const moduleRouter_1 = __importDefault(require("./PGB_server/routers/moduleRouter"));
const googleLoginRouter_1 = __importDefault(require("./PGB_server/routers/googleLoginRouter"));
const passport_1 = __importDefault(require("passport"));
const passport_2 = require("./PGB_server/passport/passport");
dotenv.config();
const port = process.env.PORT; // default port to listen
mongoose_1.default
    .connect(process.env.MONGO_DB)
    .then(() => {
    console.log("MongoDB connected successfully");
})
    .catch((error) => {
    console.log(` MongoDB failed to connect: ${error}`);
});
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(passport_1.default.initialize());
passport_1.default.use(passport_2.googleStrategy);
passport_1.default.use(passport_2.jwtStrategy);
app.use(express_1.default.json());
app.use((0, helmet_1.default)());
app.use((0, morgan_1.default)("common"));
app.use("/user", userRouter_1.default);
app.use("/lesson", lessonRouter_1.default);
app.use("/course", courseRouter_1.default);
app.use("/module", moduleRouter_1.default);
app.use("/google_login", googleLoginRouter_1.default);
// define a route handler for the default home page
app.get("/", (req, res) => {
    res.send("Hello welcome to PGB server!");
});
// start the Express server
app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map
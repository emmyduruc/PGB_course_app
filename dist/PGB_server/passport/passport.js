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
exports.jwtStrategy = exports.googleStrategy = void 0;
const passport_google_id_token_1 = __importDefault(require("passport-google-id-token"));
const passport_jwt_1 = require("passport-jwt");
const googleLoginServices_1 = __importDefault(require("../services/googleLoginServices"));
const secrets_1 = require("../utils/secrets");
const errorHandlers_1 = require("../helpers/errorHandlers");
// const LocalStrategy = passportLocal.Strategy
//GoogleTokenStrategy is a class so we have to pass the configuration option
//to it which is called clientId
//it accepts two argument the first is the clientID
//and a callback and this will execute when verification/authentication in google is successful
exports.googleStrategy = new passport_google_id_token_1.default({
    //clientId is configured through google and the client Id should be put in the env file
    clientId: process.env.GOOGLE_CLIENT_ID,
}, (parsedToken, googleId, done) => __awaiter(void 0, void 0, void 0, function* () {
    //the call back receives few information from the passport strategy, the parsedToken contains the user data, thr googleID from the user and done("passes the request to the controller after the middleware operation completes")
    console.log("parsed token", parsedToken);
    //holds the userData
    const user = yield googleLoginServices_1.default.findOrCreate(parsedToken.payload);
    console.log("user parsed token", user);
    //the done() accepts two arguments the null(which replaces the error in this case), and data you want to forward
    done(null, user);
}));
exports.jwtStrategy = new passport_jwt_1.Strategy({
    secretOrKey: secrets_1.JWT_SECRET,
    //defines a function and tells the passport how to extract the token
    jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
    // token = req.header.authorization.split("")[1]
}, 
//this payload is the token payload
(payload, done) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("user payload", payload);
    const { email } = payload;
    const user = yield googleLoginServices_1.default.findByEmail(email);
    if (!user) {
        throw new errorHandlers_1.NotFoundError(`User ${user} not found`);
    }
    done(null, user);
}));
//# sourceMappingURL=passport.js.map
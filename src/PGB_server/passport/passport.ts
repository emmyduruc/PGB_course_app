import passport from "passport";
import passportLocal from "passport-local";
import GoogleTokenStrategy from "passport-google-id-token";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import GoogleLoginService from "../services/googleLoginServices";
import { UserDocument } from "../models/userModel";
import { JWT_SECRET } from "../utils/secrets";
import { NotFoundError } from "../helpers/errorHandlers";
// const LocalStrategy = passportLocal.Strategy

//GoogleTokenStrategy is a class so we have to pass the configuration option
//to it which is called clientId
//it accepts two argument the first is the clientID
//and a callback and this will execute when verification/authentication in google is successful

export const googleStrategy = new GoogleTokenStrategy(
  {
    //clientId is configured through google and the client Id should be put in the env file
    clientId: process.env.GOOGLE_CLIENT_ID,
  },
  async (parsedToken: any, googleId: any, done: any) => {
    //the call back receives few information from the passport strategy, the parsedToken contains the user data, thr googleID from the user and done("passes the request to the controller after the middleware operation completes")
    console.log("parsed token", parsedToken);
    //holds the userData

    const user = await GoogleLoginService.findOrCreate(parsedToken.payload);
    console.log("user parsed token", user);
    //the done() accepts two arguments the null(which replaces the error in this case), and data you want to forward
    done(null, user);
  }
);

export const jwtStrategy = new JwtStrategy(
  {
    secretOrKey: JWT_SECRET,
    //defines a function and tells the passport how to extract the token
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    // token = req.header.authorization.split("")[1]
  },
  //this payload is the token payload
  async (payload: UserDocument, done: any) => {
    console.log("user payload", payload);
    const { email } = payload;
    const user = await GoogleLoginService.findByEmail(email);
    if (!user) {
      throw new NotFoundError(`User ${user} not found`);
    }
    done(null, user);
  }
);

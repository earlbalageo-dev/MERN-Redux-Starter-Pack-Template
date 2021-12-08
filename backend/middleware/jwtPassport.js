import passport from "passport";
import { ExtractJwt, Strategy as JWTstrategy } from "passport-jwt";
import User from "../models/UserModel.js";
import dotenv from "dotenv";

dotenv.config({ path: "./backend/config/.env" });

const jwtOpts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

const jwtPassport = new JWTstrategy(jwtOpts, async function (jwtPayload, done) {
  try {
    const user = await User.findOne({ _id: jwtPayload.id });
    return done(null, user);
  } catch (err) {
    return done(err);
  }
});

passport.use(jwtPassport);

export const authJwt = passport.authenticate("jwt", { session: false });

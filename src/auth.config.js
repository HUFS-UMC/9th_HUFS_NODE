import dotenv from "dotenv";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { prisma } from "./db.config.js";
import jwt from "jsonwebtoken"; // JWT 생성을 위해 import 
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';

dotenv.config();
const secret = process.env.JWT_SECRET; // .env의 비밀 키 

export const generateAccessToken = (user) => {
  return jwt.sign(
    { id: user.id, email: user.email }, 
    secret,                           
    { expiresIn: '1h' }                 
  );
};

export const generateRefreshToken = (user) => {
  return jwt.sign(
    { id: user.id },                   
    secret,
    { expiresIn: '14d' }                
  );
};


// GoogleVerify 
const googleVerify = async (profile) => {
  const email = profile.emails?.[0]?.value;
  if (!email) {
    throw new Error(`profile.email was not found: ${profile}`);
  }

  const user = await prisma.user.findFirst({ where: { email } });
  if (user !== null) {
    return { id: user.id, email: user.email, name: user.name };
  }

  const created = await prisma.user.create({
    data: {
            email: userData.email,
            password: userData.password,
            gender: userData.gender,
            birth_date: userData.birth_date,
            withdrawal_request_time: userData.withdrawal_request_time,
            withdrawal_due_time: userData.withdrawal_due_time,
        },
  });

  return { id: created.id, email: created.email, name: created.name };
};

// GoogleStrategy 

export const googleStrategy = new GoogleStrategy(
  {
    clientID: process.env.PASSPORT_GOOGLE_CLIENT_ID,
    clientSecret: process.env.PASSPORT_GOOGLE_CLIENT_SECRET,
    callbackURL: "/oauth2/callback/google", 
    scope: ["email", "profile"],
  },
  

  async (accessToken, refreshToken, profile, cb) => {
    try {
     
      const user = await googleVerify(profile);
      
      
      const jwtAccessToken = generateAccessToken(user);
      const jwtRefreshToken = generateRefreshToken(user);


     
      return cb(null, {
        accessToken: jwtAccessToken,
        refreshToken: jwtRefreshToken,
      });

    } catch (err) {
      return cb(err);
    }
  }
);




const jwtOptions = {
  // 요청 헤더의 'Authorization'에서 'Bearer <token>' 토큰을 추출
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

export const jwtStrategy = new JwtStrategy(jwtOptions, async (payload, done) => {
  try {
    const user = await prisma.user.findFirst({ where: { id: payload.id } });

    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  } catch (err) {
    return done(err, false);
  }
});
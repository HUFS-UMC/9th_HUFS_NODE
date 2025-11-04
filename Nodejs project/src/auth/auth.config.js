import dotenv from "dotenv";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as KakaoStrategy } from "passport-kakao";
import { Strategy as LocalStrategy } from "passport-local";
import { prisma } from "../db.config.js";
import bcrypt from "bcrypt";

dotenv.config();

/* =======================
      Google Strategy
========================== */
export const googleStrategy = new GoogleStrategy(
  {
    clientID: process.env.PASSPORT_GOOGLE_CLIENT_ID,
    clientSecret: process.env.PASSPORT_GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/oauth2/callback/google",
    scope: ["email", "profile"],
    state: true,
  },
  (accessToken, refreshToken, profile, cb) => {
    googleVerify(profile)
      .then((user) => cb(null, user))
      .catch((err) => cb(err));
  }
);

const googleVerify = async (profile) => {
  const email = profile.emails?.[0]?.value;
  if (!email) {
    throw new Error(
      `Google profile.email not found: ${JSON.stringify(profile)}`
    );
  }

  const existingUserInfo = await prisma.userinfo.findFirst({
    where: { email },
    include: { user: true },
  });

  if (existingUserInfo) {
    const user = existingUserInfo.user;

    if (user.provider !== "google") {
      throw new Error(
        `이 이메일은 ${user.provider} 방식으로 가입된 계정입니다.`
      );
    }

    return {
      id: user.id,
      email: existingUserInfo.email,
      name: user.name,
    };
  }

  const createdUser = await prisma.user.create({
    data: {
      name: profile.displayName || "이름 없음",
      pw: "",
      status: "active",
      point: 0,
      provider: "google",
    },
  });

  await prisma.userinfo.create({
    data: {
      user_id: createdUser.id,
      profile_picture_url:
        profile.photos?.[0]?.value || "https://default.image/url",
      email,
      locate: "대한민국",
      gender: 0,
      birth: "1970-01-01",
      phone_num: "000-0000-0000",
      phone_num_certificated: false,
      nickname: profile.displayName || "GoogleUser",
    },
  });

  return {
    id: createdUser.id,
    email,
    name: createdUser.name,
  };
};

/* =======================
      Kakao Strategy
========================== */
export const kakaoStrategy = new KakaoStrategy(
  {
    clientID: process.env.PASSPORT_KAKAO_CLIENT_ID,
    clientSecret: process.env.PASSPORT_KAKAO_CLIENT_SECRET,
    callbackURL: process.env.PASSPORT_KAKAO_CALLBACK_URL,
  },
  (accessToken, refreshToken, profile, cb) => {
    kakaoVerify(profile)
      .then((user) => cb(null, user))
      .catch((err) => cb(err));
  }
);

const kakaoVerify = async (profile) => {
  const kakaoAccount = profile._json.kakao_account;
  const email = kakaoAccount?.email;
  const nickname = kakaoAccount?.profile?.nickname;
  const profileImage = kakaoAccount?.profile?.profile_image_url;

  if (!email) {
    throw new Error(`Kakao email not found: ${JSON.stringify(profile._json)}`);
  }

  const existingUserInfo = await prisma.userinfo.findFirst({
    where: { email },
    include: { user: true },
  });

  if (existingUserInfo) {
    const user = existingUserInfo.user;

    if (user.provider !== "kakao") {
      throw new Error(
        `이 이메일은 ${user.provider} 방식으로 가입된 계정입니다.`
      );
    }

    return {
      id: user.id,
      email: existingUserInfo.email,
      name: user.name,
    };
  }

  const createdUser = await prisma.user.create({
    data: {
      name: nickname || "이름 없음",
      pw: "",
      status: "active",
      point: 0,
      provider: "kakao",
    },
  });

  await prisma.userinfo.create({
    data: {
      user_id: createdUser.id,
      profile_picture_url: profileImage || "https://default.image/url",
      email,
      locate: "대한민국",
      gender: 0,
      birth: "1970-01-01",
      phone_num: "000-0000-0000",
      phone_num_certificated: false,
      nickname: nickname || "KakaoUser",
    },
  });

  return {
    id: createdUser.id,
    email,
    name: createdUser.name,
  };
};

/* =======================
      Local Strategy
========================== */
export const localStrategy = new LocalStrategy(
  {
    usernameField: "email",
    passwordField: "password",
  },
  async (email, password, done) => {
    try {
      const existingUserInfo = await prisma.userinfo.findUnique({
        where: { email },
        include: { user: true },
      });

      if (!existingUserInfo || !existingUserInfo.user) {
        return done(null, false, { message: "존재하지 않는 사용자입니다." });
      }

      const user = existingUserInfo.user;

      if (user.provider !== "local") {
        return done(null, false, {
          message: `이 계정은 ${user.provider} 방식으로 가입되어 있습니다.`,
        });
      }

      const isMatch = await bcrypt.compare(password, user.pw);
      if (!isMatch) {
        return done(null, false, { message: "비밀번호가 일치하지 않습니다." });
      }

      return done(null, {
        id: user.id,
        email: existingUserInfo.email,
        name: user.name,
      });
    } catch (error) {
      return done(error);
    }
  }
);

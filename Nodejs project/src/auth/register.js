import express from "express";
import bcrypt from "bcrypt";
import { prisma } from "../db.config.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  /*
  #swagger.summary = '이메일/비밀번호 회원가입'
  #swagger.tags = ['Auth']
  #swagger.requestBody = {
    required: true,
    content: {
      "application/json": {
        schema: {
          type: "object",
          required: ["name", "email", "password"],
          properties: {
            name: { type: "string", example: "홍길동" },
            email: { type: "string", example: "test@example.com" },
            password: { type: "string", example: "mypassword123" },
            profile_picture_url: { type: "string", example: "https://example.com/profile.jpg" },
            locate: { type: "string", example: "서울" },
            gender: { type: "integer", example: 1 },
            birth: { type: "string", example: "1990-01-01" },
            phone_num: { type: "string", example: "010-1234-5678" },
            phone_num_certificated: { type: "boolean", example: true },
            nickname: { type: "string", example: "길동이" }
          }
        }
      }
    }
  }
  #swagger.responses[201] = {
    description: '회원가입 성공'
  }
*/

  const {
    name,
    password,
    email,
    profile_picture_url,
    locate,
    gender,
    birth,
    phone_num,
    phone_num_certificated,
    nickname,
  } = req.body;

  try {
    // 이미 userinfo.email 존재하는지 확인
    const existing = await prisma.userinfo.findFirst({
      where: { email },
    });

    if (existing) {
      return res.status(400).json({ message: "이미 가입된 이메일입니다." });
    }

    // 비밀번호 해싱
    const hashedPw = await bcrypt.hash(password, 10);

    // user 생성 (provider: 'local')
    const createdUser = await prisma.user.create({
      data: {
        name,
        pw: hashedPw,
        status: "active",
        point: 0,
        provider: "local",
      },
    });

    // userinfo 생성
    await prisma.userinfo.create({
      data: {
        user_id: createdUser.id,
        email,
        profile_picture_url: profile_picture_url || "https://default.image/url",
        locate: locate || "대한민국",
        gender: gender ?? 0,
        birth: birth || "1990-01-01",
        phone_num: phone_num || "000-0000-0000",
        phone_num_certificated: phone_num_certificated ?? false,
        nickname: nickname || name,
      },
    });

    res.status(201).json({ message: "회원가입 성공", userId: createdUser.id });
  } catch (error) {
    console.error("회원가입 오류:", error);
    res.status(500).json({ message: "서버 오류" });
  }
});

export default router;

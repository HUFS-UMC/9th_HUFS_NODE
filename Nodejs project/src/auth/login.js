import express from "express";
import passport from "passport";

const router = express.Router();

router.post("/login", (req, res, next) => {
  /*
  #swagger.summary = '이메일/비밀번호 로그인'
  #swagger.tags = ['Auth']
  #swagger.requestBody = {
    required: true,
    content: {
      "application/json": {
        schema: {
          type: "object",
          required: ["email", "password"],
          properties: {
            email: { type: "string", example: "test@example.com" },
            password: { type: "string", example: "mypassword123" }
          }
        }
      }
    }
  }
  #swagger.responses[200] = {
    description: '로그인 성공'
  }
  #swagger.responses[401] = {
    description: '로그인 실패'
  }
*/

  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.status(401).json({ message: info.message });

    req.login(user, (err) => {
      if (err) return next(err);
      return res.json({ message: "로그인 성공", user });
    });
  })(req, res, next);
});

router.get("/logout", (req, res) => {
  req.logout(() => {
    res.json({ message: "로그아웃 완료" });
  });
});

export default router;

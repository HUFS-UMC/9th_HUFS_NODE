// src/controllers/user.controller.js (일부)
import { StatusCodes } from "http-status-codes";
import { bodyToUser } from "../dtos/user.dto.js";
import { userSignUp } from "../services/user.service.js";

export const handleUserSignUp = async (req, res, next) => {
    // ... (기존 로그 코드)
    try {
        const user = await userSignUp(bodyToUser(req.body));
        // 💡 회원가입 성공 시 201 Created 사용 권장
        res.status(StatusCodes.CREATED).json({ isSuccess: true, message: "회원가입 성공", result: user });
    } catch (error) {
        // ... 에러 처리 ...
    }
};
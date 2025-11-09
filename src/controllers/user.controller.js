// src/controllers/user.controller.js
import { StatusCodes } from "http-status-codes";
import { bodyToUser } from "../dtos/user.dto.js";
import { userSignUp } from "../services/user.service.js";

/**
 * [CONTROLLER] 1-1. 사용자 회원가입 (POST /api/v1/users/signup)
 */
export const handleUserSignUp = async (req, res, next) => {
    // 💡 로그: 요청 본문 확인 (디버깅용)
    console.log("[handleUserSignUp] Request Body:", req.body);
    
    try {
        // 1. DTO를 통해 데이터 정제 및 유효성 검사 (bodyToUser 함수 내에서 처리 가정)
        const userData = bodyToUser(req.body);
        
        // 2. Service 로직 실행: 회원가입 처리
        const user = await userSignUp(userData);
        
        // 3. 응답 전송 (201 Created)
        res.status(StatusCodes.CREATED).json({ 
            isSuccess: true, 
            message: "회원가입 성공", 
            result: user 
        });

    } catch (error) {
        // 로그: 에러 발생 시 기록
        console.error("[handleUserSignUp] 회원가입 오류 발생:", error.message);
        
        // 4. 에러 처리
        let status = StatusCodes.INTERNAL_SERVER_ERROR;
        
        // Service에서 던지는 특정 에러 코드 처리 (예: 중복 이메일 -> 409 Conflict)
        if (error.message.startsWith("409")) {
            status = StatusCodes.CONFLICT; // 409 Conflict (데이터 충돌)
        } else if (error.message.startsWith("400")) {
            status = StatusCodes.BAD_REQUEST; // 400 Bad Request (잘못된 요청 데이터)
        }
        
        // 응답 전송
        res.status(status).json({ 
            isSuccess: false, 
            message: error.message 
        });
    }
};
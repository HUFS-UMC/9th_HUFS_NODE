// src/controllers/store.controller.js
import { StatusCodes } from "http-status-codes";
import { bodyToStore } from "../dtos/store.dto.js"; // DTO import
import { createStore } from "../services/store.service.js"; // Service import

export const handleCreateStore = async (req, res, next) => {
    console.log("가게 등록 요청:", req.body);
    
    try {
        // 1. DTO를 통해 데이터 정제
        const storeDataWithAddress = bodyToStore(req.body);
        
        // 2. Service 로직 실행
        const storeResult = await createStore(storeDataWithAddress);
        
        // 3. 응답 전송 (생성 성공 시 201 Created)
        res.status(StatusCodes.CREATED).json({ 
            isSuccess: true,
            message: "가게 등록 성공",
            result: storeResult 
        });

    } catch (error) {
        // 4. 에러 처리
        console.error("가게 등록 중 오류 발생:", error.message);
        // next(error)를 사용하여 전역 에러 핸들러로 넘기거나,
        // 클라이언트에 적절한 오류 응답을 보냅니다.
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ 
            isSuccess: false,
            message: "가게 등록 실패" 
        });
    }
};
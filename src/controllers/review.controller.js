// src/controllers/review.controller.js
import { StatusCodes } from "http-status-codes";
import { bodyToReview } from "../dtos/review.dto.js";
import { createReview } from "../services/review.service.js"; 

export const handleCreateReview = async (req, res, next) => {
    const storeId = req.params.storeId; 
    const userId = 1; // 💡 미션 요구사항: DB의 첫 번째 사용자(ID=1) 가정
    
    try {
        const reviewData = bodyToReview(req.body, storeId, userId);
        
        const result = await createReview(reviewData);
        
        res.status(StatusCodes.CREATED).json({ 
            isSuccess: true,
            message: "리뷰 등록 성공",
            result: result 
        });

    } catch (error) {
        // 404/409 등 비즈니스 로직 오류는 에러 메시지 포함 여부에 따라 분기
        const status = error.message.startsWith("404") ? StatusCodes.NOT_FOUND : StatusCodes.INTERNAL_SERVER_ERROR;
        res.status(status).json({ message: error.message });
    }
};
// src/controllers/review.controller.js
import { StatusCodes } from "http-status-codes";
import { bodyToReview } from "../dtos/review.dto.js";
import { createReview } from "../services/review.service.js"; 

/**
 * [CONTROLLER] 1-2. 리뷰 등록 (POST /api/v1/stores/:storeId/reviews)
 */
export const handleCreateReview = async (req, res, next) => {
    const store_id = req.params.store_id; 
    const user_id = 1; // 미션 요구사항: DB의 첫 번째 사용자(ID=1) 가정
    
    try {
        // DTO에 경로 파라미터와 userId 전달
        const reviewData = bodyToReview(req.body, store_id, user_id);
        
        const result = await createReview(reviewData);
        
        // 3. 응답 전송 (201 Created)
        res.status(StatusCodes.CREATED).json({ 
            isSuccess: true,
            message: "리뷰 등록 성공",
            result: result 
        });

    } catch (error) {
        // Service에서 발생한 404 오류 처리
        const status = error.message.startsWith("404") ? StatusCodes.NOT_FOUND : StatusCodes.INTERNAL_SERVER_ERROR;
        res.status(status).json({ message: error.message });
    }
};
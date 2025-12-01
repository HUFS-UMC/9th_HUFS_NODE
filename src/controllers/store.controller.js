// src/controllers/store.controller.js
import { StatusCodes } from "http-status-codes";
import { bodyToStore } from "../dtos/store.dto.js"; 
import { createStore } from "../services/store.service.js"; 


// ✅ 추가해야 할 import: 리뷰 조회 서비스 함수
import { listStoreReviews } from "../services/store.service.js"; 
/**
 * [CONTROLLER] 1-1. 가게 등록 (POST /api/v1/stores)
 */
export const handleCreateStore = async (req, res, next) => {
    try {
        // 1. DTO를 통해 데이터 정제
        const data = bodyToStore(req.body);
        
        // 2. Service 로직 실행
        const result = await createStore(data);
        
        // 3. 응답 전송 (201 Created)
        res.status(StatusCodes.CREATED).json({ 
            isSuccess: true,
            message: "가게 등록 성공",
            result: result 
        });

    } catch (error) {
        console.error("가게 등록 오류:", error.message);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "서버 오류" });
    }
};


// 리뷰 조회 함수

export const handleListStoreReviews = async (req, res, next) => {
  const reviews = await listStoreReviews(
    parseInt(req.params.storeId),
    typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0
  );
  res.status(StatusCodes.OK).json({ 
    // 네가 원하는 응답 구조에 맞게 reviews를 data 필드에 넣는 게 국룰이다.
    isSuccess: true,
    data: reviews 
});
};
// src/services/review.service.js
import * as storeRepo from "../repositories/store.repository.js";
import * as reviewRepo from "../repositories/review.repository.js";

/**
 * [SERVICE] 1-2. 가게에 리뷰 추가
 * - 가게 존재 검증이 필수적으로 수행됩니다.
 */
export const createReview = async (reviewData) => { // <-- 반드시 'export'가 있어야 합니다.
    // 1. 가게 존재 검증 (미션 요구사항)
    const storeExists = await storeRepo.findStoreById(reviewData.store_id);
    if (!storeExists) {
        // 존재하지 않으면 오류 발생 (Controller가 404로 응답 처리)
        throw new Error("404: 존재하지 않는 가게 ID입니다."); 
    }

    // 2. 리뷰 삽입
    const reviewId = await reviewRepo.insertReview(reviewData);

    return { reviewId };
};
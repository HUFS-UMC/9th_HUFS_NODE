// src/services/review.service.js
import * as storeRepo from "../repositories/store.repository.js";
import * as reviewRepo from "../repositories/review.repository.js";
import { getAllUserReviews } from '../repositories/review.repository.js';
import { responseFromReviews } from '../dtos/review.dto.js'; 
import { responseFromMissions } from "../dtos/mission.dto.js";
/**
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



 
/*
 * [SERVICE] 사용자 ID 기반으로 리뷰 목록을 조회하고 DTO로 변환한다.
 */
export const listMyReviews = async (user_id, cursor) => {
    // 1. Repository를 호출하여 데이터베이스에서 리뷰 목록을 가져온다.
    const reviews = await getAllUserReviews(user_id, cursor);

    // 2. DTO를 호출하여 페이지네이션 정보와 함께 응답 형태로 가공한다.
    return responseFromReviews(reviews);
}
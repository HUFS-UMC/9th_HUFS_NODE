// src/dtos/review.dto.js

/**
 * 요청 본문을 받아 리뷰 데이터(storeId, userId 포함)를 정제합니다.
 */
export const bodyToReview = (body, storeId, userId) => {
    return {
        store_id: storeId, 
        user_id: userId, 
        address_id: body.addressId, // 리뷰 시점 주소 ID
        title: body.title,
        content: body.content
    };
};
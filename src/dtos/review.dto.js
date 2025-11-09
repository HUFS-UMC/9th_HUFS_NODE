// src/dtos/review.dto.js

/**
 * [DTO] 리뷰 요청 본문을 받아 DB 삽입 형태로 정제합니다.
 */
export const bodyToReview = (body, store_id, user_id) => {
    return {
        store_id: store_id,                  // URL 경로 파라미터에서 추출
        user_id: user_id,                    // 💡 미션 요구사항에 따라 1번 사용자(ID=1) 등으로 가정된 값
        address_id: body.address_id,         // 리뷰가 작성된 시점의 주소 ID
        title: body.title,                  // 리뷰제목
        content: body.content               // 리뷰내용
    };
};



export const responseFromReviews = (reviews) => { 
    return {
        data: reviews,
        pagination: {
            cursor: reviews.length ? reviews[reviews.length - 1].id : null,
        },
    };
};
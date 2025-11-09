// src/dtos/store.dto.js

/**
 * [DTO] 가게 등록 요청 본문(req.body)을 받아 DB 컬럼명에 맞춰 데이터를 정제합니다.
 * @param {object} body - 클라이언트가 보낸 요청 본문
 * @returns {{storeData: object, addressData: object}} 정제된 가게 정보와 주소 정보
 */
export const bodyToStore = (body) => {
    // [1] store 테이블 컬럼명에 맞춥니다.
    const storeData = {
        store_name: body.store_name, // 가게이름
        store_info: body.store_info, // 가게정보
    };

    // [2] address 테이블 컬럼명에 맞춥니다.
    const addressData = {
        zip_code: body.zip_code,
        state_province: body.state_province, // 시도
        city_county: body.city_county,       // 구군
        town_village: body.town_village,     // 동리
        street_name: body.street_name,
        building_number: body.building_number,
        detail: body.detail || "",          // 상세정보 (선택적)
    };
    return { storeData, addressData };
};


export const responseFromReviews = (reviews) => {  //리뷰조회 함수
  return {
    data: reviews,
    pagination: {
      cursor: reviews.length ? reviews[reviews.length - 1].id : null,
    },
  };
};

// src/dtos/store.dto.js

/**
 * [DTO] 가게 등록 요청 본문(req.body)을 받아 DB 컬럼명에 맞춰 데이터를 정제합니다.
 * @param {object} body - 클라이언트가 보낸 요청 본문
 * @returns {{storeData: object, addressData: object}} 정제된 가게 정보와 주소 정보
 */
export const bodyToStore = (body) => {
    // [1] store 테이블 컬럼명에 맞춥니다.
    const storeData = {
        store_name: body.storeName, // 가게이름
        store_info: body.storeInfo, // 가게정보
    };

    // [2] address 테이블 컬럼명에 맞춥니다.
    const addressData = {
        zip_code: body.zipCode,
        state_province: body.stateProvince, // 시도
        city_county: body.cityCounty,       // 구군
        town_village: body.townVillage,     // 동리
        street_name: body.streetName,
        building_number: body.buildingNumber,
        detail: body.detail || "",          // 상세정보 (선택적)
    };
    return { storeData, addressData };
};
// src/dtos/mission.dto.js

/**
 * [DTO] 미션 등록 요청 본문을 받아 DB 삽입 형태로 정제합니다.
 */
export const bodyToMission = (body) => {
    return {
        mission_name: body.mission_name,         // 미션이름
        mission_content: body.mission_content,   // 미션내용
        mission_period: body.mission_period,     // 미션기간 (DATETIME 형식 문자열)
    };
};
// src/dtos/mission.dto.js

/**
 * 요청 본문을 받아 미션 데이터를 정제합니다.
 */
export const bodyToMission = (body) => {
    return {
        mission_name: body.missionName,
        mission_content: body.missionContent,
        mission_period: body.missionPeriod, // DATETIME 형식 문자열 예상
    };
};
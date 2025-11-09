// src/dtos/mission.dto.js


export const bodyToMission = (body) => {
    return {
        mission_name: body.mission_name,       // 미션 이름
        mission_content: body.mission_content, // 미션 내용
        mission_period: body.mission_period,   // 미션 기간 (DATETIME)
    };
};

/**
 * [DTO] 미션 목록 조회 응답
 * DB의 mission 테이블을 기반으로, 클라이언트에 필요한 정보만 정리.
 */
export const responseFromMissions = (missions) => {
    return {
        data: missions.map((m) => ({
            mission_id: m.mission_id,
            mission_name: m.mission_name,
            mission_content: m.mission_content,
            mission_period: m.mission_period,
        })),
        pagination: {
            cursor: missions.length ? missions[missions.length - 1].mission_id : null,
        },
        total_count: missions.length,
    };
};

/**
 * [DTO] 미션 완료 응답
 * user_mission 테이블 기준으로, 유저가 특정 미션을 완료했을 때의 응답을 구성.
 */
export const responseMissionComplete = ({ mission_id, user_id, completed_at }) => {
    return {
        message: "미션이 성공적으로 완료 처리되었습니다.",
        mission: {
            mission_id: mission_id,
            user_id: user_id,
            completed_at: completed_at || new Date().toISOString(),
        },
    };
};
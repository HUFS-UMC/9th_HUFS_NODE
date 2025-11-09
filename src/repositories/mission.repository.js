// src/repositories/mission.repository.js
import { pool } from '../db.config.js';
import { prisma } from "../db.config.js";

/**
 * [REPO] 미션 정보를 mission 테이블에 삽입합니다. (1-3 미션)
 * - 들어온 데이터 중 undefined가 있으면 MySQL이 에러 발생 → null 로 대체해야 안전
 * - mission_period, mission_content 가 optional이면 `?? null` 처리 필수
 */
export const insertMission = async (missionData) => {

    //  어떤 값이 들어오는지 로그로 확인 (디버깅용)
    console.log("[insertMission] missionData:", missionData);

    const [result] = await pool.execute(
        `
        INSERT INTO mission (
            mission_name,
            mission_content,
            mission_period
        ) VALUES (?, ?, ?)
        `,
        [
            missionData.mission_name,               // 필수
            missionData.mission_content ?? null,    // undefined 방지
            missionData.mission_period ?? null      // undefined 방지
        ]
    );

    return result.insertId;
};


/**
 * [REPO] 사용자가 이미 해당 미션에 도전 중인지 검증합니다. (1-4 미션 검증용)
 */
export const isMissionChallenged = async (userId, missionId) => {
    const [rows] = await pool.execute(
        `
        SELECT mission_id
        FROM user_mission
        WHERE user_id = ? AND mission_id = ?
        `,
        [userId, missionId]
    );
    
    return rows.length > 0;
};


/**
 * [REPO] 사용자별 미션 도전 정보를 user_mission 테이블에 삽입합니다. (1-4 미션)
 */
export const insertChallenge = async (userId, missionId) => {

    // 로그 출력
    console.log(`[insertChallenge] userId=${userId}, missionId=${missionId}`);

    const [result] = await pool.execute(
        `
        INSERT INTO user_mission (user_id, mission_id)
        VALUES (?, ?)
        `,
        [userId, missionId]
    );

    return result.insertId;
};

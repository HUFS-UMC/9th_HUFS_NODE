// src/repositories/mission.repository.js

import { prisma } from "../db.config.js";


// -----------------------------------------------------------
// 1. insertMission (미션 삽입)
// -----------------------------------------------------------

/**
 * [REPO] 미션 정보를 mission 테이블에 삽입합니다. (1-3 미션)
 * @param {object} missionData - 미션 데이터 객체 (mission_name, mission_content, mission_period)
 */
export const insertMission = async (missionData) => {
    
    console.log("[insertMission] missionData:", missionData);

    // SQL: INSERT INTO mission (...) VALUES (...)
    try {
        const newMission = await prisma.mission.create({
            data: {
                mission_name: missionData.mission_name,
                // undefined면 null로 변환하여 DB에 안전하게 전달
                mission_content: missionData.mission_content ?? null, 
                mission_period: missionData.mission_period ?? null,
            },
        });
        return newMission.mission_id;
    } catch (error) {
        console.error("미션 삽입 중 오류 발생:", error);
        throw error;
    }
};


// -----------------------------------------------------------
// 2. isMissionChallenged (도전 여부 검증)
// -----------------------------------------------------------

/**
 * [REPO] 사용자가 이미 해당 미션에 도전 중인지 검증합니다. (1-4 미션 검증용)
 * @param {number} userId - 사용자 ID
 * @param {number} missionId - 미션 ID
 */
export const isMissionChallenged = async (userId, missionId) => {
    
    // SQL: SELECT mission_id FROM user_mission WHERE user_id = ? AND mission_id = ?
    const row = await prisma.userMission.findFirst({
        where: {
            user_id: userId,
            mission_id: missionId,
        },
        select: {
            mission_id: true // 존재 여부만 확인
        }
    });
    
    // 레코드가 존재하면 true 반환
    return !!row;
};


// -----------------------------------------------------------
// 3. insertChallenge (미션 도전 정보 삽입)
// -----------------------------------------------------------

/**
 * [REPO] 사용자별 미션 도전 정보를 user_mission 테이블에 삽입합니다. (1-4 미션)
 * @param {number} userId - 사용자 ID
 * @param {number} missionId - 미션 ID
 */
export const insertChallenge = async (userId, missionId) => {

    console.log(`[insertChallenge] userId=${userId}, missionId=${missionId}`);

    // SQL: INSERT INTO user_mission (user_id, mission_id) VALUES (?, ?)
    try {
        const challenge = await prisma.userMission.create({
            data: {
                user_id: userId,
                mission_id: missionId,
            },
        });
        // 복합 키를 반환
        return { missionId: challenge.mission_id, userId: challenge.user_id };
    } catch (error) {
        console.error("미션 도전 삽입 중 오류 발생:", error);
        throw error;
    }
};

/**
 * [REPO] 미션 정보를 mission 테이블에 삽입합니다. (1-3 미션)
 * - 들어온 데이터 중 undefined가 있으면 MySQL이 에러 발생 → null 로 대체해야 안전
 * - mission_period, mission_content 가 optional이면 `?? null` 처리 필수
 */

/*
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
/*
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
*/

/**
 * [REPO] 사용자별 미션 도전 정보를 user_mission 테이블에 삽입합니다. (1-4 미션)
 */
/*
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

*/
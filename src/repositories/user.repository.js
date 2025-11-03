// src/repositories/user.repository.js
import { pool } from '../db.config.js'; // 💡 pool 대신 getPool을 import

/**
 * [REPO] 새로운 사용자를 user 테이블에 삽입하고 생성된 ID를 반환합니다.
 */
export const addUser = async (userData) => {

    // ... (이하 쿼리 로직) ...
    const [result] = await pool.execute(
        `INSERT INTO user (email, password, gender, birth_date, withdrawal_request_time, withdrawal_due_time) 
         VALUES (?, ?, ?, ?, ?, ?)`,
        [
            userData.email,
            userData.password, 
            userData.gender,
            userData.birth_date,
            userData.withdrawal_request_time,
            userData.withdrawal_due_time
        ]
    );
    return result.insertId;
};

/**
 * [REPO] 유저 선호 카테고리(음식)를 user_preference 테이블에 삽입합니다.
 */
export const insertUserPreference = async (userId, foodId) => {

    await pool.execute(
        `INSERT INTO user_preference (user_id, food_id) VALUES (?, ?)`,
        [userId, foodId]
    );
};

/**
 * [REPO] 사용자가 이미 해당 미션에 도전 중인지 검증합니다. (1-4 미션 검증용)
 */
export const isMissionChallenged = async (userId, missionId) => {
 
    const [rows] = await pool.execute(
        `SELECT mission_id FROM user_mission WHERE user_id = ? AND mission_id = ?`,
        [userId, missionId]
    );
    return rows.length > 0;
};

/**
 * [REPO] 사용자별 미션 도전 정보를 user_mission 테이블에 삽입합니다. (1-4 미션)
 */
export const insertChallenge = async (userId, missionId) => {
    const pool = getPool(); // 💡 pool 객체를 getPool() 함수로 가져옵니다.
    const [result] = await pool.execute(
        `INSERT INTO user_mission (user_id, mission_id) VALUES (?, ?)`,
        [userId, missionId]
    );
    return result.insertId;
};
// src/repositories/user.repository.js
import { prisma } from "../db.config.js";


/**
 * 새로운 사용자를 user 테이블에 삽입하고 생성된 ID를 반환
 * @param {object} userData - 사용자 정보 객체
 * @returns {Promise<number>} - 새로 생성된 user_id
 */
export const addUser = async (userData) => {
    const newUser = await prisma.user.create({
        data: {
            email: userData.email,
            password: userData.password,
            gender: userData.gender,
            birth_date: userData.birth_date,
            withdrawal_request_time: userData.withdrawal_request_time,
            withdrawal_due_time: userData.withdrawal_due_time,
        },
    });
    return newUser.user_id; // Prisma는 생성된 객체를 반환
};

/**
 * 유저 선호 카테고리(음식)를 user_preference 테이블에 삽입
 * @param {number} userId - 사용자 ID
 * @param {number} foodId - 음식(카테고리) ID
 */
export const insertUserPreference = async (userId, foodId) => {
    await prisma.user_preference.create({
        data: {
            user_id: userId,
            food_id: foodId,
        },
    });
    // INSERT는 별도의 반환 값이 필요 없으므로 void로 처리
};

/**
 * 사용자가 이미 해당 미션에 도전 중인지 검증
 * @param {number} userId - 사용자 ID
 * @param {number} missionId - 미션 ID
 * @returns {Promise<boolean>} - 도전 중이면 true, 아니면 false
 */
export const isMissionChallenged = async (userId, missionId) => {
    const challenge = await prisma.user_mission.findFirst({
        where: {
            user_id: userId,
            mission_id: missionId,
        },
        select: {
            mission_id: true,
        },
    });

    return !!challenge;
};

/**
 * 사용자별 미션 도전 정보를 user_mission 테이블에 삽입
 * @param {number} userId - 사용자 ID
 * @param {number} missionId - 미션 ID
 * @returns {Promise<number>} - 새로 생성된 user_mission 레코드의 ID
 */
export const insertChallenge = async (userId, missionId) => {
    // Note: 기존 코드에서 getPool() 함수를 호출하는 부분은 제거
    const newChallenge = await prisma.user_mission.create({
        data: {
            user_id: userId,
            mission_id: missionId,
        },
    });
    
    // user_mission 테이블의 primary key 필드 이름이 user_mission_id라고 가정
    return newChallenge.user_mission_id;
};





/**
 * [REPO] 새로운 사용자를 user 테이블에 삽입하고 생성된 ID를 반환합니다.
 */
/*
export const addUser = async (userData) => {


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
/*
export const insertUserPreference = async (userId, foodId) => {

    await pool.execute(
        `INSERT INTO user_preference (user_id, food_id) VALUES (?, ?)`,
        [userId, foodId]
    );
};

/**
 * [REPO] 사용자가 이미 해당 미션에 도전 중인지 검증
 */
/*
export const isMissionChallenged = async (userId, missionId) => {
 
    const [rows] = await pool.execute(
        `SELECT mission_id FROM user_mission WHERE user_id = ? AND mission_id = ?`,
        [userId, missionId]
    );
    return rows.length > 0;
};
*/
/**
 * [REPO] 사용자별 미션 도전 정보를 user_mission 테이블에 삽입
 */
/*
export const insertChallenge = async (userId, missionId) => {
    const pool = getPool(); //  pool 객체를 getPool() 함수로 가져옵니다.
    const [result] = await pool.execute(
        `INSERT INTO user_mission (user_id, mission_id) VALUES (?, ?)`,
        [userId, missionId]
    );
    return result.insertId;
};

*/
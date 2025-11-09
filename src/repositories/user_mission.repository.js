// src/repositories/user_mission.repository.js
import { pool } from '../db.config.js';
import { prisma } from "../db.config.js";

export const isMissionChallenged = async (user_id, mission_id) => {
    // 이미 도전 중인지 검증 (user_mission 테이블 사용)
    const [rows] = await pool.execute(
        `SELECT mission_id FROM user_mission WHERE user_id = ? AND mission_id = ?`,
        [user_id, mission_id]
    );
    return rows.length > 0;
};

export const insertChallenge = async (user_id, mission_id) => {
    // 미션 도전 등록
    const [result] = await pool.execute(
        `INSERT INTO user_mission (user_id, mission_id) VALUES (?, ?)`,
        [user_id, mission_id]
    );
    return result.insert_id;
};
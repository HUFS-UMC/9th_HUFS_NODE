import { pool } from "../db.config.js";

export const addMission = async (data) => {
  const conn = await pool.getConnection();
  try {
    const [result] = await pool.query(
      `INSERT INTO mission (store_id, title) VALUES (?, ?);`,
      [data.storeId, data.title]
    );

    const insertId = result.insertId;
    const [rows] = await pool.query(`SELECT * FROM mission WHERE id = ?;`, [insertId]);
    return rows[0];
  } catch (err) {
    throw new Error(`미션 추가 중 오류가 발생했습니다. (${err})`);
  } finally {
    conn.release();
  }
};

export const getMissionById = async (id) => {
  const conn = await pool.getConnection();
  try {
    const [rows] = await pool.query(`SELECT * FROM mission WHERE id = ?;`, [id]);
    return rows.length ? rows[0] : null;
  } catch (err) {
    throw new Error(`미션 조회 중 오류가 발생했습니다. (${err})`);
  } finally {
    conn.release();
  }
};

export const addUserMission = async (data) => {
  const conn = await pool.getConnection();
  try {
    const [result] = await pool.query(
      `INSERT INTO user_mission (user_id, mission_id, status) VALUES (?, ?, ?);`,
      [data.userId, data.missionId, data.status || "ONGOING"]
    );

    const insertId = result.insertId;
    const [rows] = await pool.query(`SELECT * FROM user_mission WHERE id = ?;`, [insertId]);
    return rows[0];
  } catch (err) {
    throw new Error(`유저 미션 추가 중 오류가 발생했습니다. (${err})`);
  } finally {
    conn.release();
  }
};

export const getUserMissionByUserAndMission = async (userId, missionId) => {
  const conn = await pool.getConnection();
  try {
    const [rows] = await pool.query(
      `SELECT * FROM user_mission WHERE user_id = ? AND mission_id = ? LIMIT 1;`,
      [userId, missionId]
    );
    return rows.length ? rows[0] : null;
  } catch (err) {
    throw new Error(`유저 미션 조회 중 오류가 발생했습니다. (${err})`);
  } finally {
    conn.release();
  }
};

export const getMissionsByStoreId = async (storeId) => {
  const conn = await pool.getConnection();
  try {
    const [rows] = await pool.query(`SELECT * FROM mission WHERE store_id = ?;`, [storeId]);
    return rows;
  } catch (err) {
    throw new Error(`가게 미션 조회 중 오류가 발생했습니다. (${err})`);
  } finally {
    conn.release();
  }
};

import { pool } from "../db.config.js";

export const addReview = async (data) => {
  const conn = await pool.getConnection();
  try {
    const [result] = await pool.query(
      `INSERT INTO review (user_id, store_id, content) VALUES (?, ?, ?);`,
      [data.userId, data.storeId, data.content]
    );

    const insertId = result.insertId;
    const [rows] = await pool.query(`SELECT * FROM review WHERE id = ?;`, [insertId]);
    return rows[0];
  } catch (err) {
    throw new Error(`리뷰 추가 중 오류가 발생했습니다. (${err})`);
  } finally {
    conn.release();
  }
};

export const getReviewById = async (id) => {
  const conn = await pool.getConnection();
  try {
    const [rows] = await pool.query(`SELECT * FROM review WHERE id = ?;`, [id]);
    return rows.length ? rows[0] : null;
  } catch (err) {
    throw new Error(`리뷰 조회 중 오류가 발생했습니다. (${err})`);
  } finally {
    conn.release();
  }
};

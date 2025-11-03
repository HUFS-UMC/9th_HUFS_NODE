import { pool } from "../db.config.js";

// Create a new store record using MySQL pool
export const addStore = async (data) => {
  const conn = await pool.getConnection();
  try {
    const [result] = await pool.query(
      `INSERT INTO store (name) VALUES (?);`,
      [data.store_name]
    );

    return result.insertId;
  } catch (err) {
    throw new Error(`오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`);
  } finally {
    conn.release();
  }
};

export const getStoreById = async (storeId) => {
  const conn = await pool.getConnection();
  try {
    const [rows] = await pool.query(`SELECT * FROM store WHERE id = ?;`, [storeId]);
    if (!rows || rows.length === 0) return null;
    return rows[0];
  } catch (err) {
    throw new Error(`오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`);
  } finally {
    conn.release();
  }
};

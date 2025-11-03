// src/repositories/review.repository.js
import { pool } from '../db.config.js';

export const insertReview = async (reviewData) => {
    const [result] = await pool.execute(
        `INSERT INTO review (store_id, address_id, user_id, title, content)
         VALUES (?, ?, ?, ?, ?)`,
        Object.values(reviewData)
    );
    return result.insertId;
};
// src/repositories/review.repository.js
import { pool } from '../db.config.js';

export const insertReview = async (reviewData) => {
    // 수정된 부분: Object.values() 대신 명시적으로 순서를 지정합니다.
    const values = [
        reviewData.store_id,
        reviewData.address_id ?? null,
        reviewData.user_id,
        reviewData.title,
        reviewData.content ?? null
    ];

    const [result] = await pool.execute(
        `INSERT INTO review (store_id, address_id, user_id, title, content)
         VALUES (?, ?, ?, ?, ?)`,
        values // 순서가 보장된 배열을 사용
    );

    return result.insertId;
};
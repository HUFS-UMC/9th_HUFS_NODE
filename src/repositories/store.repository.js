// src/repositories/store.repository.js
import { pool } from '../db.config.js';

export const insertStore = async (storeData, addressId) => {
    const [result] = await pool.execute(
        `INSERT INTO store (address_id, store_name, store_info)
         VALUES (?, ?, ?)`,
        [addressId, storeData.store_name, storeData.store_info]
    );
    return result.insertId;
};

export const findStoreById = async (storeId) => {
    const [rows] = await pool.execute(`SELECT store_id FROM store WHERE store_id = ?`, [storeId]);
    return rows.length > 0;
};
// src/repositories/store.repository.js
import { pool } from '../db.config.js';
import { prisma } from "../db.config.js";


/**
 * [REPO] 가게 정보를 store 테이블에 삽입합니다. (1-1 미션)
 * @param {number} addressId - 이미 생성된 주소의 ID (Foreign Key)
 */
export const insertStore = async (storeData, addressId) => {
    const [result] = await pool.execute(
        `INSERT INTO store (address_id, store_name, store_info)
         VALUES (?, ?, ?)`,
        [addressId, storeData.store_name, storeData.store_info]
    );
    return result.insertId;
};

/**
 * [REPO] 가게 존재 여부를 검증합니다. (1-2 리뷰 미션 검증용)
 */
export const findStoreById = async (storeId) => {
    const [rows] = await pool.execute(`SELECT store_id FROM store WHERE store_id = ?`, [storeId]);
    return rows.length > 0;
};



//리뷰 조회 함수관련


export const getAllStoreReviews = async (store_id, cursor) => {
  const reviews = await prisma.review.findMany({
    //필요한 필드만 선택 (review 테이블)
    select: { 
      review_id: true, 
      content: true, 
      address_id: true,
      store_id: true, 
      user_id: true,
    },
    
    //검색 조건 설정 
    where: { 
      store_id: store_id, 
      review_id: { gt: cursor } //review_id를 사용, 커서 기반 페이지네이션
    },
    
    //정렬 기준 설정
    orderBy: { 
      review_id: "asc" // review_id를 기준으로 오름차순 정렬
    },
    
    
    take: 5,  //가져올 개수 설정
  });

  return reviews;
};


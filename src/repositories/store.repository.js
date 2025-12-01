// src/repositories/store.repository.js
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * [REPO] 가게 정보를 store 테이블에 삽입합니다.
 */
export const insertStore = async (storeData, addressId) => {
  const created = await prisma.store.create({
    data: {
      address_id: addressId,
      store_name: storeData.store_name,
      store_info: storeData.store_info,
    }
  });
  // 생성된 store의 id 반환
  return created.store_id;
};

/**
 * [REPO] 가게 존재 여부를 검증합니다.
 */
export const findStoreById = async (storeId) => {
  const store = await prisma.store.findUnique({
    where: { store_id: storeId },
    select: { store_id: true }
  });
  return store !== null;
};

/**
 * 리뷰 조회 함수 관련 — 커서 기반 페이징 포함 (예: review_id > cursor)
 */
export const getAllStoreReviews = async (store_id, cursor = 0) => {
  const reviews = await prisma.review.findMany({
    where: {
      store_id: store_id,
      review_id: { gt: cursor }
    },
    select: {
      review_id: true,
      content: true,
      address_id: true,
      store_id: true,
      user_id: true,
    },
    orderBy: { review_id: "asc" },
    take: 5,
  });
  return reviews;
};





//pool 버전



/**
 * [REPO] 가게 정보를 store 테이블에 삽입합니다. (1-1 미션)
 * @param {number} addressId - 이미 생성된 주소의 ID (Foreign Key)
 */

/*
export const insertStore = async (storeData, addressId) => {
    const [result] = await pool.execute(
        `INSERT INTO store (address_id, store_name, store_info)
         VALUES (?, ?, ?)`,
        [addressId, storeData.store_name, storeData.store_info]
    );
    return result.insertId;
};

*/


/**
 * [REPO] 가게 존재 여부를 검증합니다. (1-2 리뷰 미션 검증용)
 */
/*
export const findStoreById = async (storeId) => {
    const [rows] = await pool.execute(`SELECT store_id FROM store WHERE store_id = ?`, [storeId]);
    return rows.length > 0;
};

*/


//리뷰 조회 함수관련

/*
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

*/
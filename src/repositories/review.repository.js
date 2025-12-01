// src/repositories/review.repository.js

import { prisma } from '../db.config.js';

/**
 * [REPO] 리뷰 정보 삽입
 */
export const insertReview = async (reviewData) => {
  const created = await prisma.review.create({
    data: {
      store_id      : reviewData.store_id,
      address_id    : reviewData.address_id ?? null,
      user_id       : reviewData.user_id,
      title         : reviewData.title,
      content       : reviewData.content ?? null,
    },
    select: { review_id: true }
  });

  return created.review_id;
};

/**
 * [REPO] 사용자의 전체 리뷰 조회 (커서 기반 페이징)
 */
export const getAllUserReviews = async (user_id, cursor) => {
  const reviews = await prisma.review.findMany({
    select: {
      review_id : true,
      content   : true,
      store_id  : true,
      user_id   : true,
      // 필요하다면 store 정보 include 가능
      // store: { select: { name: true } }
    },
    where: {
      user_id,
      review_id: { gt: cursor }
    },
    orderBy: { review_id: "desc" },
    take: 5
  });

  return reviews;
};


/*
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

export const getAllUserReviews = async (user_id, cursor) => {
    // cursor는 내가 설정한 대로 review_id를 사용한다고 가정한다.
    const reviews = await prisma.review.findMany({
        // 네 DB 구조에 맞게 select 필드를 지정해라.
        select: { 
            review_id: true, 
            content: true, 
            store_id: true, 
            user_id: true,
            // 필요한 경우, store 정보도 include 할 수 있다.
            // store: { select: { name: true } }
        },
        where: { 
            // 🚨 핵심: store_id 대신 user_id로 필터링한다.
            user_id: user_id, 
            review_id: { gt: cursor } 
        },
        orderBy: { 
            review_id: "desc" // 최신순 조회를 위해 보통 desc를 사용함.
        },
        take: 5, 
    });

    return reviews;
};

*/
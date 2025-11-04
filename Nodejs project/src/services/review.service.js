import {
  createReview,
  getMyReviews,
} from "../repositories/review.repository.js";

export const CreateReview = async (data) => {
  const review = await createReview({
    user_id: data.user_id,
    store_name: data.store_name,
    score: data.score,
    text: data.text,
  });

  if (review === 0) {
    throw new Error("리뷰를 작성할 수 없습니다.");
  }
  return review;
};

export const listMyReviews = async (userId) => {
  const reviews = await getMyReviews(userId);
  if (reviews.length === 0) {
    throw new Error("리뷰가 없습니다.");
  }
  return reviews;
};

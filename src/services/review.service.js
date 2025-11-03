import { getStoreById } from "../repositories/store.repository.js";
import { addReview } from "../repositories/review.repository.js";
import { responseFromReview } from "../dtos/review.dto.js";

export const addReviewToStore = async (data) => {
  // validate store exists
  const store = await getStoreById(data.storeId);
  if (!store) {
    const err = new Error("해당 가게를 찾을 수 없습니다.");
    err.status = 404;
    throw err;
  }

  // create review
  const review = await addReview({
    userId: data.userId,
    storeId: data.storeId,
    content: data.content,
  });

  return responseFromReview({ review });
};

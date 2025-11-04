import { prisma } from "../db.config.js";

export const createReview = async (data) => {
  try {
    const store = await prisma.store.findFirst({
      where: { name: data.store_name },
    });

    if (!store) {
      throw new Error("존재하지 않는 가게입니다.");
    }

    const review = await prisma.review.create({
      data: {
        user_id: BigInt(data.user_id),
        store_id: BigInt(store.id),
        score: data.score,
        text: data.text,
      },
    });

    return review.id;
  } catch (err) {
    throw new Error(
      `오류가 발생했어요. 존재하는 가게인지 확인해주세요. (${err.message})`
    );
  }
};

export const getMyReviews = async (userId) => {
  try {
    const reviews = await prisma.review.findMany({
      where: {
        user_id: userId,
      },
    });

    return reviews;
  } catch (err) {
    throw new Error(`오류가 발생했어요. (${err.message})`);
  }
};

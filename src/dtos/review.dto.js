export const bodyToReview = (body, params = {}) => {
  return {
    userId: body.userId ? Number(body.userId) : body.userId || null,
    storeId: params.storeId ? Number(params.storeId) : body.storeId ? Number(body.storeId) : null,
    content: body.content || null,
  };
};

export const responseFromReview = ({ review }) => {
  if (!review) return null;
  return {
    id: review.id,
    userId: review.userId,
    storeId: review.storeId,
    content: review.content,
  };
};

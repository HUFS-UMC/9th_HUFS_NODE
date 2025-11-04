export const bodyToReview = (body) => {
  return {
    user_id: body.user_id,
    store_name: body.store_name,
    score: body.score,
    text: body.text,
  };
};

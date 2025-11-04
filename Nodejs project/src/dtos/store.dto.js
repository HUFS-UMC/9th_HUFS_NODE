export const bodyCreateStoreByRegion = (body) => {
  return {
    name: body.name,
    region: body.region,
    food_category: body.food_category,
  };
};

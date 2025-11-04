import { responseStoreMission } from "../dtos/mission.dto.js";
import {
  addStoreByRegion,
  getAllStoremission,
} from "../repositories/store.repository.js";

export const createStoreByRegion = async (data) => {
  const joinStoreId = await addStoreByRegion({
    name: data.name,
    region: data.region,
    food_category: data.food_category,
  });

  if (joinStoreId === 0) {
    throw new Error("존재하지 않는 지역입니다");
  }
  return joinStoreId;
};

export const missionsOfStore = async (storeId) => {
  const reviews = await getAllStoremission(storeId);
  return reviews.map((review) => {
    return responseStoreMission(review);
  });
};

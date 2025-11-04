import { prisma } from "../db.config.js";

export const addStoreByRegion = async (data) => {
  try {
    // 1. 지역 ID 조회
    const region = await prisma.region.findFirst({
      where: { name: data.region },
    });

    if (!region) {
      return null; // 존재하지 않으면 삽입 안 함
    }

    // 2. 음식 카테고리 ID 조회
    const foodCategory = await prisma.foodcategory.findFirst({
      where: { name: data.food_category },
    });

    if (!foodCategory) {
      throw new Error("존재하지 않는 음식 카테고리입니다.");
    }

    // 3. Store 삽입
    const store = await prisma.store.create({
      data: {
        name: data.name,
        region: {
          connect: { id: region.id },
        },
        foodcategory: {
          connect: { id: foodCategory.id },
        },
      },
    });

    return store.id;
  } catch (err) {
    throw new Error(
      `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err.message})`
    );
  }
};

export const getAllStoremission = async (storeId, cursor = 0) => {
  const missions = await prisma.mission.findMany({
    select: {
      id: true,
      name: true,
      payment: true,
      point: true,
      created_time: true,
    },
    where: {
      store_id: BigInt(storeId),
      id: {
        gt: BigInt(cursor),
      },
    },
    orderBy: { id: "asc" },
    take: 5,
  });

  return missions;
};

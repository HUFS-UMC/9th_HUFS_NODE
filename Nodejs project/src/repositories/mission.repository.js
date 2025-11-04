import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const addMission = async (data) => {
  try {
    // store 이름으로 store를 먼저 조회
    const store = await prisma.store.findFirst({
      where: { name: data.store_name },
    });

    if (!store) {
      return null; // 존재하지 않으면 insert 안 함
    }

    const name = `${data.store_name}에서 ${data.payment}원 이상 결제하면 ${data.point}포인트 적립`;

    const mission = await prisma.mission.create({
      data: {
        name,
        payment: data.payment,
        point: data.point,
        store: {
          connect: { id: store.id },
        },
      },
    });

    return mission.id;
  } catch (err) {
    throw new Error(
      `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
    );
  }
};

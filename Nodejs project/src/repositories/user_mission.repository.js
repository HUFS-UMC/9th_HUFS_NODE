import { prisma } from "../db.config.js";

export const addUserMission = async (data) => {
  try {
    // 1. 이미 존재하는 usermission이 있는지 확인
    const existing = await prisma.usermission.findUnique({
      where: {
        user_id_mission_id: {
          user_id: BigInt(data.user_id),
          mission_id: BigInt(data.mission_id),
        },
      },
    });

    if (existing) {
      throw new Error("이미 도전중인 미션입니다.");
    }

    // 2. 새 usermission 추가
    const newUserMission = await prisma.usermission.create({
      data: {
        user_id: BigInt(data.user_id),
        mission_id: BigInt(data.mission_id),
        is_completed: data.is_completed,
      },
    });

    return newUserMission;
  } catch (err) {
    throw new Error(
      `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err.message})`
    );
  }
};

export const getAllUncompletedMissionsByUserId = async (userId, cursor = 0) => {
  const missions = await prisma.usermission.findMany({
    where: {
      user_id: BigInt(userId),
      is_completed: false,
      mission_id: {
        gt: BigInt(cursor),
      },
    },
    include: {
      mission: {
        select: {
          id: true,
          name: true,
          payment: true,
          point: true,
          created_time: true,
        },
      },
    },
    orderBy: {
      mission_id: "asc",
    },
    take: 5,
  });

  // mission 데이터만 추출
  return missions.map((entry) => entry.mission);
};

export const patchMissionCompleted = async (userId, missionId) => {
  // 1. 먼저 데이터 존재 여부 확인
  const mission = await prisma.usermission.findFirst({
    where: {
      user_id: BigInt(userId),
      mission_id: BigInt(missionId),
      is_completed: false,
    },
  });

  // 2. 없으면 에러
  if (!mission) {
    throw new Error("데이터가 없습니다.");
  }

  // 3. 있으면 업데이트
  const updated = await prisma.usermission.update({
    where: {
      user_id_mission_id: {
        user_id: BigInt(userId),
        mission_id: BigInt(missionId),
      },
    },
    data: {
      is_completed: true,
    },
  });

  return updated;
};

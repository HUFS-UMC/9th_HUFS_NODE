import { getStoreById } from "../repositories/store.repository.js";
import {
  addMission,
  getMissionById,
  getUserMissionByUserAndMission,
  addUserMission,
} from "../repositories/mission.repository.js";
import { responseFromMission } from "../dtos/mission.dto.js";

export const addMissionToStore = async (data) => {
  // validate store exists
  const store = await getStoreById(data.storeId);
  if (!store) {
    const err = new Error("해당 가게를 찾을 수 없습니다.");
    err.status = 404;
    throw err;
  }

  // create mission
  const mission = await addMission({ storeId: data.storeId, title: data.title });
  return responseFromMission({ mission });
};

export const startMissionForUser = async (data) => {
  // data: { userId, missionId }
  // validate mission exists
  const mission = await getMissionById(data.missionId);
  if (!mission) {
    const err = new Error("해당 미션을 찾을 수 없습니다.");
    err.status = 404;
    throw err;
  }

  // check if user already has this mission ongoing
  const existing = await getUserMissionByUserAndMission(data.userId, data.missionId);
  if (existing && existing.status === "ONGOING") {
    const err = new Error("이미 진행 중인 미션입니다.");
    err.status = 400;
    throw err;
  }

  // create userMission
  const userMission = await addUserMission({ userId: data.userId, missionId: data.missionId });

  return userMission;
};

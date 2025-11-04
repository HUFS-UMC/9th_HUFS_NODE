import {
  addUserMission,
  getAllUncompletedMissionsByUserId,
  patchMissionCompleted,
} from "../repositories/user_mission.repository.js";
import { responseUserUndergoingMission } from "../dtos/use_mission.dto.js";

export const CreateUserMission = async (data) => {
  const insertUserMission = await addUserMission({
    mission_id: data.mission_id,
    user_id: data.user_id,
    is_completed: data.is_completed,
  });

  if (insertUserMission === 0) {
    throw new Error("미션을 생성할 수 없습니다.");
  }
  return insertUserMission;
};

export const userUndergoingMissions = async (userId) => {
  const mission = await getAllUncompletedMissionsByUserId(userId);
  return mission.map((mission) => {
    return responseUserUndergoingMission(mission);
  });
};

export const makeMissionFinished = async (userId, missionId) => {
  const result = await patchMissionCompleted(userId, missionId);
  return result;
};

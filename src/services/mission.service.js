// src/services/mission.service.js
import * as missionRepo from "../repositories/mission.repository.js";
import { responseFromMissions, responseMissionComplete } from '../dtos/mission.dto.js'; 


/**
 * [SERVICE] 1-3. 가게에 미션 추가
 */
export const createMission = async (store_id, missionData) => {
    // 1. 미션 정보 삽입
    const mission_id = await missionRepo.insertMission(missionData);
    
    // 2. (추가 로직: 가게와 미션 연결)
    
    return { mission_id };
};

/**
 * [SERVICE] 1-4. 미션 도전하기
 * - 이미 도전 중인지 검증이 필수적으로 수행됩니다.
 */
export const challengeMission = async (user_id, mission_id) => { // <-- 여기에 export가 필수입니다!
    // 1. 이미 도전 중인지 검증 (미션 요구사항)
    const alreadyChallenged = await missionRepo.isMissionChallenged(user_id, mission_id);
    if (alreadyChallenged) {
        // 이미 도전 중이면 오류 발생 (Controller가 409로 응답 처리)
        throw new Error("409: 이미 도전 중인 미션입니다."); 
    }

    // 2. 미션 도전 등록
    const challengeId = await missionRepo.insertChallenge(user_id, mission_id);

    return { challengeId };
};


/**
 * [SERVICE] 진행 중인 미션 목록을 조회한다.
 */
export const listActiveMissions = async (user_id, cursor) => {
    const missions = await missionRepo.getActiveMissionsByUserId(user_id, cursor);
    return responseFromMissions(missions);
};

/**
 * [SERVICE] 특정 미션을 완료 처리한다.
 */
export const completeMission = async (user_id, mission_id) => {
    // 1. 미션 완료 처리
    const updatedMission = await missionRepo.completeMissionStatus(user_id, mission_id);
    
    // 2. (선택) 포인트 지급 등 추가 로직 수행
    
    // 3. DTO 반환
    return responseMissionComplete(updatedMission.mission_id);
};
// src/services/mission.service.js
import * as missionRepo from "../repositories/mission.repository.js";

/**
 * [SERVICE] 1-3. 가게에 미션 추가
 */
export const createMission = async (storeId, missionData) => {
    // 1. 미션 정보 삽입
    const missionId = await missionRepo.insertMission(missionData);
    
    // 2. (추가 로직: 가게와 미션 연결)
    
    return { missionId };
};

/**
 * [SERVICE] 1-4. 미션 도전하기
 * - 이미 도전 중인지 검증이 필수적으로 수행됩니다.
 */
export const challengeMission = async (userId, missionId) => { // <-- 여기에 export가 필수입니다!
    // 1. 이미 도전 중인지 검증 (미션 요구사항)
    const alreadyChallenged = await missionRepo.isMissionChallenged(userId, missionId);
    if (alreadyChallenged) {
        // 이미 도전 중이면 오류 발생 (Controller가 409로 응답 처리)
        throw new Error("409: 이미 도전 중인 미션입니다."); 
    }

    // 2. 미션 도전 등록
    const challengeId = await missionRepo.insertChallenge(userId, missionId);

    return { challengeId };
};
// src/controllers/mission.controller.js
import { StatusCodes } from "http-status-codes";
import { bodyToMission } from "../dtos/mission.dto.js";
import { createMission, challengeMission } from "../services/mission.service.js"; 

/**
 * [CONTROLLER] 1-3. 미션 추가 (POST /api/v1/stores/:storeId/missions)
 */
export const handleCreateMission = async (req, res, next) => {
    const storeId = req.params.storeId;
    
    try {
        const missionData = bodyToMission(req.body);
        const result = await createMission(storeId, missionData);
        
        res.status(StatusCodes.CREATED).json({ 
            isSuccess: true,
            message: "미션 등록 성공",
            result: result 
        });

    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
};

/**
 * [CONTROLLER] 1-4. 미션 도전하기 (POST /api/v1/users/challenges/:missionId)
 */
export const handleChallengeMission = async (req, res, next) => {
    const missionId = req.params.missionId; 
    const userId = 1; // 미션 요구사항: DB의 첫 번째 사용자(ID=1) 가정
    
    try {
        const result = await challengeMission(userId, missionId);
        
        res.status(StatusCodes.CREATED).json({ 
            isSuccess: true,
            message: "미션 도전 성공",
            result: result 
        });

    } catch (error) {
        // Service에서 발생한 409 Conflict 오류 처리
        const status = error.message.startsWith("409") ? StatusCodes.CONFLICT : StatusCodes.INTERNAL_SERVER_ERROR;
        res.status(status).json({ message: error.message });
    }
};

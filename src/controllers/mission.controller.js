// src/controllers/mission.controller.js
import { StatusCodes } from "http-status-codes";
import { bodyToMission } from "../dtos/mission.dto.js";
import { createMission, challengeMission } from "../services/mission.service.js"; 
import { listActiveMissions, completeMission } from '../services/mission.service.js'; 
/**
 * [CONTROLLER] 1-3. 미션 추가 (POST /api/v1/stores/:storeId/missions)
 */
export const handleCreateMission = async (req, res, next) => {
    const store_id = req.params.store_id;
    
    try {
        const missionData = bodyToMission(req.body);
        const result = await createMission(store_id, missionData);
        
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
    const mission_id = req.params.mission_id; 
    const user_id = 1; // 미션 요구사항: DB의 첫 번째 사용자(ID=1) 가정
    
    try {
        const result = await challengeMission(user_id, mission_id);
        
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




/**
 * [CONTROLLER] 내가 진행 중인 미션 목록 조회 (GET /my/missions)
 */
export const handleListMyActiveMissions = async (req, res, next) => {
    try {
        const user_id = req.user.id; // 🚨 인증 미들웨어에서 user ID를 가져옴
        const cursor = typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0;
        
        const result = await listActiveMissions(user_id, cursor);
        
        res.status(StatusCodes.OK).json(result);

    } catch (error) {
        console.error("미션 목록 조회 오류:", error.message);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "서버 오류" });
    }
};

/**
 * [CONTROLLER] 미션을 완료 처리 (PATCH /my/missions/:missionId/complete)
 */
export const handleCompleteMission = async (req, res, next) => {
    try {
        const user_id = req.user.id; // 🚨 인증 미들웨어에서 user ID를 가져옴
        const mission_id = parseInt(req.params.missionId);
        
        if (isNaN(mission_id)) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: "유효하지 않은 미션 ID입니다." });
        }
        
        const result = await completeMission(user_id, mission_id);
        
        // 200 OK 또는 202 Accepted
        res.status(StatusCodes.OK).json(result); 

    } catch (error) {
        console.error("미션 완료 처리 오류:", error.message);
        // Repository에서 발생하는 미션 없음 오류 등을 404로 처리할 수 있다.
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "서버 오류" });
    }
};
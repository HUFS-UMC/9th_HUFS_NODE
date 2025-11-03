import { StatusCodes } from "http-status-codes";
import { bodyToUser } from "../dtos/user.dto.js";
import { bodyToStore } from "../dtos/store.dto.js";
import { bodyToReview } from "../dtos/review.dto.js";
import { bodyToMission } from "../dtos/mission.dto.js";
import { userSignUp, StoreAdd } from "../services/user.service.js";
import { addReviewToStore } from "../services/review.service.js";
import { addMissionToStore, startMissionForUser } from "../services/mission.service.js";

export const handleUserSignUp = async (req, res, next) => {
  console.log("회원가입을 요청했습니다!");
  console.log("body:", req.body); // 값이 잘 들어오나 확인하기 위한 테스트용

  const user = await userSignUp(bodyToUser(req.body));
  res.status(StatusCodes.OK).json({ result: user });
};

export const handleStoreAdd = async (req, res, next) => {
  console.log("가게 추가!");
  console.log("body:", req.body); // 값이 잘 들어오나 확인하기 위한 테스트용

  const store = await StoreAdd(bodyToStore(req.body));
  res.status(StatusCodes.OK).json({ result: store });
};

export const handleAddReview = async (req, res, next) => {
  console.log("가게 리뷰 추가 요청");
  console.log("params:", req.params, "body:", req.body);

  try {
    const reviewData = bodyToReview(req.body, { storeId: req.params.storeId });
    const review = await addReviewToStore(reviewData);
    res.status(StatusCodes.OK).json({ result: review });
  } catch (err) {
    const status = err.status || StatusCodes.INTERNAL_SERVER_ERROR;
    res.status(status).json({ error: err.message });
  }
};

export const handleAddMission = async (req, res, next) => {
  console.log("가게 미션 추가 요청", req.params, req.body);
  try {
    const missionData = bodyToMission(req.body, { storeId: req.params.storeId });
    const mission = await addMissionToStore(missionData);
    res.status(StatusCodes.OK).json({ result: mission });
  } catch (err) {
    const status = err.status || StatusCodes.INTERNAL_SERVER_ERROR;
    res.status(status).json({ error: err.message });
  }
};

export const handleStartMission = async (req, res, next) => {
  console.log("유저 미션 시작 요청", req.params, req.body);
  try {
    const userId = req.params.userId ? Number(req.params.userId) : req.body.userId;
    const missionId = req.params.missionId ? Number(req.params.missionId) : req.body.missionId;
    const result = await startMissionForUser({ userId, missionId });
    res.status(StatusCodes.OK).json({ result });
  } catch (err) {
    const status = err.status || StatusCodes.INTERNAL_SERVER_ERROR;
    res.status(status).json({ error: err.message });
  }
};
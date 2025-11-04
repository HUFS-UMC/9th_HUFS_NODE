import { StatusCodes } from "http-status-codes";
import { bodyCreateUserMission } from "../dtos/use_mission.dto.js";
import {
  CreateUserMission,
  userUndergoingMissions,
  makeMissionFinished,
} from "../services/user_mission.service.js";

export const createUserMission = async (req, res, next) => {
  /*
    #swagger.summary = '유저 미션 등록 API'
    #swagger.tags = ['UserMission']
    #swagger.description = '특정 유저가 특정 미션에 도전하도록 등록합니다. 중복 등록은 허용되지 않습니다.'

    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            required: ["user_id", "mission_id"],
            properties: {
              user_id: { type: "integer", example: 1 },
              mission_id: { type: "integer", example: 5 },
              is_completed: { type: "boolean", example: false }
            }
          }
        }
      }
    }

    #swagger.responses[200] = {
      description: "유저 미션 등록 성공",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              result: {
                type: "object",
                properties: {
                  user_id: { type: "integer", example: 1 },
                  mission_id: { type: "integer", example: 5 },
                  is_completed: { type: "boolean", example: false }
                }
              }
            }
          }
        }
      }
    }

    #swagger.responses[400] = {
      description: "중복된 미션 도전 또는 잘못된 요청 파라미터",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "FAIL" },
              error: {
                type: "object",
                properties: {
                  errorCode: { type: "string", example: "UM001" },
                  reason: { type: "string", example: "이미 도전중인 미션입니다." },
                  data: { type: "object", example: {} }
                }
              },
              success: { type: "object", nullable: true, example: null }
            }
          }
        }
      }
    }
  */
  const data = {
    ...req.body,
    ...req.query,
  };
  const userMission = await CreateUserMission(bodyCreateUserMission(data));
  res.status(StatusCodes.OK).success({ result: userMission });
};

export const joinMyMissions = async (req, res, next) => {
  /*
    #swagger.summary = '유저 미완료 미션 조회 API'
    #swagger.tags = ['UserMission']
    #swagger.description = '특정 유저가 도전 중인(아직 완료하지 않은) 미션들을 5개씩 커서 기반으로 조회합니다.'

    #swagger.parameters['userId'] = {
      in: 'path',
      description: '유저 ID',
      required: true,
      type: 'integer',
      example: 1
    }

    #swagger.parameters['cursor'] = {
      in: 'query',
      description: '커서(마지막 mission_id)',
      required: false,
      type: 'integer',
      example: 0
    }

    #swagger.responses[200] = {
      description: '도전 중인 미션 목록 조회 성공',
      content: {
        "application/json": {
          schema: {
            type: "array",
            items: {
              type: "object",
              properties: {
                id: { type: "integer", example: 101 },
                name: { type: "string", example: "홍콩반점에서 10000원 이상 결제 시 300포인트 적립" },
                payment: { type: "integer", example: 10000 },
                point: { type: "integer", example: 300 },
                created_time: {
                  type: "string",
                  format: "date-time",
                  example: "2024-05-01T12:00:00.000Z"
                }
              }
            }
          }
        }
      }
    }

    #swagger.responses[404] = {
      description: '해당 유저의 미완료 미션이 없음',
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "FAIL" },
              error: {
                type: "object",
                properties: {
                  errorCode: { type: "string", example: "UM404" },
                  reason: { type: "string", example: "도전 중인 미션이 없습니다." },
                  data: { type: "object", example: {} }
                }
              },
              success: { type: "object", nullable: true, example: null }
            }
          }
        }
      }
    }
  */
  const reviews = await userUndergoingMissions(req.params.userId);
  res.status(StatusCodes.OK).success(reviews);
};

export const missionIntoFisnish = async (req, res, next) => {
  /*
    #swagger.summary = '유저 미션 완료 처리 API'
    #swagger.tags = ['UserMission']
    #swagger.description = '특정 유저가 특정 미션을 완료한 것으로 표시합니다. 이미 완료된 미션은 처리되지 않습니다.'

    #swagger.parameters['userId'] = {
      in: 'path',
      description: '유저 ID',
      required: true,
      type: 'integer',
      example: 1
    }

    #swagger.parameters['missionId'] = {
      in: 'path',
      description: '미션 ID',
      required: true,
      type: 'integer',
      example: 5
    }

    #swagger.responses[200] = {
      description: '미션 완료 처리 성공',
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              user_id: { type: "integer", example: 1 },
              mission_id: { type: "integer", example: 5 },
              is_completed: { type: "boolean", example: true }
            }
          }
        }
      }
    }

    #swagger.responses[404] = {
      description: '해당 유저의 미션이 존재하지 않거나 이미 완료됨',
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "FAIL" },
              error: {
                type: "object",
                properties: {
                  errorCode: { type: "string", example: "UM404" },
                  reason: { type: "string", example: "데이터가 없습니다." },
                  data: { type: "object", example: {} }
                }
              },
              success: { type: "object", nullable: true, example: null }
            }
          }
        }
      }
    }
  */
  const { userId, missionId } = req.params;
  const result = await makeMissionFinished(userId, missionId);
  res.status(StatusCodes.OK).success(result);
};

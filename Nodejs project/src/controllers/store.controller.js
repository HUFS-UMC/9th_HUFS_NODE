import { StatusCodes } from "http-status-codes";
import { bodyCreateStoreByRegion } from "../dtos/store.dto.js";
import { createStoreByRegion } from "../services/store.service.js";
import { missionsOfStore } from "../services/store.service.js";

export const handleStoreCreate = async (req, res, next) => {
  /*
    #swagger.summary = '지역 기반 가게 등록 API';
    #swagger.tags = ['Store']
    #swagger.description = '사용자가 특정 지역에 대한 가게를 생성합니다.'
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            required: ["name", "region", "food_category"],
            properties: {
              name: { type: "string", example: "홍콩반점" },
              region: { type: "string", example: "강남구" },
              food_category: { type: "string", example: "중식" }
            }
          }
        }
      }
    };
    #swagger.responses[200] = {
      description: "가게 등록 성공",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              result: {
                type: "integer",
                example: 101
              }
            }
          }
        }
      }
    };
    #swagger.responses[400] = {
      description: "요청 파라미터 오류 또는 존재하지 않는 지역/카테고리",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "FAIL" },
              error: {
                type: "object",
                properties: {
                  errorCode: { type: "string", example: "S001" },
                  reason: { type: "string", example: "존재하지 않는 지역입니다." },
                  data: { type: "object", example: {} }
                }
              },
              success: { type: "object", nullable: true, example: null }
            }
          }
        }
      }
    };
  */
  const store = await createStoreByRegion(bodyCreateStoreByRegion(req.body));
  res.status(200).success({ result: store });
};

export const joinStoreMission = async (req, res, next) => {
  /*
    #swagger.summary = '가게별 미션 목록 조회 API'
    #swagger.tags = ['Mission']
    #swagger.description = '지정된 가게 ID(storeId)에 해당하는 미션 리스트를 5개씩 조회합니다 (커서 기반 페이지네이션).'

    #swagger.parameters['storeId'] = {
      in: 'path',
      description: '미션을 조회할 가게 ID',
      required: true,
      type: 'integer',
      example: 3
    }

    #swagger.parameters['cursor'] = {
      in: 'query',
      description: '커서 기반 페이지네이션용 mission ID (기본값 0)',
      required: false,
      type: 'integer',
      example: 0
    }

    #swagger.responses[200] = {
      description: '해당 가게의 미션 목록 조회 성공',
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              result: {
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
      }
    }

    #swagger.responses[404] = {
      description: '해당 가게에 미션이 존재하지 않는 경우',
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "FAIL" },
              error: {
                type: "object",
                properties: {
                  errorCode: { type: "string", example: "M404" },
                  reason: { type: "string", example: "미션이 존재하지 않습니다." },
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

  const reviews = await missionsOfStore(req.params.storeId);
  res.status(StatusCodes.OK).success({ result: reviews });
};

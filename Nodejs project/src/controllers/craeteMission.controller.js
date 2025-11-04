import { StatusCodes } from "http-status-codes";
import { bodyToMission } from "../dtos/mission.dto.js";
import { CreateMission } from "../services/mission.service.js";
export const createMission = async (req, res, next) => {
  /*
    #swagger.summary = '미션 생성 API'
    #swagger.tags = ['Mission']
    #swagger.description = '가게 이름과 결제 조건, 포인트 정보를 기반으로 신규 미션을 생성합니다.'

    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            required: ["store_name", "payment", "point"],
            properties: {
              store_name: { type: "string", example: "홍콩반점" },
              payment: { type: "integer", example: 10000 },
              point: { type: "integer", example: 300 }
            }
          }
        }
      }
    }

    #swagger.responses[200] = {
      description: "미션 생성 성공",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              result: { type: "integer", example: 42 }
            }
          }
        }
      }
    }

    #swagger.responses[400] = {
      description: "존재하지 않는 가게 이름 또는 잘못된 요청",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "FAIL" },
              error: {
                type: "object",
                properties: {
                  errorCode: { type: "string", example: "M001" },
                  reason: { type: "string", example: "미션을 생성할 수 없습니다." },
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

  console.log("가게에 새로운 미션 추가");
  console.log("data:", data);
  const mission = await CreateMission(bodyToMission(data));
  res.status(StatusCodes.OK).success({ result: mission });
};

import { StatusCodes } from "http-status-codes";
import { bodyToReview } from "../dtos/review.dto.js";
import { CreateReview, listMyReviews } from "../services/review.service.js";
export const createStoreReview = async (req, res, next) => {
  /*
    #swagger.summary = '가게 리뷰 등록 API'
    #swagger.tags = ['Review']
    #swagger.description = '사용자가 특정 가게에 대한 리뷰를 작성합니다.'

    #swagger.parameters['user_id'] = {
      in: 'query',
      description: '리뷰 작성자 ID',
      required: true,
      type: 'integer',
      example: 1
    }
    #swagger.parameters['store_name'] = {
      in: 'query',
      description: '가게 이름',
      required: true,
      type: 'string',
      example: '홍콩반점'
    }

    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            required: ["score", "text"],
            properties: {
              score: { type: "integer", example: 5 },
              text: { type: "string", example: "맛있고 양 많아요!" }
            }
          }
        }
      }
    }

    #swagger.responses[200] = {
      description: "리뷰 등록 성공",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              result: {
                type: "integer",
                example: 123
              }
            }
          }
        }
      }
    }

    #swagger.responses[400] = {
      description: "리뷰 등록 실패 (존재하지 않는 가게 등)",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "FAIL" },
              error: {
                type: "object",
                properties: {
                  errorCode: { type: "string", example: "R001" },
                  reason: { type: "string", example: "존재하지 않는 가게입니다." },
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
  const review = await CreateReview(bodyToReview(data));
  res.status(StatusCodes.OK).success({ result: review });
};

export const joinMyReview = async (req, res, next) => {
  /*
    #swagger.summary = '내 리뷰 목록 조회 API'
    #swagger.tags = ['Review']
    #swagger.description = '사용자의 userId를 기반으로 등록된 리뷰들을 모두 조회합니다.'

    #swagger.parameters['userId'] = {
      in: 'path',
      description: '리뷰를 조회할 유저의 ID',
      required: true,
      type: 'integer',
      example: 1
    }

    #swagger.responses[200] = {
      description: '리뷰 목록 조회 성공',
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
                    user_id: { type: "integer", example: 1 },
                    store_id: { type: "integer", example: 5 },
                    score: { type: "integer", example: 4 },
                    text: { type: "string", example: "맛있어요!" },
                    created_time: { type: "string", format: "date-time", example: "2024-05-01T12:00:00.000Z" },
                    updated_time: { type: "string", format: "date-time", example: "2024-05-01T12:30:00.000Z" }
                  }
                }
              }
            }
          }
        }
      }
    }

    #swagger.responses[404] = {
      description: '해당 유저의 리뷰가 존재하지 않음',
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "FAIL" },
              error: {
                type: "object",
                properties: {
                  errorCode: { type: "string", example: "R404" },
                  reason: { type: "string", example: "리뷰가 없습니다." },
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
  const reviews = await listMyReviews(req.params.userId);
  res.status(StatusCodes.OK).success({ result: reviews });
};

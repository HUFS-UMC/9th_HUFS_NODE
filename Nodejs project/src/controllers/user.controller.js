import { StatusCodes } from "http-status-codes";
import { modifyUserInfo } from "../services/user.service.js";

export const patchUserInfo = async (req, res, next) => {
  /*
    #swagger.summary = '세션 기반 사용자 정보 수정 API(세션으로 인하여 swagger에서 요청 불가)'
    #swagger.tags = ['User']
    #swagger.description = '세션을 기반으로 user/userinfo 테이블의 정보를 수정합니다.'
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              profile_picture_url: { type: "string", example: "https://example.com/image.jpg" },
              email: { type: "string", example: "test@example.com" },
              locate: { type: "string", example: "서울" },
              gender: { type: "integer", example: 1 },
              birth: { type: "string", example: "1990-01-01" },
              phone_num: { type: "string", example: "010-1234-5678" },
              phone_num_certificated: { type: "boolean", example: true },
              nickname: { type: "string", example: "cool_user" },
              pw: { type: "string", example: "newpassword123" }
            }
          }
        }
      }
    }
    #swagger.responses[200] = {
      description: '사용자 정보 수정 성공',
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              result: { type: "object" }
            }
          }
        }
      }
    }
    #swagger.responses[400] = {
      description: '세션이 없거나 잘못된 요청'
    }
    #swagger.responses[500] = {
      description: '서버 오류'
    }
  */

  try {
    const session = req.session;
    if (!session || !session.userId) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "세션 정보가 없습니다." });
    }

    const result = await modifyUserInfo(session.userId, req.body);
    res.status(StatusCodes.OK).success({ result });
  } catch (error) {
    next(error);
  }
};

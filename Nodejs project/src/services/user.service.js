import { updateUserInfoInDB } from "../repositories/user.repository.js";

export const modifyUserInfo = async (userId, data) => {
  const result = await updateUserInfoInDB(userId, data);
  if (!result) {
    throw new Error("유저 정보를 수정할 수 없습니다.");
  }
  return result;
};

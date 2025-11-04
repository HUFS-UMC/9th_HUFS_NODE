import { prisma } from "../db.config.js";

export const updateUserInfoInDB = async (userId, data) => {
  const updateUserinfo = prisma.userinfo.updateMany({
    where: { user_id: BigInt(userId) },
    data: {
      ...(data.profile_picture_url && {
        profile_picture_url: data.profile_picture_url,
      }),
      ...(data.email && { email: data.email }),
      ...(data.locate && { locate: data.locate }),
      ...(typeof data.gender === "number" && { gender: data.gender }),
      ...(data.birth && { birth: data.birth }),
      ...(data.phone_num && { phone_num: data.phone_num }),
      ...(typeof data.phone_num_certificated === "boolean" && {
        phone_num_certificated: data.phone_num_certificated,
      }),
      ...(data.nickname && { nickname: data.nickname }),
      updated_time: new Date(),
    },
  });

  // 비밀번호 변경이 있는 경우 user 테이블도 업데이트
  let updateUser = null;
  if (data.pw) {
    updateUser = prisma.user.update({
      where: { id: BigInt(userId) },
      data: {
        pw: data.pw,
        updated_time: new Date(),
      },
    });
  }

  const [userInfoResult, userResult] = await prisma.$transaction([
    updateUserinfo,
    updateUser,
  ]);

  return userInfoResult.count > 0 || userResult
    ? { userInfoResult, userResult }
    : null;
};

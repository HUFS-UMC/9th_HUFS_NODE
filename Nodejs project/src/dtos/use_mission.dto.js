export const bodyCreateUserMission = (body) => {
  return {
    mission_id: body.mission_id,
    user_id: body.user_id,
    is_completed: body.is_completed || false,
  };
};

export const responseUserUndergoingMission = (body) => {
  return {
    id: body.id,
    name: body.name,
    payment: body.payment,
    point: body.point,
    created_time: body.created_time,
  };
};

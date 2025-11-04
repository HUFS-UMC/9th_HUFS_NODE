export const bodyToMission = (body) => {
  return {
    store_name: body.store_name,
    payment: body.payment,
    point: body.point,
  };
};

export const responseStoreMission = (body) => {
  return {
    id: body.id,
    name: body.name,
    payment: body.payment,
    point: body.point,
    created_time: body.created_time,
  };
};

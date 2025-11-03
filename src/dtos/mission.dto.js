export const bodyToMission = (body, params = {}) => {
  return {
    storeId: params.storeId ? Number(params.storeId) : body.storeId ? Number(body.storeId) : null,
    title: body.title || body.name || null,
  };
};

export const responseFromMission = ({ mission }) => {
  if (!mission) return null;
  return {
    id: mission.id,
    storeId: mission.storeId,
    title: mission.title,
  };
};

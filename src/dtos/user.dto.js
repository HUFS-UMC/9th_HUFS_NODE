export const bodyToUser = (body) => {
  return {
    email: body.email || body.userEmail || null,
    name: body.name || body.userName || null,
    gender: body.gender || null,
    birth: body.birth || null,
    address: body.address || null,
    detailAddress: body.detailAddress || body.detail_address || null,
    phoneNumber: body.phoneNumber || body.phone_number || null,
    password: body.password || null,
    preferences: Array.isArray(body.preferences) ? body.preferences : [],
  };
};

export const responseFromUser = ({ user, preferences }) => {
  if (!user) return null;
  const u = Array.isArray(user) ? user[0] : user;
  return {
    id: u.id,
    email: u.email,
    name: u.name,
    gender: u.gender,
    birth: u.birth,
    address: u.address,
    detailAddress: u.detail_address || u.detailAddress,
    phoneNumber: u.phone_number || u.phoneNumber,
    preferences: preferences || [],
  };
};

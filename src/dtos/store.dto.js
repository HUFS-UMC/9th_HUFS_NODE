export const bodyToStore = (body) => {
  // normalize incoming request body to the shape the service expects
  return {
    store_name: body.store_name || body.name || body.Store_name,
    store_num: body.store_num || body.Store_num || body.phoneNumber || null,
    store_address: body.store_address || body.address || body.Store_address || null,
    area: body.area || body.areaCode || null,
  };
};

export const responseFromStore = ({ store }) => {
  if (!store) return null;

  return {
    id: store.id,
    name: store.name,
  };
};

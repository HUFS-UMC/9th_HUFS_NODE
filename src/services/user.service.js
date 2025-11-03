import { responseFromUser } from "../dtos/user.dto.js";
import bcrypt from "bcryptjs";
import { responseFromStore } from "../dtos/store.dto.js";
import {
  addUser,
  getUser,
  getUserPreferencesByUserId,
  setPreference,
} from "../repositories/user.repository.js";
import { addStore, getStoreById } from "../repositories/store.repository.js";

export const userSignUp = async (data) => {
  // hash password before creating user
  const hashedPassword = data.password ? await bcrypt.hash(data.password, 10) : null;

  const joinUserId = await addUser({
    email: data.email,
    name: data.name,
    gender: data.gender,
    birth: data.birth,
    address: data.address,
    detailAddress: data.detailAddress,
    phoneNumber: data.phoneNumber,
    password: hashedPassword,
  });

  if (joinUserId === null) {
    throw new Error("이미 존재하는 이메일입니다.");
  }

  for (const preference of data.preferences) {
    await setPreference(joinUserId, preference);
  }

  const user = await getUser(joinUserId);
  const preferences = await getUserPreferencesByUserId(joinUserId);

  return responseFromUser({ user, preferences });
};


export const StoreAdd = async (data) => {
  // create a store using the store repository (Prisma)
  const storeId = await addStore({
    store_name: data.store_name,
    store_num: data.store_num,
    store_address: data.store_address,
    area: data.area,
  });

  if (storeId === null || storeId === undefined) {
    throw new Error("가게 생성에 실패했습니다.");
  }

  const store = await getStoreById(storeId);

  return responseFromStore({ store });
};
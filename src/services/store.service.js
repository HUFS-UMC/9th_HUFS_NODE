// src/services/store.service.js

//  수정: address.repository.js에서 필요한 함수를 명시적으로 가져옵니다.
import { findAddressId, insertAddress } from "../repositories/address.repository.js"; 
import * as storeRepo from "../repositories/store.repository.js";

/**
 * [SERVICE] 1-1. 특정 지역에 가게 추가
 * - 주소 중복 검사 -> 주소 생성 -> 가게 생성 순으로 Repository를 조합합니다.
 */
export const createStore = async ({ storeData, addressData }) => {
    // 1. 주소 중복 검사: addressRepo 객체 없이 함수 이름으로 바로 호출합니다.
    let addressId = await findAddressId(addressData); 

    if (!addressId) {
        // 2. 주소가 없으면 새로 생성
        addressId = await insertAddress(addressData); // 함수 이름으로 바로 호출
    }
    
    // 3. 획득한 addressId (FK)를 사용하여 가게 정보 생성
    // storeRepo는 * as storeRepo로 가져왔으므로 객체 형태로 호출합니다.
    const storeId = await storeRepo.insertStore(storeData, addressId);

    return { storeId, addressId };
};


import { getAllStoreReviews } from '../repositories/store.repository.js';
import { responseFromReviews } from '../dtos/store.dto.js';


//리뷰 조회 함수 Service에서는 단순히 Repository를 호출하고, 이를 DTO로 변환해 반환하는 로직을 구현할 거예요.
export const listStoreReviews = async (store_id) => {
  const reviews = await getAllStoreReviews(store_id);
  return responseFromReviews(reviews);
};
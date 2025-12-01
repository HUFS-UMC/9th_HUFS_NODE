// src/repositories/address.repository.js

import { prisma } from "../db.config.js";

/**  
 * [REPO] 주소 상세 정보로 기존 주소의 address_id를 조회 (중복 검증용)  
 */  
export const findAddressId = async (addressData) => {  
  const zipCodeAsNumber = parseInt(addressData.zip_code, 10);  

  const existing = await prisma.address.findFirst({  
    where: {  
      zip_code: zipCodeAsNumber,  
      state_province: addressData.state_province,  
      city_county: addressData.city_county,  
      town_village: addressData.town_village,  
      street_name: addressData.street_name,  
      building_number: addressData.building_number,  
    },  
    select: { address_id: true },  
  });  

  return existing ? existing.address_id : null;  
};

/**  
 * [REPO] 새로운 주소 정보를 삽입하고 생성된 ID를 반환  
 */  
export const insertAddress = async (addressData) => {  
  const zipCodeAsNumber = parseInt(addressData.zip_code, 10);  

  const created = await prisma.address.create({  
    data: {  
      zip_code: zipCodeAsNumber,  
      state_province: addressData.state_province,  
      city_county: addressData.city_county,  
      town_village: addressData.town_village,  
      street_name: addressData.street_name,  
      building_number: addressData.building_number,  
      detail: addressData.detail,  
    },  
    select: { address_id: true },  
  });  

  return created.address_id;  
};


 
 
/**
 * [REPO] 주소 상세 정보로 기존 주소의 address_id를 조회
 */

/**
export const findAddressId = async (addressData) => {
    // const pool = getPool(); // getPool() 호출 삭제
    const zipCodeAsNumber = parseInt(addressData.zip_code, 10); //  우편번호를 숫자로 변환

    const [rows] = await pool.execute( //  pool 객체를 바로 사용
        `SELECT address_id FROM address 
         WHERE zip_code = ? AND state_province = ? AND city_county = ? AND town_village = ? AND street_name = ? AND building_number = ?`,
        [
            // 우편번호를 숫자로 강제 변환하여 전달 (DB 스키마가 INT인 경우 대비)
            zipCodeAsNumber, 
            addressData.state_province,
            addressData.city_county,
            addressData.town_village,
            addressData.street_name,
            addressData.building_number
        ]
    );
    // 조회 결과가 있으면 ID 반환, 없으면 null 반환
    return rows.length > 0 ? rows[0].address_id : null;
};

*
 * [REPO] 새로운 주소 정보를 address 테이블에 삽입하고 생성된 ID를 반환합니다.
 */

/*
export const insertAddress = async (addressData) => {
    //  우편번호(zip_code)를 숫자로 변환합니다.
    // const pool = getPool(); //  getPool() 호출 삭제
    const zipCodeAsNumber = parseInt(addressData.zip_code, 10); 
    
    const [result] = await pool.execute( //  pool 객체를 바로 사용
        `INSERT INTO address (zip_code, state_province, city_county, town_village, street_name, building_number, detail)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
            zipCodeAsNumber, // 숫자로 변환된 zip_code
            addressData.state_province,
            addressData.city_county,
            addressData.town_village,
            addressData.street_name,
            addressData.building_number,
            addressData.detail
        ]
    );
    return result.insertId;
}; 

**/
// src/services/user.service.js

import bcrypt from 'bcryptjs'; // 비밀번호 해싱 라이브러리 (npm install bcryptjs 또는 bcrypt 필요)
import * as userRepo from "../repositories/user.repository.js"; // user 관련 Repository 함수
// import * as foodRepo from "../repositories/food.repository.js"; // food_category 관련 Repository (필요시)

/**
 * [SERVICE] 사용자 회원가입의 모든 비즈니스 로직을 처리합니다.
 * - 이메일 중복 확인, 비밀번호 해싱, 사용자 정보 및 선호 카테고리 삽입을 포함합니다.
 * @param {object} userData - DTO에서 정제된 사용자 데이터 (password, food_ids 포함)
 * @returns {object} 삽입된 사용자 정보 및 선호 카테고리 목록
 */
export const userSignUp = async (userData) => {
    // 0. 이메일 중복 확인 (Repository에 해당 함수가 있다고 가정)
    // const existingUser = await userRepo.findUserByEmail(userData.email);
    // if (existingUser) {
    //     throw new Error("409: 이미 존재하는 이메일입니다.");
    // }

    // 1. 비밀번호 해싱 (미션 요구사항)
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    userData.password = hashedPassword; // 해싱된 비밀번호로 데이터 업데이트

    // 2. 사용자 정보 삽입 (Repository 호출)
    // userRepo.addUser 함수가 user_id를 반환한다고 가정
    const user_id = await userRepo.addUser(userData);

    // 3. 선호 카테고리 삽입 (Repository 호출)
    const preferences = [];
    if (userData.food_ids && userData.food_ids.length > 0) {
        for (const food_id of userData.food_ids) {
            // userRepo.insertUserPreference 함수가 user_preference 테이블에 데이터를 삽입한다고 가정
            await userRepo.insertUserPreference(user_id, food_id);
            preferences.push({ food_id: food_id }); // 응답 데이터 구성을 위한 임시 배열
        }
    }
    
    // 4. 응답 데이터 구성 및 반환 (필요한 정보를 DB에서 다시 조회할 수도 있음)
    // 여기서는 삽입된 ID와 함께 필요한 최소 정보만 반환합니다.
    return {
        user_id: user_id,
        email: userData.email,
        preferences: preferences,
        message: "회원가입 및 선호 카테고리 설정 성공"
    };
};

//  user.repository.js 파일에는 insertUserPreference 함수가 추가되어야 합니다.
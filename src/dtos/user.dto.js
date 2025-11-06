// src/dtos/user.dto.js

/**
 * 요청 본문을 받아 DB 컬럼명에 맞춰 데이터를 정제합니다. (회원가입 요청)
 */
export const bodyToUser = (body) => {
    // birth 필드명 변경 및 Date 객체 변환 (DB: birth_date)
    const birthDate = new Date(body.birth); 
    
    return {
        // 필수 값
        email: body.email, 
        password: body.password, //  Service에서 해싱 처리 예정
        gender: body.gender,     
        birth_date: birthDate,   
        
        // 탈퇴 관련 필드 (NOT NULL 제약 조건 임시 처리)
        withdrawal_request_time: new Date(),
        withdrawal_due_time: new Date(),
        
        // 선호 음식 ID 목록 (user_preference 테이블용)
        food_ids: body.preferences || [],
    };
};

/**
 * DB에서 조회한 사용자 정보를 클라이언트 응답 형식으로 가공합니다.
 */
export const responseFromUser = (user, preferences) => {
    return {
        user_id: user.user_id, 
        email: user.email,    
        gender: user.gender,
        
        // 선호 음식 목록 가공
        preferences: preferences.map(pref => ({
            food_id: pref.food_id, 
            foodName: pref.name,  
        })),
    };
};

import dotenv from 'dotenv';

// 1순위: 환경 변수 로드 (DB_USER 오류 방지)
dotenv.config(); 


import express from 'express';
import cors from 'cors';

// ✅ src 폴더 포함해서 경로 수정
import { handleUserSignUp } from './src/controllers/user.controller.js';
import { handleCreateStore } from './src/controllers/store.controller.js';
import { handleCreateReview } from './src/controllers/review.controller.js';
import { handleCreateMission, handleChallengeMission } from './src/controllers/mission.controller.js';
//리뷰 조회 함수
import { handleListStoreReviews } from './src/controllers/store.controller.js';
//내 미션 확인
import { handleMyReviews } from './src/controllers/review.controller.js';
//미션 관련
import { handleListMyActiveMissions, handleCompleteMission } from './src/controllers/mission.controller.js';


const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// 사용자 라우트
app.post("/api/v1/users/signup", handleUserSignUp);

// 가게 관련
app.post("/api/v1/stores", handleCreateStore);

// 리뷰 관련
app.post("/api/v1/stores/:store_id/reviews", handleCreateReview);

// 미션 관련
app.post("/api/v1/stores/:store_id/missions", handleCreateMission);
app.post("/api/v1/users/challenges/:mission_id", handleChallengeMission);

// 서버 리스닝
app.listen(port, () => {
    console.log(`✅ Example app listening on port ${port}`);
});


//리뷰 조회하기
app.get("/api/v1/stores/:storeId/reviews", handleListStoreReviews);


// 내 미션 확인
app.get("/api/v1/users/:user_id/reviews", /* authenticateUser, */ handleMyReviews);
//인증정보 필요할 시에 auth 이용

// 미션 목록 조회
app.get("/api/v1/users/:user_id/missions/active", /* authenticateUser, */ handleListMyActiveMissions);

// 미션 완료 처리
app.patch("/api/v1/users/:user_id/missions/:mission_id/complete", /* authenticateUser, */ handleCompleteMission);
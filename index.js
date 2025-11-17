
import dotenv from 'dotenv';

// 1순위: 환경 변수 로드 (DB_USER 오류 방지)
dotenv.config(); 


import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';

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

app.use(morgan('dev'));
app.use(cookieParser()); 


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


// 쿠키 만드는 라우터 
app.get('/setcookie', (req, res) => {
    // 'myCookie'라는 이름으로 'hello' 값을 가진 쿠키를 생성
    res.cookie('myCookie', 'hello', { maxAge: 60000 }); // 60초간 유효
    res.send('쿠키가 생성되었습니다!');
});

// 쿠키 읽는 라우터 
app.get('/getcookie', (req, res) => {
    // cookie-parser 덕분에 req.cookies 객체에서 바로 꺼내 쓸 수 있음
    const myCookie = req.cookies.myCookie; 
    
    if (myCookie) {
        console.log(req.cookies); // { myCookie: 'hello' }
        res.send(`당신의 쿠키: ${myCookie}`);
    } else {
        res.send('쿠키가 없습니다.');
    }
});
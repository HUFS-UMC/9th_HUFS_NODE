// src/db.config.js
//import mysql from 'mysql2/promise';

import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

import dotenv from 'dotenv'; // 

dotenv.config(); // 반드시 맨 위에서 로드

/*
// .env 파일의 환경 변수가 로드되는 시점에 pool 객체를 직접 생성하여 export 합니다.
export const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

*/



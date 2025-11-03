import express from 'express';
import { prisma } from './prisma.js';
const app = express();

// 1. 내가 작성한 리뷰 목록
app.get('/me/reviews/:userId', async (req, res) => {
  const reviews = await prisma.review.findMany({
    where: { userId: Number(req.params.userId) },
    include: { store: true },
  });
  res.json(reviews);
});

// 2. 특정 가게의 미션 목록
app.get('/stores/:storeId/missions', async (req, res) => {
  const missions = await prisma.mission.findMany({
    where: { storeId: Number(req.params.storeId) },
  });
  res.json(missions);
});

// 3. 내가 진행 중인 미션 목록
app.get('/me/missions/:userId', async (req, res) => {
  const missions = await prisma.userMission.findMany({
    where: { userId: Number(req.params.userId), status: 'ONGOING' },
    include: { mission: true },
  });
  res.json(missions);
});

// 4. 진행 중 미션 완료 처리
app.patch('/missions/:id/complete', async (req, res) => {
  const mission = await prisma.userMission.update({
    where: { id: Number(req.params.id) },
    data: { status: 'COMPLETED' },
  });
  res.json(mission);
});

app.listen(3000, () => console.log('✅ Server running'));

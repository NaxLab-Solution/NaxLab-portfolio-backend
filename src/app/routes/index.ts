import { Router } from 'express';
import { memberRoute } from '../controllers/member/member.route';
const router = Router();

const moduleRoutes = [

  {
    path: '/member',
    route: memberRoute,
  }
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;

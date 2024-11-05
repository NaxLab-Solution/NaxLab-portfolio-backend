import { Router } from 'express';
import { memberRoute } from '../controllers/member/member.route';
import { ProjectRoutes } from '../controllers/project/project.route';
const router = Router();

const moduleRoutes = [

  {
    path: '/member',
    route: memberRoute,
  },
  {
    path: '/project',
    route: ProjectRoutes,
  }
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;

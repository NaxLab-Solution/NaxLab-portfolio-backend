import { Router } from 'express';
import { memberRoute } from '../controllers/member/member.route';
import { ProjectRoutes } from '../controllers/project/project.route';
import { TagRoutes } from '../controllers/tag/tag.route';
import { CategoryRoutes } from '../controllers/category/category.route';
const router = Router();

const moduleRoutes = [
  {
    path: '/member',
    route: memberRoute,
  },
  {
    path: '/project',
    route: ProjectRoutes,
  },
  {
    path: '/tag',
    route: TagRoutes,
  },
  {
    path: '/category',
    route: CategoryRoutes,
  }
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;

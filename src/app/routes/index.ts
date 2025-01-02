import { Router } from 'express';
import { memberRoute } from '../controllers/member/member.route';
import { ProjectRoutes } from '../controllers/project/project.route';
import { TagRoutes } from '../controllers/tag/tag.route';
import { CategoryRoutes } from '../controllers/category/category.route';
import { TestimonialRoutes } from '../controllers/testimonial/testimonial.route';
import { CompanyRoutes } from '../controllers/company/company.route';
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
  },
  {
    path: '/testimonial',
    route: TestimonialRoutes,
  },
  {
    path: '/company',
    route: CompanyRoutes,
  }
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;

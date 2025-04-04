import { Router } from 'express';
import technologyController from './technology.controller';
import AuthMiddleware from '../../../Middleware/Auth.middleware';

const router = Router();

router.get(
  '/v1/find/technologies',
  AuthMiddleware.Verify_Super_Admin,
  technologyController.getTechnologies,
);
router.get(
  '/v1/find/single/technologies/:id',
  AuthMiddleware.Verify_Super_Admin,
  technologyController.getTechnologyById,
);
router.post(
  '/v1/create/technologies',
  AuthMiddleware.Verify_Super_Admin,
  technologyController.createTechnology,
);
router.put(
  '/v1/update/technologies/:id',
  AuthMiddleware.Verify_Super_Admin,
  technologyController.updateTechnology,
);
router.delete(
  '/v1/delete/technologies/:id',
  AuthMiddleware.Verify_Super_Admin,
  technologyController.deleteTechnology,
);

router.get(
  '/v1/find/technologiesByUser',
  AuthMiddleware.Verify_Super_Admin,
  technologyController.getTechnologyByUser,
);

router.post(
  '/v1/choose/technologies',
  AuthMiddleware.Verify_Super_Admin,
  technologyController.chooseTechnology,
);

export { router as TechnologyRoutes };

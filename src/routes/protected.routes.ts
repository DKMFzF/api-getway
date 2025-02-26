import { Router } from 'express';
import { protectedRoute } from '../controllers/protected.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

/**
 * роуты для защищенных ресурсов
 */

const router = Router();

router.get('/protected', authMiddleware, protectedRoute);

export default router;
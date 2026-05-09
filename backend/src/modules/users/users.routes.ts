import { Router } from 'express';
import { UserController } from './users.controller';
import { verifyJWT, authorize } from '../../middleware/auth.middleware';

const router = Router();

router.use(verifyJWT, authorize('admin'));

router.get('/', UserController.getAllUsers);
router.delete('/:id', UserController.deleteUser);

export default router;

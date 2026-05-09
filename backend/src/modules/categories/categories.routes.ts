import { Router } from 'express';
import { CategoryController } from './categories.controller';
import { verifyJWT, authorize } from '../../middleware/auth.middleware';

const router = Router();

router.get('/', CategoryController.getCategories);

// Admin only
router.post('/', verifyJWT, authorize('admin'), CategoryController.createCategory);
router.patch('/:id', verifyJWT, authorize('admin'), CategoryController.updateCategory);
router.delete('/:id', verifyJWT, authorize('admin'), CategoryController.deleteCategory);

export default router;

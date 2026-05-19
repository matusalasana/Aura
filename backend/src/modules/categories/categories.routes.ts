import { Router } from 'express';
import { CategoryController } from './categories.controller';
import { verifyJWT, authorize } from '../../middleware/auth.middleware';
import {
  createCategorySchema,
  updateCategorySchema
} from "./categories.validation"
import { validate } from '../../middleware/validation.middleware';

const router = Router();

router.get('/', CategoryController.getCategories);

// Admin only
router.post('/', validate(createCategorySchema), verifyJWT, authorize('admin'), CategoryController.createCategory);
router.patch('/:id', validate(updateCategorySchema), verifyJWT, authorize('admin'), CategoryController.updateCategory);
router.delete('/:id', verifyJWT, authorize('admin'), CategoryController.deleteCategory);

export default router;

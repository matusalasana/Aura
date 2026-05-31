import { Router } from 'express';
import { ProductsController } from './products.controller';
import { verifyJWT, authorize } from '../../middleware/auth.middleware';
import { validate } from '../../middleware/validation.middleware';


import { 
  updateProductSchema, 
  createProductSchema } from './products.validation';

const router = Router();

router.get('/', ProductsController.getAll);
router.get('/:id', ProductsController.getOne);
 
// Admin only routes

// authorize('admin'), validate(createProductSchema),
router.post('/', ProductsController.create);
router.patch('/:id', verifyJWT, authorize('admin'), ProductsController.update);
router.delete('/:id', verifyJWT, authorize('admin'), ProductsController.deleteOne);

export default router;

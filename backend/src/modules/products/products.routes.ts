import { Router } from 'express';
import { 
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} from './products.controller';
import { verifyJWT, authorize } from '../../middleware/auth.middleware';
import { validate } from '../../middleware/validation.middleware';
import { 
  updateProductSchema, 
  createProductSchema } from './products.validation';

const router = Router();

router.get('/', getProducts);
router.get('/:id', getProductById);
 
// Admin only routes

// authorize('admin'), validate(createProductSchema),
router.post('/',  createProduct);
router.patch('/:id', verifyJWT, authorize('admin'), updateProduct);
router.delete('/:id', verifyJWT, authorize('admin'), deleteProduct);

export default router;

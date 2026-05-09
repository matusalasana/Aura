import { Router } from 'express';
import { 
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} from './products.controller';
import { verifyJWT, authorize } from '../../middleware/auth.middleware';

const router = Router();

router.get('/', getProducts);
router.get('/:id', getProductById);

// Admin only routes
router.post('/', verifyJWT, authorize('admin'), createProduct);
router.patch('/:id', verifyJWT, authorize('admin'), updateProduct);
router.delete('/:id', verifyJWT, authorize('admin'), deleteProduct);

export default router;

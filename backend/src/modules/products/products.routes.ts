import { Router } from 'express';
import multer from "multer";
import { 
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} from './products.controller';
import { verifyJWT, authorize } from '../../middleware/auth.middleware';
import { validate } from '../../middleware/validation.middleware';
// import { upload } from '../../middleware/upload.middleware';

import { 
  updateProductSchema, 
  createProductSchema } from './products.validation';

const router = Router();
const upload = multer({ dest: 'uploads/' });

router.get('/', getProducts);
router.get('/:id', getProductById);
 
// Admin only routes

// authorize('admin'), validate(createProductSchema),
router.post('/', upload.single('myFile'),  createProduct);
router.patch('/:id', verifyJWT, authorize('admin'), updateProduct);
router.delete('/:id', verifyJWT, authorize('admin'), deleteProduct);

export default router;

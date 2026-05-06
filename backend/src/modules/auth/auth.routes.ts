import { Router } from 'express';
import { 
  register,
  login,
  logout,
  refresh,
  getCurrentUser,
  forgotPassword,
  resetPassword,
  verifyEmail
} from './auth.controller';
import { registerSchema, loginSchema, forgotPasswordSchema, resetPasswordSchema } from './auth.validation';
import { verifyJWT } from '../../middleware/auth.middleware';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', verifyJWT, logout);
router.post('/refresh', refresh);
router.get('/me', verifyJWT, getCurrentUser);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
router.post('/verify-email', verifyEmail);

export default router;

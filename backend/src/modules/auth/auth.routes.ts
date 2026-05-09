import { Router } from 'express';

import {
  register,
  login,
  logout,
  getCurrentUser,
  // refresh
} from './auth.controller';

import {
  verifyJWT,
} from '../../middleware/auth.middleware';

const router = Router();

router.post('/register', register);

router.post('/login', login);

router.post( '/logout', verifyJWT, logout );

router.get( '/me', verifyJWT, getCurrentUser );

// router.post("/refresh", refresh);

export default router;
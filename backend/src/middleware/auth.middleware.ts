import { Request, Response, NextFunction } from 'express';

import { 
  ACCESS_TOKEN_SECRET } from '../config/env';
import { 
  verifyAccessToken } from '../utils/jwt';

export const verifyJWT = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies?.accessToken;

  if (!token) {
    throw new Error('Unauthorized request');
  }

  try {
    const decodedToken = verifyAccessToken(token) as any;
    req.user = decodedToken;
    next();
  } catch (error) {
    throw new Error('Invalid access token');
  }
};

export const authorize = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      throw new Error('Forbidden: You do not have permission to perform this action');
    }
    next();
  };
};

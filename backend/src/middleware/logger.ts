import { Request, Response, NextFunction } from 'express';
import logger from '@/utils/logger.js';

const loggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
  logger.http(`${req.method} ${req.url}`);
  next();
};

export { loggerMiddleware };

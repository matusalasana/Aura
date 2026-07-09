import { Request, Response, NextFunction } from "express";
import logger from "../utils/logger"

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.error(err.cause || err.message);

  const statusCode = err.statusCode || err.status || 500;
  const message = err.cause || err.message || "Internal Server Error";

  res.status(statusCode).json({
    success: false,
    message,
  });
};
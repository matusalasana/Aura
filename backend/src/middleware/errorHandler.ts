import { Request, Response } from "express";
import logger from "@/utils/logger";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response
) => {
  logger.error(err);

  const statusCode = err.statusCode || err.status || 500;
  const message = err.message || "Internal Server Error";

  res.status(statusCode).json({
    success: false,
    message,
  });
};
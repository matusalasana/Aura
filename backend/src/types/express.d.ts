import { Request } from "express";

declare global {
  namespace Express {
    interface Request {
      storeId: string;
      user: any;
      role: string;
    }
  }
}

export {};

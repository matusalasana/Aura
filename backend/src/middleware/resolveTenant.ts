import { Request, Response, NextFunction } from "express";
import { db } from "../db";
import { stores } from "../db/schema/stores";
import { eq } from "drizzle-orm";
import logger from "../utils/logger"
 
export const resolveTenant =  async(
  req: Request, 
  res: Response,
  next: NextFunction) => {
  const host = req.hostname;
  const subdomain = host.split(".")[0];
    logger.info(`host: ${host}`)
    logger.info(`subdomain: ${subdomain}`)
  
 
  const [store] = await db
    .select()
    .from(stores)
    .where(eq(stores.subdomain, subdomain))
    .limit(1);
 
  if (!store || !store.isActive) {
    return res.status(404).json({ error: "Store not found" });
  }
 
  req.store = {
    storeId: store.id,
    subdomain,
    host
  }
  next();
}
import type { Request, Response, NextFunction } from "express";
import { eq } from "drizzle-orm";

import { db } from "@/db/index.js";
import { stores } from "@/db/schema/stores";
import { getSubdomain } from "@/utils/getSubdomain.js";
import { logger } from "@/utils/logger.js";
import { Env } from "@/config/env.js";

export const resolveTenant = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let hostname;

  if(Env.NODE_ENV === "development"){
    hostname = Env.TEST_HOSTNAME
  }else{
    hostname = req.hostname;
  }

  const subdomain = getSubdomain(hostname);

  logger.warn(`${hostname}`)
  logger.warn(`${subdomain}`)

  const [store] = await db
    .select()
    .from(stores)
    .where(eq(stores.slug, subdomain))
    .limit(1);

  if (!store) {
    return res.status(404).json({
      message: "Store not found",
    });
  }

  req.store = store;

  next();
};
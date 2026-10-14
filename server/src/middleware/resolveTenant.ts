import type { Request, Response, NextFunction } from "express";
import { eq } from "drizzle-orm";

import { db } from "@/db/index.js";
import { stores } from "@/db/schema/index.js";
import { Env } from "@/config/env.js";

export const resolveTenant = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  
  const { slug } = req.params;
  console.log("Slug:", slug)

  const store = await db.query.stores.findFirst({
    where: eq(stores.slug, slug),
  });

  console.log("Store:", store)

  if (!store) {
    return res.status(404).json({
      message: "Store not found",
    });
  }

  req.store = store;

  next();
};
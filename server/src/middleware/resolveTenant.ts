import type { Request, Response, NextFunction } from "express";
import { db } from "@/db/index.js";
import { stores } from "@/db/schema/stores";
import { eq } from "drizzle-orm";

export const resolveTenant = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const hostname = req.hostname;

  const parts = hostname.split(".");

  if (parts.length < 3) {
    return res.status(400).json({
      message: "Tenant could not be determined",
    });
  }

  const storeSlug = parts[0];

  const [tenant] = await db
    .select()
    .from(stores)
    .where(eq(stores.slug, storeSlug))
    .limit(1);

  if (!tenant) {
    return res.status(404).json({
      message: "Tenant not found",
    });
  }

  req.tenant = tenant;

  next();
};
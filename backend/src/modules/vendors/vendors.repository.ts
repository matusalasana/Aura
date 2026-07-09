import { db } from "../../db";
import { vendors } from "../../db/schema/vendors";

import { eq } from "drizzle-orm";

/* --------------------------- FIND BY USER ID --------------------------- */

const findByUserId = async (userId: string) => {
  const result = await db
    .select()
    .from(vendors)
    .where(eq(vendors.userId, userId))
    .limit(1);

  return result[0] || null;
};

/* ----------------------------- FIND BY ID ------------------------------ */

const findById = async (id: string) => {
  const result = await db
    .select()
    .from(vendors)
    .where(eq(vendors.id, id))
    .limit(1);

  return result[0] || null;
};

/* ---------------------------- FIND BY SLUG ----------------------------- */

const findBySlug = async (slug: string) => {
  const result = await db
    .select()
    .from(vendors)
    .where(eq(vendors.slug, slug))
    .limit(1);

  return result[0] || null;
};

/* ----------------------------- CREATE -------------------------------- */

const create = async (data: {
  userId: string;
  store_name: string;
  description?: string;

  logo: string;
  banner: string;
  license: string;

  status: "pending" | "approved" | "rejected" | "suspended";
}) => {
  const [vendor] = await db
    .insert(vendors)
    .values({
      userId: data.userId,

      storeName: data.store_name,
      description: data.description,

      logo: data.logo,
      banner: data.banner,
      license: data.license,

      status: data.status,
    })
    .returning();

  return vendor;
};

/* ----------------------------- UPDATE -------------------------------- */

const update = async (
  id: string,
  data: Partial<{
    store_name: string;
    description: string;

    logo: string;
    banner: string;
    license: string;

    status: "pending" | "approved" | "rejected" | "suspended";

    rejection_reason: string;
  }>
) => {
  const [vendor] = await db
    .update(vendors)
    .set({
      ...(data.store_name && {
        storeName: data.store_name,
      }),

      ...(data.description && {
        description: data.description,
      }),

      ...(data.logo && {
        logo: data.logo,
      }),

      ...(data.banner && {
        banner: data.banner,
      }),

      ...(data.license && {
        license: data.license,
      }),

      ...(data.status && {
        status: data.status,
      }),

      ...(data.rejection_reason && {
        rejectionReason: data.rejection_reason,
      }),

      updatedAt: new Date(),
    })
    .where(eq(vendors.id, id))
    .returning();

  return vendor;
};

/* ---------------------------- FIND ALL ------------------------------- */

const findAll = async () => {
  return db.select().from(vendors);
};

/* ------------------------------ EXPORT ------------------------------- */

export const VendorRepository = {
  findByUserId,
  findById,
  findBySlug,

  create,
  update,

  findAll,
};
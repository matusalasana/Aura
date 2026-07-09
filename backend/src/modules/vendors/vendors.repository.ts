import { db } from "../../db";
import { vendors } from "../../db/schema/vendors";
import { type CreateVendorInput, type UpdateVendorInput } from "./vendors.validation"
import { eq } from "drizzle-orm";


// FIND BY USER ID
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

const createVendor = async (data: CreateVendorInput) => {
  const [vendor] = await db
    .insert(vendors)
    .values(data)
    .returning();

  return vendor;
};

// UPDATE
const updateMyVendor = async ({
  id,
  data
}: {
  id: string,
  data: UpdateVendorInput
}) => {
  const [vendor] = await db
    .update(vendors)
    .set({
      storeName: data.storeName,
      description: data.description,
      payoutEmail: data.payoutEmail,
      updatedAt: new Date(),
    })
    .where(eq(vendors.id, id))
    .returning();

  return vendor;
};

// FIND ALL
const findAll = async () => {
  return db.select().from(vendors);
};

// EXPORT
export const VendorRepository = {
  findByUserId,
  findById,
  findBySlug,

  createVendor,
  updateMyVendor,

  findAll,
};
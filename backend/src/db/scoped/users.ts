import { eq, and } from "drizzle-orm";
import { db } from "../../db";

import { users } from "../schema/users";



const findMany = async (storeId: string) => {
  const users = await db
    .select()
    .from(users)
    .where(
      eq(users.storeId, storeId),
    );
  
  return users || [];
};


const findByEmail = async ({
  email,
  storeId
}: {
  email: string;
  storeId: string;
}) => {
  const user = await db
    .select()
    .from(users)
    .where(
      and(
        eq(users.email, email),
        eq(users.storeId, storeId)
      )
    )
    .limit(1);

  return user[0] || null;
};


const findById = async ({
  id,
  storeId
}: {
  id: string;
  storeId: string;
}) => {
  const user = await db
    .select()
    .from(users)
    .where(
      and(
        eq(users.id, id),
        eq(users.storeId, storeId)
      )
    )
    .limit(1);

  return user[0] || null;
};



export const scopedUsers = {
  findMany,
  findByEmail,
  findById,
};
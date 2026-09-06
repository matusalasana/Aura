import { faker } from "@faker-js/faker";
import { db } from "../index";
import { addresses } from "../schema/addresses";
import { scopedUsers } from "../scoped/users";
import logger from "../../utils/logger";
import { Env } from "../../config/env"

const me = await scopedUsers.findByEmail(Env.SEED_EMAIL)
export const seedCartItems = async () => {
  try {
    const addresses = Array.from({ length: 4 }, () => {
      const address = {
        userId: me.id,
        street: faker.location.street(),
        city: faker.location.city(),
        state: faker.location.country(),
        postalCode: faker.location.zipCode(),
        country: faker.location.country(),
        isDefault: faker.datatype.boolean()
      };

      return address 
    });

    return await db
      .insert(addresses)
      .values(address)
      .returning();
  } catch (err: any) {
    logger.error(err?.cause || err?.message);
  }
};
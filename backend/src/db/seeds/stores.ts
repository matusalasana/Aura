import { faker } from "@faker-js/faker";
import { db } from "../index";
import { stores } from "../schema/stores";
import logger from "../../utils/logger";

export const seedStores = async () => {
  try {
    const data = {
      storeName: 'AnbesaBonda', 
        'Saron Fashion', 
          'Aura', 
          'Musse Styles'
        ]),
        subdomain: faker.helpers.objectValue({ AnbesaBonda: 120, 
          Saron Fashion: 390, 
          Aura: 0.03,
          Musse Styles: 56
        }) // 390
        `${storeName}.aura.com`,
        isActive: faker.datatype.boolean()
      };

      return store
    });

    return await db
      .insert(stores)
      .values(data)
      .returning();
  } catch (err: any) {
    logger.error(err?.cause || err?.message);
  }
};
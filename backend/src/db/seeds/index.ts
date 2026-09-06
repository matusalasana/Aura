import logger from "../../utils/logger";

import { resetDatabase } from "../reset";
import { seedAddresses } from "../seeds/addresses";
import { seedStores } from "../seeds/stores";

const seed = async() => {
  try{
    
    const stores = await seedStores();
    logger.info(`SEEDED ${stores.length} STORES`)
    
  }catch (err: any) {
    logger.error(err?.cause || err?.message);
  }
};

seed();
import logger from "../../utils/logger";

import { resetDatabase } from "../reset";
import { seedAddresses } from "../seeds/addresses";
import { seedStores } from "../seeds/stores";

const seed = async() => {
  try{
    
    // await resetDatabase();
    // logger.info("✅ DATABASE RESET SUCCESSFULLY")
    
    // const addresses = await seedAddresses();
    // logger.info(`SEEDED ${addresses.length} ADDRESSES`)
    
    const stores = await seedStores();
    logger.info(`SEEDED ${stores.length} STORES`)
    
  }catch (err: any) {
    logger.error(err?.cause || err?.message);
  }
};

seed();
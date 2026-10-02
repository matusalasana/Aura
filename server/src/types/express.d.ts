import { type InferSelectModel } from 'drizzle-orm';

import { type Store } from "@/db/schema/stores.js";
import { type User } from "@/db/schema/auth.js";


declare global {
  namespace Express {
    interface Request {
      user?: User;
      store?: Store;
    }
  }
}


export {};
import type { User } from "better-auth";
import type { Store } from "@/db/schema/index.js";


declare global {
  namespace Express {
    interface Request {
      user?: User;
      store?: Store;
    }
  }
}


export {};
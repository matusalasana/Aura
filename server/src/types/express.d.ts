import type { User } from "better-auth";
import type { Tenant } from "@/db/schema";


declare global {
  namespace Express {
    interface Request {
      user?: User;
      tenant?: Tenant;
    }
  }
}


export {};
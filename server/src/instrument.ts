import * as Sentry from "@sentry/node";
import { Env } from "@/config/env.js"


Sentry.init({
  dsn: Env.SENTRY_DSN,

  environment: Env.NODE_ENV,

  sendDefaultPii: false,
});
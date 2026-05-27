import { Router } from "express";
import { generateUploadSignature } from "./uploads.controller";

const router = Router();

router.get(
  "/signature",
  generateUploadSignature
);

export default router;
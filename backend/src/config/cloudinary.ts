import { v2 as cloudinary } from "cloudinary";
import { Env } from "./env";

cloudinary.config({
  cloud_name: Env.CLOUDINARY_CLOUD_NAME,
  api_key: Env.CLOUDINARY_API_KEY,
  api_secret: Env.CLOUDINARY_API_SECRET,
});

export default cloudinary;
import { Request, Response } from "express";
import cloudinary from "../../config/cloudinary";
import {
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET
} from "../../config/cloudinary";

export const generateUploadSignature = async (
  req: Request,
  res: Response
) => {
  try {
    const timestamp = Math.round(new Date().getTime() / 1000);

    const signature = cloudinary.utils.api_sign_request(
      {
        timestamp,
        folder: "products",
      },
      CLOUDINARY_API_SECRET!
    );

    return res.status(200).json({
      timestamp,
      signature,
      cloudName: CLOUDINARY_CLOUD_NAME,
      apiKey: CLOUDINARY_API_KEY,
      folder: "products",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to generate upload signature",
    });
  }
};
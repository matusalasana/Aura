import type { UploadApiResponse } from "cloudinary";
import cloudinary from "@/config/cloudinary.js";

export const uploadImage = ({
  buffer,
  folder,
  options = {},
}: {
  buffer: Buffer;
  folder: string;
  options?: Record<string, unknown>;
}): Promise<UploadApiResponse> => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: "image",
        ...options,
      },
      (error, result) => {
        if (error) {
          reject(error);
          return;
        }

        if (!result) {
          reject(new Error("Cloudinary returned no upload result"));
          return;
        }

        resolve(result);
      },
    );

    stream.end(buffer);
  });
};

export const deleteImage = async ({
  publicId,
  resourceType = "auto"
}: {
  publicId: string;
  resourceType: string;
}) => {
  const result = await cloudinary.uploader.destroy(
    publicId,
    {
      resource_type: resourceType,
    }
  );

  return result;
};

export const generatePrivateFileUrl = ({
  publicId,
  resourceType = "auto"
}: {
  publicId: string;
  resourceType: string;
}) => {

  const timestamp = Math.round(Date.now() / 1000);

  return cloudinary.utils.private_download_url(
    publicId,
    "",
    {
      resource_type: resourceType,
      expires_at: timestamp + 60 * 5 // 5 mins
    }
  );

};
import cloudinary from "@/config/cloudinary.js";

export const uploadToCloudinary = ({
  buffer, folder, options = {}
}: {
  buffer: Buffer;
  folder: string;
  options: Record<string, unknown>;
}) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: "auto",
        ...options,
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );

    stream.end(buffer);
  });
};

export const deleteFromCloudinary = async ({
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
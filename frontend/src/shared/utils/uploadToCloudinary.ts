import axios from "axios";

export const uploadMultipleToCloudinary = async (files: File[]) => {
  const uploadPromises = files.map(async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append(
      "upload_preset",
      import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
    );

    const res = await axios.post(
      `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
      formData
    );

    if (!res.data.secure_url) {
      throw new Error("Upload failed");
    }

    return res.data.secure_url;
  });

  return await Promise.all(uploadPromises);
};
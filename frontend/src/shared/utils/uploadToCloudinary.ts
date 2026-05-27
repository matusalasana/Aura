import axios from "axios";
import API from "../../config/api";

type UploadResponse = {
  secure_url: string;
  public_id: string;
};

export const uploadToCloudinary = async (
  file: File
) => {
  try {
    // 1. get signature from backend
    const signatureRes = await API.get("/uploads/signature");

    const {
      timestamp,
      signature,
      cloudName,
      apiKey,
      folder,
    } = signatureRes.data;

    // 2. form data
    const formData = new FormData();
    formData.append("file", file);
    formData.append("api_key", apiKey);
    formData.append("timestamp", timestamp);
    formData.append("signature", signature);
    formData.append("folder", folder);

    // 3. upload to cloudinary
    const uploadRes = await axios.post(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      formData
    );

    console.log("CLOUDINARY RESPONSE:", uploadRes.data);

    return {
      secure_url: uploadRes.data.secure_url,
      public_id: uploadRes.data.public_id,
    };
  } catch (err) {
    console.error("UPLOAD FAILED:", err);
    return null;
  }
};
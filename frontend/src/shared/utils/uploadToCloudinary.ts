import API from "axios";

type UploadResponse = {
  secure_url: string;
  public_id: string;
};

export const uploadToCloudinary = async (
  file: File
): Promise<UploadResponse> => {
  
  // 1. get signature from backend
  const signatureRes = await API.get("uploads/signature");

  const {
    timestamp,
    signature,
    cloudName,
    apiKey,
    folder,
  } = signatureRes.data;

  // 2. create form data for Cloudinary
  const formData = new FormData();

  formData.append("file", file);
  formData.append("api_key", apiKey);
  formData.append("timestamp", timestamp);
  formData.append("signature", signature);
  formData.append("folder", folder);

  // 3. upload directly to cloudinary
  const uploadRes = await axios.post(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    formData
  );

  return {
    secure_url: uploadRes.data.secure_url,
    public_id: uploadRes.data.public_id,
  };
};
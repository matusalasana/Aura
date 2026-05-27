import { ChangeEvent, useEffect, useRef, useState } from "react";
import { ImageUp, Loader2 } from "lucide-react";

import ImagesBox from "./ImagesBox";
import { useAddProduct } from "../hooks/useAddProduct";
import { uploadToCloudinary } from "../../../../shared/utils/uploadToCloudinary";

import {
  useBasicInfoStore,
  type BasicInfoInput,
} from "../store/productBasicInfoStore";

import {
  useVariantsStore,
  type VariantsInput,
} from "../store/productVariantsStore";

const ProductImagesUploader = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [previews, setPreviews] = useState<string[]>([]);

  const inputRef = useRef<HTMLInputElement | null>(null);

  const basicInfo = useBasicInfoStore((state) => state.basicInfo);
  const variants = useVariantsStore((state) => state.variants);

  const { mutate: addProduct, isPending } = useAddProduct();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);

    if (selectedFiles.length === 0) return;

    setFiles((prev) => [...prev, ...selectedFiles]);

    const previewUrls = selectedFiles.map((file) =>
      URL.createObjectURL(file)
    );

    setPreviews((prev) => [...prev, ...previewUrls]);
  };

  useEffect(() => {
    return () => {
      previews.forEach((preview) => {
        URL.revokeObjectURL(preview);
      });
    };
  }, [previews]);

  const handleSubmit = async () => {
    try {
      setLoading(true);  
      
      // 1. Map files to an array of upload promises
      const uploadPromises = files.map((file) => uploadToCloudinary(file));  
  
      // 2. Wait for ALL promises to completely finish resolving
      const uploadedImages = await Promise.all(uploadPromises);  
  
      // 3. Extract URLs safely, filtering out any failed uploads (null values)
      const images = uploadedImages
        .filter((img) => img !== null) // Prevents crashes if an upload failed
        .map((img) => img!.secure_url);  
  
      // 4. build payload  
      const payload = {  
        ...basicInfo,  
        variants,  
        images, 
      };  
  
      // 5. send to backend  
      await addProduct(payload);  
  
    } catch (err) {  
      console.error("Submission failed:", err);  
    } finally {  
      setLoading(false);  
    }
  };


  return (
    <div
      className="
        w-full max-w-2xl mx-auto
        rounded-2xl
        border border-zinc-200 dark:border-zinc-800
        bg-white dark:bg-zinc-950
        p-6
        shadow-sm
      "
    >
      <div className="mb-6 space-y-1">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
          Product Images
        </h2>

        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Upload clear product images for your listing.
        </p>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleChange}
        className="hidden"
      />

      <ImagesBox
        isPending={isPending}
        loading={loading}
        previews={previews}
        onOpenUpload={() => inputRef.current?.click()}
      />

      <div className="mt-6 flex items-center gap-3">
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={loading || isPending}
          className="
            inline-flex items-center gap-2
            rounded-xl
            bg-zinc-100 dark:bg-zinc-800
            hover:bg-zinc-200 dark:hover:bg-zinc-700
            px-4 py-2.5
            text-sm font-medium
            text-zinc-800 dark:text-zinc-100
            transition-colors
            disabled:opacity-50
          "
        >
          <ImageUp size={18} />
          Select Images
        </button>

        <button
          type="button"
          onClick={handleSubmit}
          disabled={loading || isPending  || files.length === 0}
          className="
            inline-flex items-center gap-2
            rounded-xl
            bg-indigo-600 hover:bg-indigo-500
            px-5 py-2.5
            text-sm font-medium text-white
            transition-colors
            disabled:opacity-50
          "
        >
          {(loading || isPending ) && (
            <Loader2 size={18} className="animate-spin" />
          )}

          {
            loading || isPending 
              ? "Submitting..." 
              : "Publish Product"
          }
        </button>
      </div>
    </div>
  );
};

export default ProductImagesUploader;
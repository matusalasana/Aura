// ProductImagesUploader.tsx

import { ChangeEvent, useEffect, useRef, useState } from "react";
import { ImageUp, Loader2 } from "lucide-react";
import ImagesBox from "./ImagesBox";
import { useAddProduct } from "../hooks/useAddProduct";

const ProductImagesUploader = () => {
  const [finalData, setFinalData] = useState();
  
  const [loading, setLoading] = useState(false);

  // actual files
  const [files, setFiles] = useState<File[]>([]);
  
  // preview URLs
  const [previews, setPreviews] = useState<string[]>([]);

  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);

    if (selectedFiles.length === 0) return;

    // store files
    setFiles((prev) => [...prev, ...selectedFiles]);

    // generate preview URLs
    const previewUrls = selectedFiles.map((file) =>
      URL.createObjectURL(file)
    );

    // store previews
    setPreviews((prev) => [...prev, ...previewUrls]);
  };

  // cleanup preview URLs
  useEffect(() => {
    return () => {
      previews.forEach((preview) => URL.revokeObjectURL(preview));
    };
  }, [previews]);
  
  const { mutate: addProduct, isLoading } = useAddProducts();

  const handleSubmit = async () => {
    try {
      setLoading(true);

      // upload logic here
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="
        w-full max-w-2xl
        mx-auto
        rounded-2xl
        border border-zinc-200 dark:border-zinc-800
        bg-white dark:bg-zinc-950
        p-6
        shadow-sm
      "
    >
      <div className="space-y-1 mb-6">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
          Product Images
        </h2>

        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Upload clear product images for your listing.
        </p>
      </div>

      {/* hidden input */}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleChange}
        className="hidden"
      />

      {/* upload area */}
      <ImagesBox
        previews={previews}
        onOpenUpload={() => inputRef.current?.click()}
      />

      {/* actions */}
      <div className="flex items-center gap-3 mt-6">
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={loading}
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
          disabled={loading || files.length === 0}
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
          {loading && <Loader2 size={18} className="animate-spin" />}

          {loading ? "Submitting..." : "Publish Product"}
        </button>
      </div>
    </div>
  );
};

export default ProductImagesUploader;
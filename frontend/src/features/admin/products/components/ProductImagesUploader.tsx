import { ChangeEvent, useEffect, useRef, useState } from "react";
import { ImageUp, Loader2 } from "lucide-react";

import ImagesBox from "./ImagesBox";
import { useAddProduct } from "../hooks/useAddProduct";

import {
  useBasicInfoStore,
  type BasicInfoInput,
} from "../store/productBasicInfoStore";

import {
  useVariantsStore,
  type VariantsInput,
} from "../store/productVariantsStore";

type FinalFormData = {
  basicInfo: BasicInfoInput;
  variants: VariantsInput;
  files: File[];
};

const ProductImagesUploader = () => {
  const [files, setFiles] = useState<File[]>([]);
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

  const handleSubmit = () => {
    const formData = new FormData();
   
    // images
    files.forEach((file) => {
      formData.append("images", file);
    });
  
    // basic info
    formData.append(
      "category_id",
      basicInfo.category_id
    );
  
    formData.append(
      "name",
      basicInfo.name
    );
  
    formData.append(
      "description",
      basicInfo.description
    );
  
    formData.append(
      "is_featured",
      String(basicInfo.is_featured)
    );
  
    formData.append(
      "is_bestseller",
      String(basicInfo.is_bestseller)
    );
  
    // arrays/objects MUST be stringified
    formData.append(
      "variants",
      JSON.stringify(variants)
    );
  
    addProduct(formData);
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
        previews={previews}
        onOpenUpload={() => inputRef.current?.click()}
      />

      <div className="mt-6 flex items-center gap-3">
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={isPending}
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
          disabled={isPending || files.length === 0}
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
          {isPending && (
            <Loader2 size={18} className="animate-spin" />
          )}

          {isPending ? "Submitting..." : "Publish Product"}
        </button>
      </div>
    </div>
  );
};

export default ProductImagesUploader;
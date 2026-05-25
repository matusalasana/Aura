import { ImageUp } from "lucide-react";
import { useState, useRef } from "react";

const ProductImagesUploader = () => {
  const [loading, setLoading] = useState(false);

  // store actual files
  const [files, setFiles] = useState<File[] | null>([]);

  // store preview URLs
  const [previews, setPreviews] = useState<string[]>([]);

  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const selectedFiles = Array.from(e.target.files || []);

    if (selectedFiles.length === 0) return;

    // store files
    setFiles((prev) => [...prev, ...selectedFiles]);

    // create preview URLs
    const previewUrls = selectedFiles.map((file) =>
      URL.createObjectURL(file)
    );

    // store previews
    setPreviews((prev) => [...prev, ...previewUrls]);
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>

      {/* previews */}
      <div className="flex gap-3 mt-4 flex-wrap">
        {previews.map((preview, index) => (
          <img
            key={index}
            src={preview}
            alt="preview"
            className="w-24 h-24 object-cover rounded-lg border"
          />
        ))}
      </div>

      {/* hidden input */}
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleChange}
        ref={inputRef}
        className="hidden"
      />

      {/* select images button */}
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={loading}
        className="flex gap-3 items-center justify-center bg-indigo-100 dark:text-white px-4 py-2 rounded-lg shadow-lg"
      >
        <p>Select Images</p>
        <ImageUp size={16} className="text-indigo-600" />
      </button>

      {/* submit button */}
      <button
        type="button"
        onClick={handleSubmit}
        disabled={loading}
        className="flex gap-3 items-center justify-center dark:text-white px-4 py-2 rounded-lg shadow-lg mt-4"
      >
        <p>{loading ? "Submitting..." : "Submit"}</p>
      </button>

    </div>
  );
};

export default ProductImagesUploader;
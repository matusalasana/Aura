import { useRef, useState } from "react";
import { ImagePlus, X } from "lucide-react";

interface Props {
  onChange: (files: File[]) => void;
}

const ProductMedia = ({ onChange }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<File[]>([]);

  const handleFiles = (newFiles: FileList | null) => {
    if (!newFiles) return;

    const selectedFiles = Array.from(newFiles);

    const updatedFiles = [...files, ...selectedFiles].slice(0, 10);

    setFiles(updatedFiles);
    onChange(updatedFiles);
  };

  const removeFile = (index: number) => {
    const updatedFiles = files.filter((_, i) => i !== index);

    setFiles(updatedFiles);
    onChange(updatedFiles);
  };

  return (
    <div>
      <label className="label">Product Images</label>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {files.map((file, index) => (
          <div
            key={`${file.name}-${index}`}
            className="relative aspect-square overflow-hidden rounded-lg border"
          >
            <img
              src={URL.createObjectURL(file)}
              alt={file.name}
              className="h-full w-full object-cover"
            />

            <button
              type="button"
              onClick={() => removeFile(index)}
              className="absolute right-1 top-1 rounded-full bg-black/70 p-1 text-white"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}

        {files.length < 10 && (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="flex aspect-square flex-col items-center justify-center rounded-lg border border-dashed text-muted-foreground transition hover:bg-muted"
          >
            <ImagePlus className="h-6 w-6" />

            <span className="mt-2 text-xs">
              Add images
            </span>
          </button>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        hidden
        onChange={(e) => {
          handleFiles(e.target.files);
          e.target.value = "";
        }}
      />

      <p className="mt-2 text-xs text-muted-foreground">
        Add up to 10 images. Maximum 5MB per image.
      </p>
    </div>
  );
};

export default ProductMedia;
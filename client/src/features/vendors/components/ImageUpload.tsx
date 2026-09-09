import { Upload, X, Image as ImageIcon } from "lucide-react";

interface Props {
  title: string;
  preview: string | null;
  onChange: (file: File) => void;
  onRemove?: () => void; // Optional: Added to clear the image
}

const ImageUpload = ({ title, preview, onChange, onRemove }: Props) => {
  return (
    <div className="w-full">
      <p className="mb-2 text-sm font-semibold text-zinc-700 dark:text-zinc-300">
        {title}
      </p>

      <label className="group relative block cursor-pointer overflow-hidden rounded-2xl border-2 border-dashed border-zinc-300 bg-zinc-50 transition-all hover:border-amber-500 hover:bg-amber-50/50 dark:border-zinc-700 dark:bg-zinc-900 dark:hover:border-amber-500 dark:hover:bg-zinc-800">
        {preview ? (
          <div className="relative h-48 w-full">
            <img src={preview} className="h-full w-full object-cover" alt="Preview" />
            {/* Hover overlay to change image */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
              <span className="text-white font-medium flex items-center gap-2">
                <Upload size={18} /> Click to change
              </span>
            </div>
          </div>
        ) : (
          <div className="flex h-48 flex-col items-center justify-center text-zinc-400 transition-colors group-hover:text-amber-500">
            <Upload size={32} className="mb-2" />
            <span className="text-sm font-medium">Click to upload</span>
          </div>
        )}

        <input
          type="file"
          className="hidden"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) onChange(file);
          }}
        />
      </label>

      {/* Optional helper text */}
      <p className="mt-2 text-xs text-zinc-400">
        Supported: JPG, PNG, WEBP (Max 5MB)
      </p>
    </div>
  );
};

export default ImageUpload;

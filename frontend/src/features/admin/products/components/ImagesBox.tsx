
import { ImageUp } from "lucide-react";

interface Props {
  previews: string[];
  onOpenUpload: () => void;
}

const ImagesBox = ({ previews, onOpenUpload }: Props) => {
  return (
    <div className="w-full">
      {/* upload box */}
      <button
        type="button"
        onClick={onOpenUpload}
        className="
          w-full
          border-2 border-dashed
          border-zinc-300 dark:border-zinc-700
          bg-zinc-50 dark:bg-zinc-900/50
          hover:bg-zinc-100 dark:hover:bg-zinc-800/60
          transition-colors
          rounded-2xl
          p-8
          flex flex-col items-center justify-center
          gap-4
        "
      >
        <div
          className="
            p-4 rounded-full
            bg-indigo-100 dark:bg-indigo-500/10
          "
        >
          <ImageUp
            size={28}
            className="text-indigo-600 dark:text-indigo-400"
          />
        </div>

        <div className="text-center space-y-1">
          <p className="text-sm font-medium text-zinc-800 dark:text-zinc-100">
            Upload Product Images
          </p>

          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            JPG, PNG, JPEG, WEBP • Max 20MB
          </p>
        </div>
      </button>

      {/* previews */}
      {previews.length > 0 && (
        <div className="flex flex-wrap gap-4 mt-5">
          {previews.map((preview, index) => (
            <div
              key={index}
              className="
                relative overflow-hidden
                rounded-xl border
                border-zinc-200 dark:border-zinc-700
                bg-zinc-100 dark:bg-zinc-800
              "
            >
              <img
                src={preview}
                alt={`preview-${index}`}
                className="w-24 h-24 object-cover"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImagesBox;
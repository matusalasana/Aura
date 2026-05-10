import { Loader2 } from "lucide-react";

interface Props {
  title?: string;
  onAction?: () => void;
  onCancel?: () => void;
  isProcessing?: boolean;
  warning?: string;
}

const ActionConfirmationCard = ({
  isProcessing,
  onAction,
  onCancel,
  title,
  warning
}: Props) => {
  return (
    <div className="modal modal-open">
      <div className="modal-box">

        {/* Title */}
        <h3 className="font-bold text-lg">
          Confirm Deletion
        </h3>

        {/* Message */}
        <p className="py-3 text-sm text-base-content/80">
          Are you sure you want to remove{" "}
          <span className="font-medium text-error">
            {title || ""}
          </span>
          {warning}
        </p>

        {/* Actions */}
        <div className="modal-action">
          <button
            onClick={onCancel}
            disabled={isProcessing}
            className="btn btn-ghost"
          >
            Cancel
          </button>

          <button
            onClick={() => {
              if (!isProcessing) onAction?.();
            }}
            disabled={isProcessing}
            className="btn btn-error min-w-[90px] flex items-center justify-center gap-2"
          >
            {isProcessing ? (
              <Loader2 className="animate-spin w-4 h-4" />
            ) : (
              "Delete"
            )}
          </button>
        </div>
      </div>

      <div className="modal-backdrop" onClick={onCancel} />
    </div>
  );
};

export default ActionConfirmationCard;
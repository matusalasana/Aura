import { ShoppingCart } from "lucide-react";

import { Button } from "@/components/ui/button";

interface AddToCartButtonProps {
  disabled?: boolean;
  onClick: () => void;
}

const AddToCartButton = ({
  disabled = false,
  onClick,
}: AddToCartButtonProps) => {
  return (
    <Button
      type="button"
      size="lg"
      className="w-full gap-2 font-medium transition-transform active:scale-[0.98]"
      disabled={disabled}
      onClick={onClick}
    >
      <ShoppingCart className="size-4 shrink-0" />
      {disabled ? "Unavailable" : "Add to Cart"}
    </Button>
  );
};

export default AddToCartButton;
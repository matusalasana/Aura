import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";

type AddToCartButtonProps = {
  disabled?: boolean;
  onClick: () => void;
};

const AddToCartButton = ({
  disabled = false,
  onClick,
}: AddToCartButtonProps) => {
  return (
    <Button
      type="button"
      className="w-full"
      size="lg"
      disabled={disabled}
      onClick={onClick}
    >
      <ShoppingCart />
      Add to Cart
    </Button>
  );
};

export default AddToCartButton;
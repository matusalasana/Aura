import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

type QuantitySelectorProps = {
  quantity: number;
  max: number;
  onChange: (quantity: number) => void;
};

const QuantitySelector = ({
  quantity,
  max,
  onChange,
}: QuantitySelectorProps) => {
  const decrease = () => {
    if (quantity > 1) {
      onChange(quantity - 1);
    }
  };

  const increase = () => {
    if (quantity < max) {
      onChange(quantity + 1);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Button
        type="button"
        variant="outline"
        size="icon"
        onClick={decrease}
        disabled={quantity <= 1}
      >
        <Minus />
      </Button>

      <span className="flex h-9 w-10 items-center justify-center rounded-md border text-sm font-medium">
        {quantity}
      </span>

      <Button
        type="button"
        variant="outline"
        size="icon"
        onClick={increase}
        disabled={quantity >= max}
      >
        <Plus />
      </Button>
    </div>
  );
};

export default QuantitySelector;
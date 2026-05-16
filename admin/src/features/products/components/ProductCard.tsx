
import { Trash2, Plus, Minus } from "lucide-react";

type CartItemProps = {
  id: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  stock: number;

  onIncrease: (id: string | number) => void;
  onDecrease: (id: string | number) => void;
  onRemove: (id: string | number) => void;
};

const ProductCard= ({
  id,
  name,
  image,
  price,
  quantity,
  stock,
  onIncrease,
  onDecrease,
  onRemove,
}: CartItemProps) => {
  return (
    <div className="
      flex gap-4 rounded-2xl border border-gray-200 bg-white p-4
      shadow-sm transition hover:shadow-md
      dark:border-gray-800 dark:bg-gray-900
    ">
      {/* Image */}
      <img
        src={image}
        alt={name}
        className="h-20 w-20 rounded-xl object-cover bg-gray-100 dark:bg-gray-800"
      />

      {/* Content */}
      <div className="flex flex-1 flex-col justify-between">
        
        {/* Top row */}
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white line-clamp-1">
              {name}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {Number(price).toFixed(2).toLocaleString()} ETB
            </p>
          </div>

          <button
            onClick={() => onRemove(id)}
            className="text-gray-400 hover:text-red-500 transition"
          >
            <Trash2 size={18} />
          </button>
        </div>

        {/* Bottom row */}
        <div className="flex items-center justify-between mt-3">
          
          {/* Quantity controls */}
          <div className="
            flex items-center gap-2 rounded-xl
            border border-gray-200 px-2 py-1
            dark:border-gray-700
          ">
            <button
              onClick={() => onDecrease(id)}
              className="text-gray-600 hover:text-black dark:text-gray-300 dark:hover:text-white"
            >
              <Minus size={16} />
            </button>

            <span className="text-sm font-medium text-gray-900 dark:text-white w-6 text-center">
              {quantity}
            </span>

            <button
              onClick={() => onIncrease(id)}
              disabled={quantity >= stock}
              className="text-gray-600 hover:text-black disabled:opacity-30 dark:text-gray-300 dark:hover:text-white"
            >
              <Plus size={16} />
            </button>
          </div>

          {/* Stock hint */}
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {stock} available
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
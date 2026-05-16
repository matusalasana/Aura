import { useAddToCart } from "../../cart/hooks/useAddToCart";

interface Product {
  id: string;
  name?: string;
}

interface AddToCartBtnProps {
  product: Product;
  quantity?: number;
}

const AddToCartBtn = ({ product, quantity = 1 }: AddToCartBtnProps) => {
  const { mutate: addToCart, isPending } = useAddToCart();

  const handleAddToCart = () => {
    addToCart({
      productId: product.id,
      quantity: quantity
    });
  };
  
  return (
    <button
      onClick={handleAddToCart}
      disabled={isPending}
      className={`w-full py-4 text-sm font-medium tracking-wide uppercase transition-all duration-200 rounded-lg select-none ${
        isPending
          ? "bg-neutral-200 text-neutral-400 cursor-not-allowed"
          : "bg-neutral-950 text-white hover:bg-neutral-900 active:scale-[0.99]"
      }`}
      aria-live="polite"
    >
      {isPending ? (
        <span className="flex items-center justify-center gap-2 tracking-widest">
          Adding
          <span className="animate-pulse">...</span>
        </span>
      ) : (
        "Add to Cart"
      )}
    </button>
  );
};

export default AddToCartBtn;

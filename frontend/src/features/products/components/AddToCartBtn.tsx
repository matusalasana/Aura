import { useAddToCart } from "../../cart/hooks/useAddToCart";

const AddToCartBtn = () => {
  const { mutate: addToCart, isPending } = useAddToCart();
  const handleAddToCart = () => {
    addToCart({
      productId: product.id,
      quantity: 1
    });
  };
  
  return (
    <button
      onClick={handleAddToCart}
      disabled={isPending}
      className="w-full bg-black text-white py-3"
    >
      {isPending ? "Adding..." : "Add to Cart"}
    </button>
  )
}

export default AddToCartBtn
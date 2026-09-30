import { Link } from "react-router-dom";
import { Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useCartStore } from "@/features/cart/store/cartStore";
import QuantitySelector from "@/features/products/components/QuantitySelector";

const CartPage = () => {
  const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);
  const updateQuantity = useCartStore(
    (state) => state.updateQuantity
  );
  const subtotal = items.reduce(
    (total, item) =>
      total + Number(item.price) * item.quantity,
    0
  );
  
  if (items.length === 0) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-7xl flex-col items-center justify-center p-6 text-center">
        <h1 className="text-2xl font-bold">Your cart is empty</h1>

        <p className="mt-2 text-muted-foreground">
          Add some products to your cart to get started.
        </p>

        <Button asChild className="mt-6">
          <Link to="/">Continue Shopping</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl p-6">
      <h1 className="text-3xl font-bold">Shopping Cart</h1>

      <div className="mt-8 space-y-4">
        {items.map((item) => (
          <div
            key={item.productId}
            className="flex items-center justify-between gap-4 rounded-xl border p-4"
          >
            <div>
              <h2 className="font-semibold">{item.name}</h2>
          
              <p className="text-sm text-muted-foreground">
                ${item.price} × {item.quantity}
              </p>
            </div>
          
            <div className="flex items-center gap-4">
              <QuantitySelector
                quantity={item.quantity}
                max={99}
                onChange={(quantity) =>
                  updateQuantity(item.productId, quantity)
                }
              />
          
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeItem(item.productId)}
              >
                <Trash2 />
              </Button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 flex justify-end">
  <div className="w-full max-w-sm rounded-xl border p-6">
    <div className="flex items-center justify-between">
      <span className="text-muted-foreground">Subtotal</span>

      <span className="text-xl font-bold">
        ${subtotal.toFixed(2)}
      </span>
    </div>

    <Button asChild className="mt-6 w-full" size="lg">
      <Link to="/checkout" className="w-full">
        Checkout
      </Link>
    </Button>
  </div>
</div>
    </div>
  );
};

export default CartPage;
import { useCartStore } from "@/features/cart/store/cartStore";

const CheckoutPage = () => {
  const items = useCartStore((state) => state.items);

  const subtotal = items.reduce(
    (total, item) =>
      total + Number(item.price) * item.quantity,
    0
  );

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-7xl p-6">
        <h1 className="text-3xl font-bold">Your cart is empty</h1>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl p-6">
      <h1 className="text-3xl font-bold">Checkout</h1>

      <div className="mt-8 max-w-2xl rounded-xl border p-6">
        <h2 className="text-xl font-semibold">
          Order Summary
        </h2>

        <div className="mt-6 space-y-4">
          {items.map((item) => (
            <div
              key={item.productId}
              className="flex items-center justify-between"
            >
              <div>
                <p className="font-medium">{item.name}</p>

                <p className="text-sm text-muted-foreground">
                  ${item.price} × {item.quantity}
                </p>
              </div>

              <p className="font-medium">
                ${(Number(item.price) * item.quantity).toFixed(2)}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-6 border-t pt-4">
          <div className="flex items-center justify-between">
            <span className="font-medium">Subtotal</span>

            <span className="text-xl font-bold">
              ${subtotal.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
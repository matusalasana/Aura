import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, ShoppingBag, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useCartStore } from "@/features/cart/store/cartStore";
import QuantitySelector from "@/features/products/components/QuantitySelector";

const formatPrice = (price: number | string) =>
  `$${Number(price).toFixed(2)}`;

const CartPage = () => {
  const navigate = useNavigate();

  const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);

  const subtotal = items.reduce(
    (total, item) => total + Number(item.price) * item.quantity,
    0,
  );

  const totalItems = items.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  if (items.length === 0) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-background px-4 py-12 text-foreground">
        <div className="flex w-full max-w-md flex-col items-center text-center">
          <div className="flex size-20 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <ShoppingBag className="size-9" />
          </div>

          <h1 className="mt-6 text-2xl font-bold tracking-tight">
            Your cart is empty
          </h1>

          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Looks like you haven't added anything yet. Explore our products
            and find something you love.
          </p>

          <Button
            className="mt-6 w-full rounded-xl sm:w-auto"
            onClick={() => navigate("/products")}
          >
            Explore products
            <ArrowRight className="size-4" />
          </Button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <button
          type="button"
          onClick={() => navigate("/products")}
          className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Continue shopping
        </button>

        <div className="mb-8 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Shopping cart
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Review your items before checking out.
            </p>
          </div>

          <span className="rounded-full bg-muted px-3 py-1.5 text-sm font-medium text-muted-foreground">
            {totalItems} {totalItems === 1 ? "item" : "items"}
          </span>
        </div>

        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[1fr_360px]">
          <section aria-label="Cart items" className="min-w-0 space-y-4">
            {items.map((item) => (
              <Card key={item.productId} className="overflow-hidden rounded-2xl">
                <CardContent className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
                  <div className="min-w-0 flex-1">
                    <h2 className="break-words font-semibold leading-6">
                      {item.name}
                    </h2>

                    <p className="mt-1 text-sm text-muted-foreground">
                      {formatPrice(item.price)} per item
                    </p>

                    <p className="mt-2 text-sm font-medium">
                      Line total:{" "}
                      {formatPrice(Number(item.price) * item.quantity)}
                    </p>
                  </div>

                  <div className="flex items-center justify-between gap-4 sm:justify-end">
                    <QuantitySelector
                      quantity={item.quantity}
                      max={99}
                      onChange={(quantity) =>
                        updateQuantity(item.productId, quantity)
                      }
                    />

                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      aria-label={`Remove ${item.name} from cart`}
                      title="Remove item"
                      onClick={() => removeItem(item.productId)}
                      className="shrink-0 rounded-xl text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                    >
                      <Trash2 className="size-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </section>

          <aside className="lg:sticky lg:top-6">
            <Card className="rounded-2xl">
              <CardHeader>
                <CardTitle className="text-lg">Order summary</CardTitle>
              </CardHeader>

              <CardContent className="space-y-5">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">
                    Subtotal ({totalItems} items)
                  </span>
                  <span className="font-medium tabular-nums">
                    {formatPrice(subtotal)}
                  </span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="text-muted-foreground">
                    Calculated at checkout
                  </span>
                </div>

                <Separator />

                <div className="flex items-center justify-between gap-4">
                  <span className="font-semibold">Subtotal</span>
                  <span className="text-xl font-bold tabular-nums">
                    {formatPrice(subtotal)}
                  </span>
                </div>

                <p className="text-xs leading-5 text-muted-foreground">
                  Shipping fees and any applicable taxes will be confirmed
                  during checkout.
                </p>

                <Button
                  className="w-full rounded-xl"
                  onClick={() => navigate("/checkout")}
                >
                  Proceed to checkout
                  <ArrowRight className="size-4" />
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  className="w-full rounded-xl"
                  onClick={() => navigate("/products")}
                >
                  Continue shopping
                </Button>
              </CardContent>
            </Card>
          </aside>
        </div>
      </div>
    </main>
  );
};

export default CartPage;
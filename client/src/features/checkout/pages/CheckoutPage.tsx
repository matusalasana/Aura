import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, CheckCircle2, ShoppingBag } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import { useCartStore } from "@/features/cart/store/cartStore";
import ShippingInformationForm from "@/features/checkout/components/ShippingInformationForm";
import { useCreateOrder } from "@/features/orders/hooks/useCreateOrder";
import { type CheckoutFormData } from "@/features/checkout/schemas";

const formatPrice = (price: number | string) =>
  `$${Number(price).toFixed(2)}`;

const CheckoutPage = () => {
  const { mutate: createOrder, isPending } = useCreateOrder();

  const items = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);
  const navigate = useNavigate();

  const subtotal = items.reduce(
    (total, item) => total + Number(item.price) * item.quantity,
    0,
  );

  const totalItems = items.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  const handleSubmit = (data: CheckoutFormData) => {
    const orderPayload = {
      shipping: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        address: data.address,
        city: data.city,
        subcity: data.subcity,
        notes: data.notes,
      },
      items: items.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
      })),
    };

    createOrder(orderPayload, {
      onSuccess: () => {
        clearCart();
        navigate("/orders");
      },
    });
  };

  if (items.length === 0) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-background px-4 py-12 text-foreground">
        <div className="flex w-full max-w-md flex-col items-center text-center">
          <div className="flex size-20 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <ShoppingBag className="size-9" />
          </div>

          <h1 className="mt-6 text-2xl font-bold tracking-tight">
            Nothing to check out
          </h1>

          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Your cart is empty. Add some products before placing an order.
          </p>

          <Button
            className="mt-6 w-full rounded-xl sm:w-auto"
            onClick={() => navigate("/products")}
          >
            Browse products
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
          onClick={() => navigate("/cart")}
          className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Back to cart
        </button>

        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Checkout
          </h1>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Confirm your items and provide your delivery information.
          </p>
        </div>

        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
          <section className="min-w-0 lg:sticky lg:top-6">
            <Card className="overflow-hidden rounded-2xl">
              <CardHeader>
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <CardTitle className="text-xl">Order summary</CardTitle>
                    <CardDescription className="mt-1">
                      {totalItems} {totalItems === 1 ? "item" : "items"} in your order
                    </CardDescription>
                  </div>

                  <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <ShoppingBag className="size-5" />
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-5">
                <div className="space-y-4">
                  {items.map((item) => (
                    <div
                      key={item.productId}
                      className="flex items-start justify-between gap-4"
                    >
                      <div className="min-w-0">
                        <p className="break-words font-medium leading-6">
                          {item.name}
                        </p>

                        <p className="mt-1 text-sm text-muted-foreground">
                          {formatPrice(item.price)} × {item.quantity}
                        </p>
                      </div>

                      <p className="shrink-0 font-semibold tabular-nums">
                        {formatPrice(Number(item.price) * item.quantity)}
                      </p>
                    </div>
                  ))}
                </div>

                <Separator />

                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-4 text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium tabular-nums">
                      {formatPrice(subtotal)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-4 text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="text-right text-muted-foreground">
                      Confirmed separately
                    </span>
                  </div>
                </div>

                <Separator />

                <div className="flex items-center justify-between gap-4">
                  <span className="font-semibold">Order subtotal</span>
                  <span className="text-2xl font-bold tracking-tight tabular-nums">
                    {formatPrice(subtotal)}
                  </span>
                </div>

                <div className="flex items-start gap-2 rounded-xl bg-muted/50 p-3 text-sm text-muted-foreground">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
                  <p>
                    Review your delivery details carefully before placing your
                    order.
                  </p>
                </div>

                <Button
                  type="button"
                  variant="outline"
                  className="w-full rounded-xl"
                  onClick={() => navigate("/cart")}
                >
                  <ArrowLeft className="size-4" />
                  Edit cart
                </Button>
              </CardContent>
            </Card>
          </section>

          <section className="min-w-0" aria-label="Shipping information">
            <ShippingInformationForm
              onSubmit={handleSubmit}
              isPending={isPending}
            />
          </section>
        </div>
      </div>
    </main>
  );
};

export default CheckoutPage;
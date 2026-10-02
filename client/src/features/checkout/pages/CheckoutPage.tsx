import { useCartStore } from "@/features/cart/store/cartStore";
import ShippingInformationForm from "@/features/checkout/components/ShippingInformationForm";
import { useCurrentUser } from "@/features/auth/hooks/useCurrentUser";
import { useCreateOrder } from "@/features/orders/hooks/useCreateOrder";
import { type CheckoutFormData } from "@/features/checkout/schemas";


const CheckoutPage = () => {
  const { mutate: createOrder, isPending } = useCreateOrder();
  
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
    createOrder(orderPayload)
  }

  return (
    <div className="mt-8 grid gap-8 lg:grid-cols-2">
    
      <div className="rounded-xl border p-6">
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

      <ShippingInformationForm
        onSubmit={handleSubmit}
        isPending={isPending}
      />
      
    </div>
  );
};

export default CheckoutPage;
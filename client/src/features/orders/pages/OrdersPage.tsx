import { Link } from "react-router-dom";
import { useOrders } from "@/features/orders/hooks/useOrders";

const OrdersPage = () => {
  const { data: orders = [], isLoading } = useOrders();

  if (isLoading) {
    return (
      <div className="mx-auto max-w-5xl p-6">
        <p className="text-muted-foreground">Loading orders...</p>
      </div>
    );
  }

  if (!orders.length) {
    return (
      <div className="mx-auto max-w-5xl p-6">
        <div className="rounded-xl border p-10 text-center">
          <h1 className="text-xl font-semibold">My orders</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            You haven't placed any orders yet.
          </p>

          <Link
            to="/"
            className="mt-6 inline-block rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground"
          >
            Start shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">My orders</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          View your order history and details.
        </p>
      </div>

      <div className="space-y-4">
        {orders.map((order) => (
          <Link
            key={order.id}
            to={`/orders/${order.id}`}
            className="block rounded-xl border p-5 transition hover:bg-muted/50"
          >
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="font-medium">
                  Order #{order.orderNumber}
                </p>

                <p className="mt-1 text-sm text-muted-foreground">
                  {new Date(order.date).toLocaleDateString()}
                </p>
              </div>

              <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium capitalize">
                {order.status}
              </span>
            </div>

            <div className="mt-4 flex items-center justify-between border-t pt-4">
              <p className="text-sm text-muted-foreground">
                {order.items?.length ?? 0}{" "}
                {(order.items?.length ?? 0) === 1 ? "item" : "items"}
              </p>

              <p className="font-semibold">
                {Number(order.amount).toFixed(2)}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default OrdersPage;
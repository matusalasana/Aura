import { Link, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  ClipboardList,
  Package,
  ShoppingBag,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

import { useOrders } from "@/features/orders/hooks/useOrders";
import type { Order } from "@/types/order";

const formatPrice = (amount: number | string) =>
  Number(amount).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

const formatDate = (date?: string | Date | null) => {
  if (!date) return "Date unavailable";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) return "Date unavailable";

  return parsedDate.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const getStatusStyle = (status: string) => {
  switch (status.toLowerCase()) {
    case "delivered":
      return "bg-primary/10 text-primary";
    case "pending":
      return "bg-muted text-muted-foreground";
    case "processing":
      return "bg-blue-500/10 text-blue-600 dark:text-blue-400";
    case "shipped":
      return "bg-violet-500/10 text-violet-600 dark:text-violet-400";
    case "cancelled":
    case "canceled":
    case "failed":
      return "bg-destructive/10 text-destructive";
    default:
      return "bg-muted text-muted-foreground";
  }
};

const OrdersPage = () => {
  const { data: orders = [], isLoading, isError } = useOrders();

  const navigate = useNavigate();

  if (isLoading) {
    return (
      <main className="min-h-screen bg-background text-foreground">
        <div className="mx-auto max-w-5xl space-y-6 px-4 py-8 sm:px-6 sm:py-12">
          <div className="space-y-2">
            <Skeleton className="h-9 w-40" />
            <Skeleton className="h-4 w-64 max-w-full" />
          </div>

          {Array.from({ length: 3 }).map((_, index) => (
            <Card key={index} className="rounded-2xl">
              <CardContent className="space-y-5 p-5">
                <div className="flex justify-between gap-4">
                  <div className="space-y-2">
                    <Skeleton className="h-5 w-36" />
                    <Skeleton className="h-4 w-28" />
                  </div>
                  <Skeleton className="h-6 w-24 rounded-full" />
                </div>
                <Skeleton className="h-px w-full" />
                <Skeleton className="h-5 w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    );
  }

  if (isError) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center bg-background px-4 py-12 text-foreground">
        <div className="max-w-md text-center">
          <div className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-destructive/10 text-destructive">
            <ClipboardList className="size-7" />
          </div>

          <h1 className="mt-5 text-xl font-semibold">
            Couldn't load your orders
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Something went wrong while retrieving your order history. Please
            try again.
          </p>
          <Button
            className="mt-5 rounded-xl"
            variant="outline"
            onClick={() => window.location.reload()}
          >
            Try again
          </Button>
        </div>
      </main>
    );
  }

  if (!orders.length) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-background px-4 py-12 text-foreground">
        <div className="flex w-full max-w-md flex-col items-center text-center">
          <div className="flex size-20 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <ShoppingBag className="size-9" />
          </div>

          <h1 className="mt-6 text-2xl font-bold tracking-tight">
            No orders yet
          </h1>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Your orders will appear here once you make your first purchase.
            Take a look around and find something you like.
          </p>

          <Button onClick={() => navigate("/")} className="mt-6 rounded-xl">
            Start shopping
            <ArrowRight className="size-4" />
          </Button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-12">
        <div className="mb-8 flex items-center gap-4">
          <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Package className="size-6" />
          </div>

          <div>
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
              My orders
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Track your purchases and view order details.
            </p>
          </div>
        </div>

        <div className="mb-5 flex items-center justify-between gap-3">
          <p className="text-sm text-muted-foreground">
            {orders.length} {orders.length === 1 ? "order" : "orders"}
          </p>
        </div>

        <div className="space-y-4">
          {orders.map((order: Order) => {
            const itemCount = order.items?.length ?? 0;

            return (
              <Link
                key={order.id}
                to={`/orders/${order.id}`}
                className="group block rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <Card className="rounded-2xl transition-colors group-hover:bg-muted/30">
                  <CardHeader className="flex flex-row flex-wrap items-start justify-between gap-4 space-y-0 p-5 sm:p-6">
                    <div className="min-w-0">
                      <CardTitle className="break-words text-base font-semibold">
                        Order #{order.orderNumber}
                      </CardTitle>
                      <p className="mt-2 text-sm text-muted-foreground">
                        Placed on {formatDate(order.date)}
                      </p>
                    </div>

                    <span
                      className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-medium capitalize ${getStatusStyle(
                        String(order.status),
                      )}`}
                    >
                      {String(order.status).replace(/[_-]/g, " ")}
                    </span>
                  </CardHeader>

                  <CardContent className="px-5 pb-5 sm:px-6 sm:pb-6">
                    <div className="flex flex-wrap items-end justify-between gap-4 border-t border-border pt-4">
                      <div>
                        <p className="text-sm text-muted-foreground">
                          {itemCount} {itemCount === 1 ? "item" : "items"}
                        </p>
                        <p className="mt-1 text-lg font-bold tabular-nums">
                          {formatPrice(order.amount)}
                        </p>
                      </div>

                      <span className="inline-flex items-center gap-2 text-sm font-medium text-primary">
                        View details
                        <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </main>
  );
};

export default OrdersPage;
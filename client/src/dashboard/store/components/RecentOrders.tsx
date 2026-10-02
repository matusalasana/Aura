import { Eye } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useOrders } from "@/features/orders/hooks/useOrders";


const getStatusVariant = (
  status: string,
): "default" | "secondary" | "outline" => {
  switch (status) {
    case "Paid":
      return "default";

    case "Processing":
      return "secondary";

    case "Shipped":
      return "outline";

    default:
      return "outline";
  }
};


const RecentOrders = () => {
  const { data: orders = [], isLoading } = useOrders();

  if(isLoading){
  return <p>Loading...</p>
  }
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Orders</CardTitle>
        <CardDescription>
          The latest orders from your store.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">
                    {order.id}
                  </TableCell>

                  <TableCell>{order.customer}</TableCell>

                  <TableCell className="text-muted-foreground">
                    {order.date}
                  </TableCell>

                  <TableCell>{order.amount}</TableCell>

                  <TableCell>
                    <Badge variant={getStatusVariant(order.status)}>
                      {order.status}
                    </Badge>
                  </TableCell>

                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" aria-label="View order">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentOrders;
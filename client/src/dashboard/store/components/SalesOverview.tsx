import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const salesData = [
  { day: "Mon", sales: 420 },
  { day: "Tue", sales: 680 },
  { day: "Wed", sales: 540 },
  { day: "Thu", sales: 920 },
  { day: "Fri", sales: 760 },
  { day: "Sat", sales: 1100 },
  { day: "Sun", sales: 980 },
];

const SalesOverview = () => {
  return (
    <Card className="col-span-full">
      <CardHeader>
        <CardTitle>Sales Overview</CardTitle>
        <CardDescription>
          Your sales performance over the last 7 days.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={salesData}>
              <CartesianGrid
                strokeDasharray="3 3"
                className="stroke-border"
              />

              <XAxis
                dataKey="day"
                className="text-xs"
                tickLine={false}
                axisLine={false}
              />

              <YAxis
                className="text-xs"
                tickLine={false}
                axisLine={false}
              />

              <Tooltip />

              <Line
                type="monotone"
                dataKey="sales"
                stroke="var(--primary)"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default SalesOverview;
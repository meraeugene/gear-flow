"use client";

import { TrendingUpIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatCurrency } from "@/utils/currency/formatCurrency";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { useMemo } from "react";

interface SectionCardsProps {
  totalRentals: number;
  activeRentals: number;
  totalUnits: number;
  completedRentals: number;
  revenue: { month: string; revenue: number }[];
}

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export function UserSectionCards({
  totalRentals,
  activeRentals,
  totalUnits,
  completedRentals,
  revenue,
}: SectionCardsProps) {
  const totalRevenue = revenue.reduce((sum, item) => sum + item.revenue, 0);

  // 🛠️ Normalize revenue to include all months
  const normalizedRevenue = useMemo(() => {
    const currentYear = new Date().getFullYear();

    const revenueMap = new Map(
      revenue.map((item) => [item.month, item.revenue]),
    );

    return months.map((monthName) => ({
      month: `${monthName} ${currentYear}`,
      revenue: revenueMap.get(`${monthName} ${currentYear}`) || 0,
    }));
  }, [revenue]);
  return (
    <div>
      <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card @container/main grid w-full grid-cols-5 flex-col gap-6 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs">
        {/* REVENUE */}
        <Card className="@container/card">
          <CardHeader className="relative">
            <CardDescription>Revenue</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              {formatCurrency(totalRevenue)}
            </CardTitle>
            <div className="absolute top-4 right-4">
              <Badge
                variant="outline"
                className="flex gap-1 rounded-lg text-xs"
              >
                <TrendingUpIcon className="size-3" />
              </Badge>
            </div>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1 text-sm">
            <div className="line-clamp-1 flex gap-2 font-medium">
              Total revenue <TrendingUpIcon className="size-4" />
            </div>
            <div className="text-muted-foreground">Earnings from rentals</div>
          </CardFooter>
        </Card>

        {/* TOTAL RENTALS */}
        <Card className="@container/card">
          <CardHeader className="relative">
            <CardDescription>Total Rentals</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              {totalRentals}
            </CardTitle>
            <div className="absolute top-4 right-4">
              <Badge
                variant="outline"
                className="flex gap-1 rounded-lg text-xs"
              >
                <TrendingUpIcon className="size-3" />
              </Badge>
            </div>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1 text-sm">
            <div className="line-clamp-1 flex gap-2 font-medium">
              Rentals made <TrendingUpIcon className="size-4" />
            </div>
            <div className="text-muted-foreground">Since joining</div>
          </CardFooter>
        </Card>

        {/* ACTIVE RENTALS */}
        <Card className="@container/card">
          <CardHeader className="relative">
            <CardDescription>Active Rentals</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              {activeRentals}
            </CardTitle>
            <div className="absolute top-4 right-4">
              <Badge
                variant="outline"
                className="flex gap-1 rounded-lg text-xs"
              >
                <TrendingUpIcon className="size-3" />
              </Badge>
            </div>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1 text-sm">
            <div className="line-clamp-1 flex gap-2 font-medium">
              Ongoing rentals <TrendingUpIcon className="size-4" />
            </div>
            <div className="text-muted-foreground">Current engagements</div>
          </CardFooter>
        </Card>

        {/* TOTAL UNITS */}
        <Card className="@container/card">
          <CardHeader className="relative">
            <CardDescription>Total Units</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              {totalUnits}
            </CardTitle>
            <div className="absolute top-4 right-4">
              <Badge
                variant="outline"
                className="flex gap-1 rounded-lg text-xs"
              >
                <TrendingUpIcon className="size-3" />
              </Badge>
            </div>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1 text-sm">
            <div className="line-clamp-1 flex gap-2 font-medium">
              Units added <TrendingUpIcon className="size-4" />
            </div>
            <div className="text-muted-foreground">Owned units</div>
          </CardFooter>
        </Card>

        {/* COMPLETED RENTALS */}
        <Card className="@container/card">
          <CardHeader className="relative">
            <CardDescription>Completed Rentals</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              {completedRentals}
            </CardTitle>
            <div className="absolute top-4 right-4">
              <Badge
                variant="outline"
                className="flex gap-1 rounded-lg text-xs"
              >
                <TrendingUpIcon className="size-3" />
              </Badge>
            </div>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1 text-sm">
            <div className="line-clamp-1 flex gap-2 font-medium">
              Successful rentals <TrendingUpIcon className="size-4" />
            </div>
            <div className="text-muted-foreground">Fully completed returns</div>
          </CardFooter>
        </Card>
      </div>
      {/* REVENUE CHART */}
      <div className="mt-6 h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={normalizedRevenue}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis tickFormatter={(value) => formatCurrency(value)} />
            <Tooltip formatter={(value: number) => formatCurrency(value)} />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#010101"
              strokeWidth={1}
              dot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

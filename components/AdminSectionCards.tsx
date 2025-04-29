import { TrendingDownIcon, TrendingUpIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface SectionCardsProps {
  totalUsers: number;
  bannedUsers: number;
  adminUsers: number;
  activeUsers: number;
  newUsersThisMonth: number;
}

export function AdminSectionCards({
  totalUsers,
  bannedUsers,
  adminUsers,
  activeUsers,
  newUsersThisMonth,
}: SectionCardsProps) {
  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid w-full grid-cols-1 gap-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-5">
      {/* ACTIVE USERS */}
      <Card className="@container/card">
        <CardHeader className="relative">
          <CardDescription>Active Users</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {activeUsers}
          </CardTitle>
          <div className="absolute top-4 right-4">
            <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
              <TrendingUpIcon className="size-3" />
            </Badge>
          </div>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Active this month <TrendingUpIcon className="size-4" />
          </div>
          <div className="text-muted-foreground">Engaged users</div>
        </CardFooter>
      </Card>

      {/* TOTAL USERS */}
      <Card className="@container/card">
        <CardHeader className="relative">
          <CardDescription>Total Users</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {totalUsers}
          </CardTitle>
          <div className="absolute top-4 right-4">
            <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
              <TrendingUpIcon className="size-3" />
            </Badge>
          </div>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Growing user base <TrendingUpIcon className="size-4" />
          </div>
          <div className="text-muted-foreground">Since launch</div>
        </CardFooter>
      </Card>

      {/* NEW USERS */}
      <Card className="@container/card">
        <CardHeader className="relative">
          <CardDescription>New Users This Month</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {newUsersThisMonth}
          </CardTitle>
          <div className="absolute top-4 right-4">
            <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
              <TrendingUpIcon className="size-3" />
            </Badge>
          </div>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Growth this month <TrendingUpIcon className="size-4" />
          </div>
          <div className="text-muted-foreground">Recent signups</div>
        </CardFooter>
      </Card>

      {/* ADMIN COUNT */}
      <Card className="@container/card">
        <CardHeader className="relative">
          <CardDescription>Admins Count</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {adminUsers}
          </CardTitle>
          <div className="absolute top-4 right-4">
            <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
              <TrendingUpIcon className="size-3" />
            </Badge>
          </div>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Admin accounts <TrendingUpIcon className="size-4" />
          </div>
          <div className="text-muted-foreground">System managers</div>
        </CardFooter>
      </Card>

      {/* BANNED USERS */}
      <Card className="@container/card">
        <CardHeader className="relative">
          <CardDescription>Banned Users</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {bannedUsers}
          </CardTitle>
          <div className="absolute top-4 right-4">
            <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
              <TrendingDownIcon className="size-3" />
            </Badge>
          </div>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Users banned <TrendingDownIcon className="size-4" />
          </div>
          <div className="text-muted-foreground">Review activities</div>
        </CardFooter>
      </Card>
    </div>
  );
}

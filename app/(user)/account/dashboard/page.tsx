import { getAuthUser } from "@/actions/authActions";
import Aside from "@/components/Aside";
import BackButton from "@/components/BackButton";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import { dashboardBreadcrumbs } from "@/data/breadCrumbsLinks";
import { capitalizeFirstLetter } from "@/utils/string/capitalizeFirstLetter";
import { redirect } from "next/navigation";
import { AdminSectionCards } from "@/components/AdminSectionCards";
import {
  getAdminUserStats,
  getUserDashboardStats,
} from "@/actions/statsAction";
import { UserSectionCards } from "@/components/UserSectionCards";

const page = async () => {
  const [
    { user, error },
    { totalUsers, bannedUsers, adminUsers, activeUsers, newUsersThisMonth },
    { totalRentals, activeRentals, totalUnits, completedRentals, revenue },
  ] = await Promise.all([
    getAuthUser(),
    getAdminUserStats(),
    getUserDashboardStats(),
  ]);

  if (error || !user) {
    redirect("/auth/login");
  }

  const isAdmin = user.role === "admin";

  return (
    <div className="flex min-h-screen">
      <Aside />

      <main className="flex-1 p-8 pt-11">
        <div className="space-y-8">
          <div className="mb-6 border-b border-gray-100 pb-6">
            <div className="mb-6 space-y-4">
              <BackButton />
              <BreadcrumbNav items={dashboardBreadcrumbs} />
            </div>

            <h1 className="text-3xl font-bold text-gray-900">
              {isAdmin
                ? `Welcome ${user.first_name} ${user.last_name}`
                : `Welcome back, ${capitalizeFirstLetter(user.first_name)} ${capitalizeFirstLetter(user.last_name)}`}
            </h1>
            <p className="mt-1 text-base text-gray-600">
              {isAdmin ? (
                "Manage users, monitor activities, and keep things running smoothly."
              ) : (
                <span>
                  Here&apos;s a clean overview of your gearflow activity.
                </span>
              )}
            </p>
          </div>

          {isAdmin ? (
            // ADMIN DASHBOARD
            <div className="flex flex-1 flex-col">
              <div className="@container/main flex flex-1 flex-col gap-2">
                <div className="flex flex-col gap-4 md:gap-6">
                  <AdminSectionCards
                    totalUsers={totalUsers ?? 0}
                    bannedUsers={bannedUsers ?? 0}
                    adminUsers={adminUsers ?? 0}
                    activeUsers={activeUsers ?? 0}
                    newUsersThisMonth={newUsersThisMonth ?? 0}
                  />
                </div>
              </div>
            </div>
          ) : (
            // USER DASHBOARD
            <div className="flex flex-1 flex-col">
              <UserSectionCards
                totalRentals={totalRentals ?? 0}
                activeRentals={activeRentals ?? 0}
                totalUnits={totalUnits ?? 0}
                completedRentals={completedRentals ?? 0}
                revenue={revenue ?? []}
              />
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default page;

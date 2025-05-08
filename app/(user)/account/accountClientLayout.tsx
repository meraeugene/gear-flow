"use client";

import { usePathname } from "next/navigation";
import AdminDashboardNavbar from "@/components/dashboardNavbar/AdminDashboardNavbar";
import AdminAside from "@/components/aside/AdminAside";
import UserAside from "@/components/aside/UserAside";
import UserDashboardNavbar from "@/components/dashboardNavbar/UserDashboardNavbar";

export default function AccountClientLayout({
  role,
  children,
}: {
  role?: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const hideLayout = pathname === "/account/update-password";

  if (hideLayout) return <>{children}</>;

  return (
    <>
      {role === "admin" ? <AdminDashboardNavbar /> : <UserDashboardNavbar />}
      <div className="min-h-screen text-black lg:flex">
        {role === "admin" ? <AdminAside /> : <UserAside />}
        <div className="flex-1">
          <main>{children}</main>
        </div>
      </div>
    </>
  );
}

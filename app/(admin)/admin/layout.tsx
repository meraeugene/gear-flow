import { getAuthUser } from "@/actions/authActions";
import AdminDashboardNavbar from "@/components/dashboard-navbar/AdminDashboardNavbar";
import AdminAside from "@/components/aside/AdminAside";
import UserAside from "@/components/aside/UserAside";
import UserDashboardNavbar from "@/components/dashboard-navbar/UserDashboardNavbar";

export default async function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = await getAuthUser();
  const role = user?.role;

  return (
    <>
      {role === "admin" ? <AdminDashboardNavbar /> : <UserDashboardNavbar />}
      <div className="min-h-screen text-black lg:flex">
        {role === "admin" ? <AdminAside /> : <UserAside />}
        <div className="flex-1">
          <main className="">{children}</main>
        </div>
      </div>
    </>
  );
}

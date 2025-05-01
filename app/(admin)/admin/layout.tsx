import { getAuthUser } from "@/actions/authActions";
import AdminAside from "@/components/aside/AdminAside";
import UserAside from "@/components/aside/UserAside";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = await getAuthUser();
  const role = user?.role;

  return (
    <div className="flex min-h-screen text-black">
      {role === "admin" ? <AdminAside /> : <UserAside />}
      <main className="flex-1">{children}</main>
    </div>
  );
}

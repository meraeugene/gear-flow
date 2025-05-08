import { getAuthUser } from "@/actions/authActions";
import AccountClientLayout from "./accountClientLayout";

export default async function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = await getAuthUser();
  return (
    <AccountClientLayout role={user?.role}>{children}</AccountClientLayout>
  );
}

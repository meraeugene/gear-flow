import Aside from "@/components/Aside";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import BackButton from "@/components/BackButton";
import { usersBreadcrumbs } from "@/data/breadCrumbsLinks";
import { getUser } from "@/app/auth/actions/authActions";
import { getAllUsers } from "@/app/auth/actions/usersActions";
import UsersTable from "./users-table";

const page = async () => {
  const { user, error: userError } = await getUser();
  const { data: users, error } = await getAllUsers();

  return (
    <div className="flex min-h-screen">
      <Aside userRole={user.role} />

      <main className="flex-1 p-8">
        {/* Top nav for mobile */}
        <div className="mb-6 flex items-center justify-between md:hidden">
          <h2 className="text-2xl font-semibold tracking-tight">Dashboard</h2>
          <button className="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white shadow hover:opacity-90">
            Menu
          </button>
        </div>

        <div className="border-b border-gray-100 pb-4">
          <div className="mb-6 space-y-4">
            <BackButton />
            <BreadcrumbNav items={usersBreadcrumbs} />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">All Users</h1>
          <p className="mt-1 text-base text-gray-600">
            Manage and review all your listed rental units here.
          </p>
        </div>

        {/* Items Table */}
        <UsersTable users={users ?? []} currentUser={user} />
      </main>
    </div>
  );
};

export default page;

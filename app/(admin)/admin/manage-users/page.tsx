import Aside from "@/components/Aside";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import BackButton from "@/components/BackButton";
import { usersBreadcrumbs } from "@/data/breadCrumbsLinks";
import { getUser } from "@/app/auth/actions/authActions";
import { getAllUsers } from "@/app/auth/actions/usersActions";
import UsersTable from "./users-table";
import { AlertComponent } from "@/components/AlertComponent";

const page = async () => {
  const [userResult, usersResult] = await Promise.all([
    getUser(),
    getAllUsers(),
  ]);

  if (userResult.error || usersResult.error) {
    return (
      <div className="px-24 py-20">
        <AlertComponent variant="destructive" message="No users found." />;
      </div>
    );
  }

  const user = userResult.user;
  const users = usersResult.data;

  return (
    <div className="flex min-h-screen">
      <Aside userRole={user.role} />

      <main className="flex-1 p-8">
        <div className="mb-6 border-b border-gray-100 pb-6">
          <div className="mb-6 space-y-4">
            <BackButton />
            <BreadcrumbNav items={usersBreadcrumbs} />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">All Users</h1>
          <p className="mt-1 text-base text-gray-600">
            Manage and review all your listed rental units here.
          </p>
        </div>

        <UsersTable users={users ?? []} />
      </main>
    </div>
  );
};

export default page;

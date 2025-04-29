import { getAuthUser } from "@/actions/authActions";
import { AlertComponent } from "@/components/AlertComponent";
import Aside from "@/components/Aside";
import BackButton from "@/components/BackButton";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import { settingsBreadcrumbs } from "@/data/breadCrumbsLinks";

const page = async () => {
  const { user, error } = await getAuthUser();

  if (!user || error) {
    return (
      <div className="px-24 py-20">
        <AlertComponent
          variant="destructive"
          message="User is not authenticated."
        />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      <Aside />

      <main className="flex-1 p-8">
        <div className="mb-6 border-b border-gray-100 pb-4">
          <div className="mb-6 space-y-4">
            <BackButton />
            <BreadcrumbNav items={settingsBreadcrumbs} />
          </div>

          <h1 className="text-3xl font-bold text-gray-900">Account Settings</h1>
          <p className="mt-1 text-base text-gray-600">
            Manage your account settings and personal information.
          </p>
        </div>

        <div className="shadow-backdrop-blur-md mb-8 rounded-lg border-l-4 border-black bg-white/60 p-6 shadow-sm transition hover:shadow-md">
          <h2 className="mb-4 text-lg font-semibold">Account Overview</h2>
          <div className="space-y-3">
            <p>
              <strong>Name:</strong> {user.first_name} {user.last_name}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>Phone:</strong> {user.phone_number || "Not provided"}
            </p>
            <p>
              <strong>Address:</strong> {user.address || "Not provided"}
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default page;

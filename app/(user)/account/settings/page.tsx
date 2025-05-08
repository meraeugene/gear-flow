import { getAuthUser } from "@/actions/authActions";
import { AlertComponent } from "@/components/AlertComponent";
import BackButton from "@/components/BackButton";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import GlobalLoader from "@/components/GlobalLoader";
import { settingsBreadcrumbs } from "@/data/breadCrumbsLinks";
import { Suspense } from "react";

const page = async () => {
  const { user, error } = await getAuthUser();

  if (!user || error) {
    return (
      <div className="px-6 py-20 md:px-24">
        <AlertComponent
          variant="destructive"
          message="User is not authenticated."
        />
      </div>
    );
  }

  return (
    <Suspense fallback={<GlobalLoader />}>
      <main className="p-4">
        <div className="mt-4 mb-6 border-b border-gray-100 pb-4">
          <div className="mb-6 space-y-4">
            <BackButton />
            <BreadcrumbNav items={settingsBreadcrumbs} />
          </div>

          <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">
            Account Settings
          </h1>
          <p className="mt-1 text-sm text-gray-600 md:text-base">
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
    </Suspense>
  );
};

export default page;

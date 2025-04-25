import { getAuthUser } from "@/app/auth/actions/authActions";
import Aside from "@/components/Aside";
import BackButton from "@/components/BackButton";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import { dashboardBreadcrumbs } from "@/data/breadCrumbsLinks";
import { redirect } from "next/navigation";

const page = async () => {
  const { user, error } = await getAuthUser();

  if (error || !user) {
    redirect("/auth/login");
  }

  return (
    <div className="flex min-h-screen">
      <Aside />

      <main className="flex-1 p-8 pt-11">
        <div className="space-y-8">
          <div className="mb-6 border-b border-gray-100 pb-4">
            <div className="mb-6 space-y-4">
              <BackButton />
              <BreadcrumbNav items={dashboardBreadcrumbs} />
            </div>

            <h1 className="text-3xl font-bold text-gray-900">
              Welcome back, {user.first_name} {user.last_name}
            </h1>
            <p className="mt-1 text-base text-gray-600">
              Here’s a clean overview of your gearflow activity.
            </p>
          </div>

          <section className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="rounded-lg border-l-4 border-black bg-white/60 p-6 shadow backdrop-blur-md transition hover:shadow-lg">
              <h4 className="text-sm font-semibold text-gray-700">
                Active Rentals
              </h4>
              <p className="mt-3 text-3xl font-semibold text-black">3</p>
            </div>

            <div className="rounded-lg border-l-4 border-black bg-white/60 p-6 shadow backdrop-blur-md transition hover:shadow-lg">
              <h4 className="text-sm font-semibold text-gray-700">
                Total Equipment
              </h4>
              <p className="mt-3 text-3xl font-semibold text-black">12</p>
            </div>

            <div className="rounded-lg border-l-4 border-black bg-white/60 p-6 shadow backdrop-blur-md transition hover:shadow-lg">
              <h4 className="text-sm font-semibold text-gray-700">
                Pending Returns
              </h4>
              <p className="mt-3 text-3xl font-semibold text-black">1</p>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default page;

import { getUser } from "@/app/auth/actions/authActions";
import Aside from "@/components/Aside";
import BackButton from "@/components/BackButton";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import { settingsLinks } from "@/data/asideLinks";
import { settingsBreadcrumbs } from "@/data/breadCrumbsLinks";
import { linkDescriptions } from "@/data/settingsLinks";
import Link from "next/link";

const page = async () => {
  const { user } = await getUser();

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

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {settingsLinks.slice(1).map(({ name, href, icon }) => (
            <Link
              href={href}
              key={href}
              className="shadow-backdrop-blur-md space-y-3 rounded-lg border border-l-4 border-l-black p-4 shadow-sm transition hover:shadow-md"
            >
              <div className="flex w-fit items-center gap-4">
                <span className="text-gray-500">{icon}</span>
                <span>{name}</span>
              </div>
              <p className="border-t border-gray-100 pt-3 text-sm text-gray-600">
                {linkDescriptions[href]}
              </p>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
};

export default page;

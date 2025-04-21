import Aside from "@/components/Aside";
import BackButton from "@/components/BackButton";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import EditProfileForm from "@/components/forms/EditProfileForm";
import { getUser } from "@/app/auth/actions/authActions";
import { settingsLinks } from "@/data/asideLinks";
import { editProfileBreadcrumbs } from "@/data/breadCrumbsLinks";

const page = async () => {
  const { user } = await getUser();

  return (
    <div className="flex min-h-screen">
      <Aside links={settingsLinks} />

      <main className="flex-1 p-8">
        <div className="mb-6 space-y-4 border-b border-gray-100 pb-4">
          <BackButton />
          <BreadcrumbNav items={editProfileBreadcrumbs} />
        </div>

        <section className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900">Edit Profile</h1>
          <p className="mt-1 text-base text-gray-600">
            Update your account information below.
          </p>

          <div className="mt-6">
            <EditProfileForm
              defaultValues={{
                firstName: user.first_name || "",
                lastName: user.last_name || "",
                phoneNumber: user.phone_number || "",
                profilePictureUrl: user.profile_picture || "",
                address: user.address || "",
                email: user.email || "",
              }}
            />
          </div>
        </section>
      </main>
    </div>
  );
};

export default page;

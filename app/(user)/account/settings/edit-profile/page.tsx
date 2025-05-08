import BackButton from "@/components/BackButton";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import EditProfileForm from "@/components/forms/EditProfileForm";
import { getAuthUser } from "@/actions/authActions";
import { editProfileBreadcrumbs } from "@/data/breadCrumbsLinks";
import { AlertComponent } from "@/components/AlertComponent";
import { Suspense } from "react";
import GlobalLoader from "@/components/GlobalLoader";

const page = async () => {
  const { user, error } = await getAuthUser();

  if (!user || error) {
    return (
      <div className="px-4 py-10 md:px-24">
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
        <div className="mt-4 mb-6 space-y-4 border-b border-gray-100 pb-4">
          <BackButton />
          <BreadcrumbNav items={editProfileBreadcrumbs} />
        </div>

        <section>
          <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">
            Edit Profile
          </h1>
          <p className="mt-1 text-sm text-gray-600 md:text-base">
            Update your account information below.
          </p>

          <div className="mt-6">
            <EditProfileForm
              defaultValues={{
                firstName: user.first_name ?? "",
                lastName: user.last_name ?? "",
                phoneNumber: user.phone_number ?? "",
                profilePictureUrl: user.profile_picture ?? "",
                address: user.address ?? "",
                email: user.email ?? "",
              }}
            />
          </div>
        </section>
      </main>
    </Suspense>
  );
};

export default page;

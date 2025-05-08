import BackButton from "@/components/BackButton";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import SendResetPassword from "@/components/forms/SendResetPassword";
import { getAuthUser } from "@/actions/authActions";
import { resetPasswordBreadcrumbs } from "@/data/breadCrumbsLinks";
import { AlertComponent } from "@/components/AlertComponent";

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
    <main className="p-4">
      <div className="mb-6 border-b border-gray-100 pb-4">
        <div className="mt-4 mb-6 space-y-4">
          <BackButton />
          <BreadcrumbNav items={resetPasswordBreadcrumbs} />
        </div>

        <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">
          Reset Password
        </h1>
        <p className="mt-1 text-sm text-gray-600 md:text-base">
          By clicking the button, a reset link will be sent to your registered
          email address.
        </p>
      </div>

      <SendResetPassword email={user.email} />
    </main>
  );
};

export default page;

import Aside from "@/components/Aside";
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
            <BreadcrumbNav items={resetPasswordBreadcrumbs} />
          </div>

          <h1 className="text-3xl font-bold text-gray-900">Reset Password</h1>
          <p className="mt-1 text-base text-gray-600">
            By clicking the button, a reset link will be sent to your registered
            email address.
          </p>
        </div>

        <SendResetPassword email={user.email} />
      </main>
    </div>
  );
};

export default page;

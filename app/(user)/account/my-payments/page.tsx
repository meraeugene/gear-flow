import Aside from "@/components/Aside";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import BackButton from "@/components/BackButton";
import {
  myPaymentsBreadcrumbs,
  usersBreadcrumbs,
} from "@/data/breadCrumbsLinks";
import { getUser } from "@/app/auth/actions/authActions";
import PaymentsTable from "./payments-table";
import { getUserTransaction } from "@/app/auth/actions/transactionActions";

const page = async () => {
  const { user, error: userError } = await getUser();
  const { transactions, error: rentalsError } = await getUserTransaction();

  console.log(transactions);

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

        <div className="mb-6 border-b border-gray-100 pb-6">
          <div className="mb-6 space-y-4">
            <BackButton />
            <BreadcrumbNav items={myPaymentsBreadcrumbs} />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">My Payments</h1>
          <p className="mt-1 text-base text-gray-600">
            View the status of your payments, including owner, total price,
            payment method, transaction date.
          </p>
        </div>

        <PaymentsTable transactions={transactions ?? []} />
      </main>
    </div>
  );
};

export default page;

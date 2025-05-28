import { getAllLenders } from "@/actions/lenderActions";
import { AlertComponent } from "@/components/AlertComponent";
import BackButton from "@/components/BackButton";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import GlobalLoader from "@/components/GlobalLoader";
import { lendersBreadcrumbs } from "@/data/breadCrumbsLinks";
import { capitalizeFirstLetter } from "@/utils/string/capitalizeFirstLetter";
import { generateSlug } from "@/utils/string/generateSlug";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

const page = async () => {
  const { data: lenders, error } = await getAllLenders();

  if (error) {
    return (
      <div className="px-4 py-10 md:px-24">
        <AlertComponent
          message="Error loading lenders data."
          variant="destructive"
        />
      </div>
    );
  }

  return (
    <Suspense fallback={<GlobalLoader />}>
      <div className="min-h-screen px-4 py-12 lg:px-12 xl:px-24">
        <div className="space-y-7">
          <BackButton />
          <BreadcrumbNav items={lendersBreadcrumbs} />
        </div>

        <div className="lenders__container">
          <h1 className="my-12 text-3xl">Lenders</h1>
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8">
            {lenders?.map((lender) => (
              <Link
                href={`/lenders/${lender.auth_user_id}/${generateSlug(lender.first_name + "-" + lender.last_name)}`}
                key={lender.auth_user_id}
                className="profile-card__container flex flex-col items-center justify-center"
              >
                <Image
                  src={lender.profile_picture}
                  alt="profile picture"
                  width={150}
                  height={150}
                  className="rounded-full object-cover"
                  style={{ width: "150px", height: "150px" }}
                />
                <div className="info__container flex flex-col items-center justify-center">
                  <h1 className="mt-4 text-base font-semibold">
                    {capitalizeFirstLetter(lender.first_name)}{" "}
                    {capitalizeFirstLetter(lender.last_name)}
                  </h1>
                  <h2 className="text-base text-gray-600">
                    Total Units:{" "}
                    <span className="text-black">{lender.unit_count}</span>
                  </h2>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Suspense>
  );
};

export default page;

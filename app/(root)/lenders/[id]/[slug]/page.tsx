import { getLenderUnitsWithProfile } from "@/actions/lenderActions";
import { AlertComponent } from "@/components/AlertComponent";
import BackButton from "@/components/BackButton";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import GlobalLoader from "@/components/GlobalLoader";
import InfiniteUserUnits from "@/components/InfiniteUserUnits";
import { capitalizeFirstLetter } from "@/utils/string/capitalizeFirstLetter";
import { generateSlug } from "@/utils/string/generateSlug";
import Image from "next/image";
import { Suspense } from "react";

const LenderPage = async ({
  params,
}: {
  params: Promise<{ id: string; slug: string }>;
}) => {
  const lenderId = (await params).id;
  const slug = (await params).slug;

  const { owner, error } = await getLenderUnitsWithProfile(lenderId);

  if (
    error ||
    !owner ||
    slug !==
      generateSlug(
        `${capitalizeFirstLetter(owner.first_name)}-${capitalizeFirstLetter(owner.last_name)}`,
      )
  ) {
    return (
      <div className="px-4 py-10 md:px-24">
        <AlertComponent
          message={error || "Error loading lender data."}
          variant="destructive"
        />
      </div>
    );
  }

  const breadcrumbs = [
    { title: "Home", href: "/" },
    { title: "Lenders", href: "/lenders" },
    {
      title: `${capitalizeFirstLetter(owner.first_name)} ${capitalizeFirstLetter(owner.last_name)}`,
      href: `/lenders/${lenderId}/${slug}`,
    },
  ];

  return (
    <Suspense fallback={<GlobalLoader />}>
      <div className="px-4 py-12 lg:px-12 xl:px-24">
        <div className="space-y-7">
          <BackButton />
          <BreadcrumbNav items={breadcrumbs} />
        </div>

        <div className="profile__container mt-12 flex flex-col items-start gap-10 md:ml-32 md:flex-row">
          <Image
            src={owner?.profile_picture || ""}
            width={160}
            height={160}
            className="rounded-full object-cover"
            alt="profile picture"
            style={{ width: "160px", height: "160px" }}
          />

          <div className="space-y-3">
            <h1 className="text-3xl font-bold text-gray-800">
              {capitalizeFirstLetter(owner.first_name)}{" "}
              {capitalizeFirstLetter(owner.last_name)}
            </h1>

            <div className="space-y-1 text-gray-600">
              <p>
                <span className="font-semibold">Address:</span>{" "}
                {owner?.address || "N/A"}
              </p>
              <p>
                <span className="font-semibold">Email:</span>{" "}
                {owner?.email || "N/A"}
              </p>
              <p>
                <span className="font-semibold">Phone:</span>{" "}
                {owner?.phone_number || "N/A"}
              </p>
            </div>
          </div>
        </div>

        <div className="user-units__container mt-14 border-t border-gray-100 pt-14">
          <InfiniteUserUnits lenderId={lenderId} />
        </div>
      </div>
    </Suspense>
  );
};

export default LenderPage;

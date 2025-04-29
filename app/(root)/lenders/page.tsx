import { getAllLenders } from "@/actions/lenderActions";
import { AlertComponent } from "@/components/AlertComponent";
import BackButton from "@/components/BackButton";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import { lendersBreadcrumbs } from "@/data/breadCrumbsLinks";
import { capitalizeFirstLetter } from "@/utils/string/capitalizeFirstLetter";
import { generateSlug } from "@/utils/string/generateSlug";
import Image from "next/image";
import Link from "next/link";

const page = async () => {
  const { data: lenders, error } = await getAllLenders();

  if (error) {
    return (
      <div className="px-24 pt-12 pb-20">
        <AlertComponent
          message="Error loading lenders data."
          variant="destructive"
        />
      </div>
    );
  }

  return (
    <div className="px-24 pt-12 pb-20">
      <div className="space-y-7">
        <BackButton />
        <BreadcrumbNav items={lendersBreadcrumbs} />
      </div>

      <div className="lenders__container">
        <h1 className="my-12 text-3xl">Lenders</h1>
        <div className="grid grid-cols-7 gap-8">
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
                layout="intrinsic"
                className="w-[13rem] rounded-full object-cover"
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
  );
};

export default page;

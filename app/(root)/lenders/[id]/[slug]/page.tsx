import { getUserUnitsById } from "@/app/auth/actions/unitActions";
import { getUserById } from "@/app/auth/actions/usersActions";
import { AlertComponent } from "@/components/AlertComponent";
import BackButton from "@/components/BackButton";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import UserUnits from "@/components/UserUnits";
import { capitalizeFirstLetter } from "@/utils/capitalizeFirstLetter";
import { generateSlug } from "@/utils/generateSlug";
import Image from "next/image";

type Props = {
  params: {
    id: string;
    slug: string;
  };
};

const page = async ({ params }: Props) => {
  const { id: lenderId, slug } = params;

  const [firstName, lastName] = slug.split("-").map(capitalizeFirstLetter);
  const capitalizedName = `${firstName} ${lastName}`;

  const [userUnitsResponse, ownerResponse] = await Promise.all([
    getUserUnitsById(lenderId),
    getUserById(lenderId),
  ]);

  const { userUnits, error: userUnitsError } = userUnitsResponse;
  const { data: owner, error: ownerError } = ownerResponse;

  if (
    userUnitsError ||
    ownerError ||
    slug !== generateSlug(owner?.first_name + "-" + owner?.last_name)
  ) {
    return (
      <div className="px-24 pt-12 pb-20">
        <AlertComponent
          message="Error loading user unit data."
          variant="destructive"
        />
      </div>
    );
  }

  const breadcrumbs = [
    { title: "Home", href: "/" },
    { title: "Lenders", href: "/lenders" },
    {
      title: capitalizedName,
      href: `/lenders/${lenderId}/${slug}`,
    },
  ];

  return (
    <div className="px-24 pt-12 pb-20">
      <div className="space-y-7">
        <BackButton />
        <BreadcrumbNav items={breadcrumbs} />
      </div>

      <div className="profile__container mt-12 ml-32 flex items-start gap-10">
        <Image
          src={owner?.profile_picture || ""}
          width={160}
          height={160}
          className="rounded-full object-cover"
          alt="profile picture"
        />

        <div className="space-y-3">
          <h1 className="text-3xl font-bold text-gray-800">
            {capitalizedName}
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
        <UserUnits units={userUnits || []} />
      </div>
    </div>
  );
};

export default page;

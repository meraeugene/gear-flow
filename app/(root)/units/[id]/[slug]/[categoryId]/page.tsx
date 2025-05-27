import { generateSlug } from "@/utils/string/generateSlug";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import Image from "next/image";
import BackButton from "@/components/BackButton";
import Link from "next/link";
import { formatCurrency } from "@/utils/currency/formatCurrency";
import { AlertComponent } from "@/components/AlertComponent";
import RelatedUnits from "@/components/RelatedUnits";
import RentNowButton from "@/components/RentNowButton";
import { getUnitDetailsWithRelated } from "@/actions/unitActions";

const page = async ({
  params,
}: {
  params: Promise<{ id: string; categoryId: string; slug: string }>;
}) => {
  const unitId = (await params).id;
  const categoryId = (await params).categoryId;
  const slug = (await params).slug;

  const { unit, rentalEndDate, relatedUnits, error } =
    await getUnitDetailsWithRelated(unitId, categoryId);

  if (error || slug !== generateSlug(unit.name) || !unit) {
    return (
      <div className="px-4 py-10 md:px-24">
        <AlertComponent variant="destructive" message="No unit found." />
      </div>
    );
  }

  const breadcrumbs = [
    { title: "Home", href: "/" },
    { title: "Units", href: "/units" },
    {
      title: unit.name,
      href: `/units/${unitId}/${slug}`,
    },
  ];

  return (
    <main className="px-4 pt-12 pb-24 lg:px-12 xl:px-24">
      <div className="space-y-7">
        <BackButton />
        <BreadcrumbNav items={breadcrumbs} />
      </div>

      <div className="mx-auto mt-12 flex max-w-[85rem] flex-col justify-center gap-2 space-y-6 md:flex-row md:gap-12">
        <div className="w-full">
          <div className="relative h-[25rem] overflow-hidden md:h-[20rem] lg:h-[25rem] xl:h-[35rem]">
            <Image
              src={unit.image_url}
              alt={unit.name}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover object-center"
            />
          </div>
        </div>

        <div className="w-full">
          <h1 className="text-3xl font-semibold text-gray-800 md:text-4xl">
            {unit.name}
          </h1>
          <div className="my-4 flex items-center gap-2">
            <p className="text-base text-gray-500">{unit.category_name}</p>
            <span>|</span>
            <p
              className={`text-base capitalize ${
                unit.is_available ? "text-green-500" : "text-red-500"
              }`}
            >
              {unit.is_available ? "Available" : "Unavailable"}
              {!unit.is_available && rentalEndDate && (
                <span className="ml-2 text-gray-500">
                  (Available on {new Date(rentalEndDate).toLocaleDateString()})
                </span>
              )}
            </p>
          </div>
          <p className="mb-4 text-base text-gray-500">
            Owner:{" "}
            <Link
              href={`/lenders/${unit.owner_id}/${generateSlug(unit.owner_first_name + "-" + unit.owner_last_name)}`}
              className="font-medium text-gray-700 hover:text-black"
            >
              {unit.owner_first_name} {unit.owner_last_name}
            </Link>
          </p>
          <p className="text-base text-gray-600">{unit.description}</p>

          <div className="my-6 flex items-center gap-2">
            <p className="text-3xl font-medium text-gray-900">
              {formatCurrency(unit.price_per_day)}
            </p>
            <span className="text-base text-gray-500">/ Per Day</span>
          </div>

          <RentNowButton
            isAvailable={unit.is_available}
            unitId={unitId}
            unitSlug={slug}
            pricePerDay={unit.price_per_day}
          />
        </div>
      </div>

      {relatedUnits && relatedUnits.length > 0 && (
        <RelatedUnits relatedUnitsData={relatedUnits ?? []} />
      )}
    </main>
  );
};

export default page;

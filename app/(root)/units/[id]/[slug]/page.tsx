import { notFound } from "next/navigation";
import { generateSlug } from "@/utils/generateSlug";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import Image from "next/image";
import BackButton from "@/components/BackButton";
import { getRelatedUnits, getUnitById } from "@/app/auth/actions/unitActions";
import Link from "next/link";
import { formatCurrency } from "@/utils/formatCurrency";
import { AlertComponent } from "@/components/AlertComponent";
import RelatedUnits from "@/components/RelatedUnits";

type Props = {
  params: {
    id: string;
    slug: string;
  };
};

const page = async ({ params }: Props) => {
  const { id, slug } = params;

  const { data: unit, error: unitError } = await getUnitById(id);
  const { data: relatedUnits, error: relatedUnitsError } =
    await getRelatedUnits(unit.id, unit.category.id);

  if (!unit || unitError)
    return (
      <div className="px-24 py-20">
        <AlertComponent variant="destructive" message="No units found." />;
      </div>
    );

  if (slug !== generateSlug(unit.name))
    return (
      <div className="px-24 py-20">
        <AlertComponent variant="destructive" message="No units found." />;
      </div>
    );

  const breadcrumbs = [
    { title: "Home", href: "/" },
    { title: "Units", href: "/units" },
    {
      title: unit.name,
      href: `/units/${id}/${slug}`,
    },
  ];

  return (
    <main className="px-24 pt-12 pb-24">
      <div className="space-y-7">
        <BackButton />
        <BreadcrumbNav items={breadcrumbs} />
      </div>

      <div className="mx-auto flex max-w-[85rem] justify-center gap-12 space-y-6 md:mt-12">
        <div className="w-full">
          <div className="relative h-[35rem] overflow-hidden rounded-lg shadow-lg">
            <Image
              src={unit.image_url}
              alt={unit.name}
              layout="fill"
              objectFit="cover"
              className="object-center"
            />
          </div>
        </div>

        <div className="w-full">
          <h1 className="text-3xl font-semibold text-gray-800 md:text-4xl">
            {unit.name}
          </h1>
          <div className="my-4 flex items-center gap-2">
            <p className="text-base text-gray-500">{unit.category.name}</p>
            <span>|</span>
            <p
              className={`text-base capitalize ${
                unit.is_available ? "text-green-500" : "text-red-500"
              }`}
            >
              {unit.is_available ? "Available" : "Unavailable"}
            </p>
          </div>
          <p className="mb-4 text-base">
            Owner:{" "}
            <span className="font-medium text-gray-500">
              {unit.owner.first_name} {unit.owner.last_name}
            </span>
          </p>
          <p className="text-base text-gray-600">{unit.description}</p>

          <div className="my-6 flex items-center gap-2">
            <p className="text-3xl font-medium text-gray-900">
              {formatCurrency(unit.price_per_day)}
            </p>
            <span className="text-base text-gray-500">/ Per Day</span>
          </div>
          <Link href={`/rent/${id}/${slug}`}>
            <button
              className={`h-[50px] w-full rounded-sm border transition duration-200 ${
                unit.is_available
                  ? "cursor-pointer border-gray-300 hover:bg-gray-100"
                  : "cursor-not-allowed border-gray-200 bg-gray-200"
              }`}
              disabled={!unit.is_available}
            >
              Rent Now
            </button>
          </Link>
        </div>
      </div>

      {relatedUnits && relatedUnits.length > 0 && (
        <RelatedUnits relatedUnitsData={relatedUnits ?? []} />
      )}
    </main>
  );
};

export default page;

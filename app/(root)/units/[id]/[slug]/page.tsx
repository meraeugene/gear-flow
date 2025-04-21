import { notFound } from "next/navigation";
import { unitsData } from "@/data/units";
import { generateSlug } from "@/utils/generateSlug";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import Image from "next/image";
import BackButton from "@/components/BackButton";
import { getAllOtherUnits } from "@/app/auth/actions/unitActions";
import Link from "next/link";

type Props = {
  params: {
    id: number;
    slug: string;
  };
};

const page = async ({ params }: Props) => {
  const { id, slug } = params;

  const { data: units, error: unitsError } = await getAllOtherUnits();
  if (!units || unitsError) return notFound();

  const unit = units.find((u) => u.id === id);
  if (!unit) return notFound();

  if (slug !== generateSlug(unit.name)) return notFound();

  const breadcrumbs = [
    { title: "Home", href: "/" },
    { title: "Units", href: "/units" },
    {
      title: unit.name,
      href: `/units/${unit.unit_id}/${generateSlug(unit.name)}`,
    },
  ];

  const isAvailable = unit.is_available;

  return (
    <main className="px-24 pt-12 pb-24">
      <div className="space-y-4">
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
            <p className="text-base text-gray-500">{unit.category}</p>
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
            <span className="font-medium text-gray-500">Andrew Villalon</span>
          </p>
          <p className="text-base text-gray-600">{unit.description}</p>

          <div className="my-6 flex items-center gap-2">
            <p className="text-3xl font-medium text-gray-900">
              ${unit.price_per_day.toFixed(2)}
            </p>
            <span className="text-base text-gray-500">/ Per Day</span>
          </div>
          <Link href={`/rent/${id}/${slug}`}>
            <button
              className={`h-[50px] w-[250px] rounded-sm border transition duration-200 ${
                isAvailable
                  ? "cursor-pointer border-gray-300 hover:bg-gray-100"
                  : "cursor-not-allowed border-gray-200 bg-gray-200"
              }`}
              disabled={!isAvailable}
            >
              Rent Now
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
};

export default page;

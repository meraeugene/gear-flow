import { UnitWithOwner } from "@/types";
import { generateSlug } from "@/utils/string/generateSlug";
import Image from "next/image";
import Link from "next/link";

interface NewArrivalProps {
  newArrivalsData: UnitWithOwner[];
}

const NewArrival = ({ newArrivalsData }: NewArrivalProps) => {
  const firstSlug = generateSlug(newArrivalsData[0]?.name);
  const secondSlug = generateSlug(newArrivalsData[1]?.name);
  const thirdSlug = generateSlug(newArrivalsData[2]?.name);

  return (
    <div>
      <div className="heading mb-6 flex flex-col items-center text-center">
        <p className="text-sm sm:text-base">Featured</p>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl">New Arrivals</h1>
      </div>

      {/* Responsive layout */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:h-[40rem] lg:grid-cols-5 lg:grid-rows-6">
        {/* First Image */}
        <div className="h-64 md:col-span-2 md:h-auto lg:col-span-3 lg:row-span-6">
          <Link
            href={`/units/${newArrivalsData[0]?.unit_id}/${firstSlug}/${newArrivalsData[0]?.category_id}`}
          >
            <Image
              className="h-full w-full border object-cover"
              src={newArrivalsData[0]?.image_url || "/assets/images/ps5.jpg"}
              alt={newArrivalsData[0]?.name || "First Item"}
              width={1920}
              height={1080}
            />
          </Link>
        </div>

        {/* Second Image */}
        <div className="h-64 md:h-auto lg:col-span-2 lg:col-start-4 lg:row-span-3">
          <Link
            href={`/units/${newArrivalsData[1]?.unit_id}/${secondSlug}/${newArrivalsData[1]?.category_id}`}
          >
            <Image
              className="h-full w-full border object-cover"
              src={newArrivalsData[1]?.image_url || "/assets/images/camera.jpg"}
              alt={newArrivalsData[1]?.name || "Second Item"}
              width={1920}
              height={1080}
            />
          </Link>
        </div>

        {/* Third Image */}
        <div className="h-64 md:h-auto lg:col-span-2 lg:col-start-4 lg:row-span-3 lg:row-start-4">
          <Link
            href={`/units/${newArrivalsData[2]?.unit_id}/${thirdSlug}/${newArrivalsData[2]?.category_id}`}
          >
            <Image
              className="h-full w-full border object-cover"
              src={newArrivalsData[2]?.image_url || "/assets/images/alexa.jpg"}
              alt={newArrivalsData[2]?.name || "Third Item"}
              width={1920}
              height={1080}
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NewArrival;

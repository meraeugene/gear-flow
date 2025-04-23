import { UnitWithOwner } from "@/types";
import { generateSlug } from "@/utils/generateSlug";
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
      <div className="heading mb-10 flex flex-col items-center justify-center">
        <p className="text-base">Featured</p>
        <h1 className="text-3xl">New Arrivals</h1>
      </div>

      <div className="grid h-[40rem] grid-cols-5 grid-rows-6 gap-4">
        {/* First Image (index 0) */}
        <div className="col-span-3 row-span-6">
          <Link href={`/units/${newArrivalsData[0]?.id}/${firstSlug}`}>
            <Image
              className="h-full w-full object-cover"
              src={newArrivalsData[0]?.image_url || "/assets/images/ps5.jpg"} // First item
              alt={newArrivalsData[0]?.name || "First Item"}
              width={1920}
              height={1080}
            />
          </Link>
        </div>

        {/* Second Image (index 1) */}
        <div className="col-span-2 col-start-4 row-span-3">
          <Link href={`/units/${newArrivalsData[1]?.id}/${secondSlug}`}>
            <Image
              className="h-full w-full object-cover"
              src={newArrivalsData[1]?.image_url || "/assets/images/camera.jpg"} // Second item
              alt={newArrivalsData[1]?.name || "Second Item"}
              width={1920}
              height={1080}
            />
          </Link>
        </div>

        {/* Third Image (index 2) */}
        <div className="col-span-2 col-start-4 row-span-3 row-start-4">
          <Link href={`/units/${newArrivalsData[2]?.id}/${thirdSlug}`}>
            <Image
              className="h-full w-full object-cover"
              src={newArrivalsData[2]?.image_url || "/assets/images/alexa.jpg"} // Third item
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

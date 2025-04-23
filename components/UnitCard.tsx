import { UnitWithOwner } from "@/types";
import { formatCurrency } from "@/utils/formatCurrency";
import { generateSlug } from "@/utils/generateSlug";
import Image from "next/image";
import Link from "next/link";

interface UnitCardProps {
  unitData: UnitWithOwner;
}

const UnitCard: React.FC<UnitCardProps> = ({ unitData }) => {
  const { id, image_url, name, price_per_day, category } = unitData;

  const slug = generateSlug(name);

  return (
    <article>
      <Link href={`/units/${id}/${slug}`}>
        <div className="image h-[25rem] overflow-hidden rounded-md border">
          <Image
            className="h-full w-full object-cover"
            src={image_url}
            alt={name}
            width={1980}
            height={1020}
          />
        </div>

        <div className="product__information mt-4">
          <h2 className="text-base font-medium">{name}</h2>
          <p className="text-base text-gray-600">{category}</p>
          <p className="mt-1 text-base font-bold">
            {formatCurrency(price_per_day)}
          </p>
          {/* <span
            className={`text-sm font-medium capitalize ${
              availability === "available" ? "text-green-600" : "text-red-500"
            }`}
          >
            {availability}
          </span> */}

          {/* <p className="text-sm text-gray-700">{description}</p> */}
        </div>
      </Link>
    </article>
  );
};

export default UnitCard;

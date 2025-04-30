"use client";

import { useAuthStore } from "@/stores/useAuthStore";
import Link from "next/link";
import { toast } from "sonner";

type RentNowButtonProps = {
  isAvailable: boolean;
  unitId: string;
  unitSlug: string;
  pricePerDay: number;
  categoryId: string;
};

const RentNowButton = ({
  isAvailable,
  unitId,
  unitSlug,
  categoryId,
}: RentNowButtonProps) => {
  const { userId, role } = useAuthStore();

  const handleRentNowClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!userId) {
      toast.error("Please login in to rent a unit.");
      event.preventDefault();
      return;
    }

    if (role === "admin") {
      toast.error(
        "Admin cannot rent a unit. Please create or login to a  user account.",
      );
      event.preventDefault();
      return;
    }
  };

  return (
    <Link href={`/rent/${unitId}/${unitSlug}`}>
      <button
        className={`h-[50px] w-full rounded-sm border transition duration-200 ${
          isAvailable
            ? "cursor-pointer border-gray-300 hover:bg-gray-100"
            : "cursor-not-allowed border-gray-200 bg-gray-200"
        }`}
        disabled={!isAvailable}
        onClick={handleRentNowClick}
      >
        Rent Now
      </button>
    </Link>
  );
};

export default RentNowButton;

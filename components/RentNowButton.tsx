"use client";

import { useAuthStore } from "@/stores/useAuthStore";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type RentNowButtonProps = {
  isAvailable: boolean;
  unitId: string;
  unitSlug: string;
  pricePerDay: number;
};

const RentNowButton = ({
  isAvailable,
  unitId,
  unitSlug,
}: RentNowButtonProps) => {
  const { userId, role } = useAuthStore();
  const router = useRouter();

  const handleRentNowClick = () => {
    if (!userId) {
      toast.error("Please login in to rent a unit.");
      return;
    }

    if (role === "admin") {
      toast.error(
        "Admin cannot rent a unit. Please create or login to a  user account.",
      );
      return;
    }

    router.push(`/rent/${unitId}/${unitSlug}`);
  };

  return (
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
  );
};

export default RentNowButton;

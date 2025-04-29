"use client";

import { generateSlug } from "@/utils/string/generateSlug";
import { AlertComponent } from "@/components/AlertComponent";
import UnitRent from "@/components/UnitRent";
import { useParams } from "next/navigation";
import useSWR from "swr";
import { fetcher } from "@/lib/services/swrFetcher";
import { Skeleton } from "@/components/ui/skeleton";

const RentPage = () => {
  const params = useParams();
  const unitId = params.id as string;
  const categoryId = params.categoryId as string;
  const slug = params.slug as string;

  const { data, error, isLoading } = useSWR(
    `/api/unit/?id=${encodeURIComponent(unitId)}&categoryId=${encodeURIComponent(categoryId)}`,
    fetcher,
  );

  if (isLoading) {
    return (
      <div className="space-y-8 px-24 py-20">
        <div className="flex gap-12">
          <Skeleton className="flex h-[500px] w-full items-center justify-center rounded-lg" />
          <Skeleton className="flex h-[200px] w-full items-center justify-center rounded-lg" />
        </div>
        <div className="mt-14 grid grid-cols-3 gap-8">
          <Skeleton className="flex h-[350px] w-full items-center justify-center rounded-lg" />
          <Skeleton className="flex h-[350px] w-full items-center justify-center rounded-lg" />
          <Skeleton className="flex h-[350px] w-full items-center justify-center rounded-lg" />
        </div>
      </div>
    );
  }

  const { unit, userData } = data;

  if (error || slug !== generateSlug(unit.name)) {
    return (
      <div className="px-24 py-20">
        <AlertComponent variant="destructive" message="No unit found." />
      </div>
    );
  }

  return <UnitRent user={userData} unit={unit} />;
};

export default RentPage;

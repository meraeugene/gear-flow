import { Skeleton } from "@/components/ui/skeleton";

const RentalsSkeletonLoading = () => {
  return (
    <>
      {/* MOBILE */}
      <div className="p-4 py-6 md:hidden">
        <Skeleton className="h-[20px] w-[50px] rounded-sm" />
        <Skeleton className="mt-4 h-[20px] w-[150px] rounded-sm" />

        <Skeleton className="mt-8 h-[30px] w-[80px] rounded-sm" />
        <Skeleton className="mt-4 h-[15px] w-[300px] rounded-sm" />
        <Skeleton className="mt-2 h-[15px] w-full rounded-sm" />
        <Skeleton className="mt-2 h-[15px] w-[200px] rounded-sm" />

        <Skeleton className="mt-8 h-[80px] w-full rounded-sm" />
      </div>

      {/* TABLET */}
      <div className="hidden p-4 py-6 md:block lg:hidden">
        <Skeleton className="h-[20px] w-[50px] rounded-sm" />
        <Skeleton className="mt-4 h-[20px] w-[150px] rounded-sm" />

        <Skeleton className="mt-8 h-[30px] w-[80px] rounded-sm" />
        <Skeleton className="mt-4 h-[20px] w-full rounded-sm" />
        <Skeleton className="mt-2 h-[20px] w-[200px] rounded-sm" />

        <Skeleton className="mt-8 h-[60px] w-full rounded-sm" />
      </div>

      {/* LARGE SCREEN */}
      <div className="hidden p-4 py-6 md:hidden lg:block">
        <Skeleton className="h-[20px] w-[50px] rounded-sm" />
        <Skeleton className="mt-4 h-[20px] w-[150px] rounded-sm" />

        <Skeleton className="mt-8 h-[30px] w-[80px] rounded-sm" />
        <Skeleton className="mt-4 h-[20px] w-full rounded-sm" />
        <Skeleton className="mt-2 h-[20px] w-[200px] rounded-sm" />

        <Skeleton className="mt-8 h-[60px] w-full rounded-sm" />
      </div>
    </>
  );
};

export default RentalsSkeletonLoading;

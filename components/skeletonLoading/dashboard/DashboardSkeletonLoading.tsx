import { Skeleton } from "@/components/ui/skeleton";

const DashboardSkeletonLoading = () => {
  return (
    <>
      {/* MOBILE */}
      <div className="p-4 py-6 md:hidden">
        <Skeleton className="h-[20px] w-[50px] rounded-sm" />
        <Skeleton className="mt-4 h-[20px] w-[150px] rounded-sm" />
        <Skeleton className="mt-8 h-[20px] w-[300px] rounded-sm" />
        <Skeleton className="mt-4 h-[20px] w-[250px] rounded-sm" />

        <Skeleton className="mt-12 h-[150px] w-full rounded-sm" />
        <Skeleton className="mt-4 h-[150px] w-full rounded-sm" />
        <Skeleton className="mt-4 h-[150px] w-full rounded-sm" />
        <Skeleton className="mt-4 h-[150px] w-full rounded-sm" />
        <Skeleton className="mt-4 h-[150px] w-full rounded-sm" />
        <Skeleton className="mt-4 h-[150px] w-full rounded-sm" />
      </div>

      {/* TABLET */}
      <div className="hidden p-4 py-6 md:block lg:hidden">
        <Skeleton className="h-[20px] w-[50px] rounded-sm" />
        <Skeleton className="mt-4 h-[20px] w-[150px] rounded-sm" />
        <Skeleton className="mt-8 h-[40px] w-[400px] rounded-sm" />
        <Skeleton className="mt-4 h-[30px] w-[250px] rounded-sm" />

        <div className="mt-12 grid grid-cols-3 gap-6">
          <Skeleton className="h-[150px] w-full rounded-lg" />
          <Skeleton className="h-[150px] w-full rounded-lg" />
          <Skeleton className="h-[150px] w-full rounded-lg" />
          <Skeleton className="h-[150px] w-full rounded-lg" />
          <Skeleton className="h-[150px] w-full rounded-lg" />
        </div>

        <Skeleton className="mt-6 h-[250px] w-full rounded-lg" />
      </div>

      {/* LARGE SCREEN */}
      <div className="hidden p-4 py-6 md:hidden lg:block">
        <Skeleton className="h-[20px] w-[50px] rounded-sm" />
        <Skeleton className="mt-4 h-[20px] w-[150px] rounded-sm" />
        <Skeleton className="mt-8 h-[40px] w-[400px] rounded-sm" />
        <Skeleton className="mt-4 h-[30px] w-[250px] rounded-sm" />

        <div className="mt-12 grid grid-cols-3 gap-6">
          <Skeleton className="h-[200px] w-full rounded-lg" />
          <Skeleton className="h-[200px] w-full rounded-lg" />
          <Skeleton className="h-[200px] w-full rounded-lg" />
          <Skeleton className="h-[200px] w-full rounded-lg" />
          <Skeleton className="h-[200px] w-full rounded-lg" />
        </div>

        <Skeleton className="mt-6 h-[200px] w-full rounded-lg" />
      </div>
    </>
  );
};

export default DashboardSkeletonLoading;

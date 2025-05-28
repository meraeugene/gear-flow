import { Skeleton } from "@/components/ui/skeleton";

const ManageCategoriesSkeletonLoading = () => {
  return (
    <>
      {/* MOBILE */}
      <div className="p-4 py-6 md:hidden">
        <Skeleton className="h-[20px] w-[50px] rounded-sm" />
        <Skeleton className="mt-4 h-[20px] w-[150px] rounded-sm" />

        <Skeleton className="mt-8 h-[40px] w-[200px] rounded-sm" />
        <Skeleton className="mt-4 h-[20px] w-[300px] rounded-sm" />

        <Skeleton className="mt-8 h-[35px] w-[100px] rounded-sm" />
        <div className="flex gap-4">
          <Skeleton className="mt-4 h-[35px] w-[70%] rounded-sm" />
          <Skeleton className="mt-4 h-[35px] w-[30%] rounded-sm" />
        </div>
        <Skeleton className="mt-4 h-[500px] w-full rounded-sm" />
      </div>

      {/* TABLET */}
      <div className="hidden p-4 py-6 md:block lg:hidden">
        <Skeleton className="h-[20px] w-[50px] rounded-sm" />
        <Skeleton className="mt-4 h-[20px] w-[150px] rounded-sm" />

        <Skeleton className="mt-8 h-[35px] w-[150px] rounded-sm" />
        <Skeleton className="mt-4 h-[20px] w-[250px] rounded-sm" />

        <Skeleton className="mt-8 h-[35px] w-[150px] rounded-sm" />
        <div className="flex justify-between gap-4">
          <Skeleton className="mt-4 h-[35px] w-[200px] rounded-sm" />
          <Skeleton className="mt-4 h-[35px] w-[100px] rounded-sm" />
        </div>
        <Skeleton className="mt-4 h-[500px] w-full rounded-sm" />
      </div>

      {/* LARGE SCREEN */}
      <div className="hidden p-4 py-6 md:hidden lg:block">
        <Skeleton className="h-[20px] w-[50px] rounded-sm" />
        <Skeleton className="mt-4 h-[20px] w-[150px] rounded-sm" />

        <Skeleton className="mt-8 h-[35px] w-[150px] rounded-sm" />
        <Skeleton className="mt-4 h-[20px] w-[250px] rounded-sm" />

        <Skeleton className="mt-8 h-[35px] w-[120px] rounded-sm" />
        <div className="flex justify-between gap-4">
          <Skeleton className="mt-4 h-[35px] w-[200px] rounded-sm" />
          <Skeleton className="mt-4 h-[35px] w-[100px] rounded-sm" />
        </div>
        <Skeleton className="mt-4 h-[500px] w-full rounded-sm" />
      </div>
    </>
  );
};

export default ManageCategoriesSkeletonLoading;

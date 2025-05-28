import { Skeleton } from "@/components/ui/skeleton";

const ManageUsersSkeletonLoading = () => {
  return (
    <>
      {/* MOBILE */}
      <div className="p-4 py-6 md:hidden">
        <Skeleton className="h-[20px] w-[50px] rounded-sm" />
        <Skeleton className="mt-4 h-[20px] w-[150px] rounded-sm" />

        <Skeleton className="mt-8 h-[30px] w-[80px] rounded-sm" />
        <Skeleton className="mt-2 h-[15px] w-full rounded-sm" />

        <Skeleton className="mt-8 h-[200px] w-full rounded-sm" />
      </div>

      {/* TABLET */}
      <div className="hidden p-4 py-6 md:block lg:hidden">
        <Skeleton className="h-[20px] w-[50px] rounded-sm" />
        <Skeleton className="mt-4 h-[20px] w-[150px] rounded-sm" />

        <Skeleton className="mt-8 h-[30px] w-[150px] rounded-sm" />
        <Skeleton className="mt-2 h-[20px] w-[350px] rounded-sm" />

        <Skeleton className="mt-8 h-[200px] w-full rounded-sm" />
      </div>

      {/* LARGE SCREEN */}
      <div className="hidden p-4 py-6 md:hidden lg:block">
        <Skeleton className="h-[20px] w-[50px] rounded-sm" />
        <Skeleton className="mt-4 h-[20px] w-[150px] rounded-sm" />

        <Skeleton className="mt-8 h-[30px] w-[150px] rounded-sm" />
        <Skeleton className="mt-4 h-[20px] w-[350px] rounded-sm" />

        <Skeleton className="mt-8 h-[250px] w-full rounded-sm" />
      </div>
    </>
  );
};

export default ManageUsersSkeletonLoading;

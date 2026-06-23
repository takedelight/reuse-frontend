import { Skeleton } from "@/src/shared/ui";

export const ChangeAvatarSkeleton = () => {
  return (
    <div className="flex items-center gap-4">
      <div>
        <Skeleton className="size-20" />
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex flex-col sm:flex-row gap-2">
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-8 w-32" />
        </div>
        <Skeleton className="h-8 w-32" />
      </div>
    </div>
  );
};

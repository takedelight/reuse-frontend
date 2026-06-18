import { type User } from "@/src/entity/user";
import { cn } from "@/src/shared/lib";
import { UserAvatar } from "./UserAvatar";

interface UserSummaryProps {
  user: User | null;
  className?: string;
  classNames?: {
    avatar?: string;
    fallback?: string;
    username?: string;
    email?: string;
  };
}

export const UserSummary = ({
  user,
  classNames,
  className = "",
}: UserSummaryProps) => {
  const username = user?.username || "Guest";
  const email = user?.email || "Not authorized";
  const fallback = username.slice(0, 2).toUpperCase();

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <UserAvatar
        avatarUrl={user?.avatarUrl ?? ""}
        fallback={fallback}
        className={cn("size-12", classNames?.avatar)}
        classNames={{ fallback: classNames?.fallback }}
      />
      <div className="flex flex-col text-left">
        <span
          className={cn("font-semibold text-foreground", classNames?.username)}
        >
          {username}
        </span>
        <span
          className={cn("text-muted-foreground text-sm", classNames?.email)}
        >
          {email}
        </span>
      </div>
    </div>
  );
};

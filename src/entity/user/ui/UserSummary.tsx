import { type User } from "@/src/entity/user";
import { UserAvatar } from "./UserAvatar";

interface UserSummaryProps {
  user: User | null;
}

export const UserSummary = ({ user }: UserSummaryProps) => {
  const username = user?.username || "Guest";
  const email = user?.email || "Not authorized";
  const fallback = username.slice(0, 2).toUpperCase();

  return (
    <div className="flex items-center gap-3">
      <UserAvatar
        avatarUrl={user?.avatarUrl ?? ""}
        fallback={fallback}
        className="size-12"
      />
      <div className="flex flex-col text-left">
        <span className="font-semibold text-foreground">{username}</span>
        <span className="text-muted-foreground text-sm">{email}</span>
      </div>
    </div>
  );
};

import { Avatar, AvatarFallback, AvatarImage } from "@/src/shared/ui";

interface UserAvatarProps {
  avatarUrl: string | null;
  fallback?: string;
  className?: string;
}

export const UserAvatar = ({
  avatarUrl,
  fallback,
  className,
}: UserAvatarProps) => {
  return (
    <Avatar className={className}>
      {avatarUrl && <AvatarImage src={avatarUrl} alt="User avatar" />}
      <AvatarFallback>{fallback || "U"}</AvatarFallback>
    </Avatar>
  );
};

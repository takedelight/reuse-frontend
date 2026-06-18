import { Avatar, AvatarFallback, AvatarImage } from "@/src/shared/ui";

interface UserAvatarProps {
  avatarUrl: string | null;
  fallback?: string;
  className?: string;
  classNames?: {
    fallback?: string;
  };
}

export const UserAvatar = ({
  avatarUrl,
  fallback,
  classNames,
  className = "",
}: UserAvatarProps) => {
  return (
    <Avatar className={className}>
      {avatarUrl && <AvatarImage src={avatarUrl} alt="User avatar" />}
      <AvatarFallback className={classNames?.fallback}>
        {fallback || "U"}
      </AvatarFallback>
    </Avatar>
  );
};

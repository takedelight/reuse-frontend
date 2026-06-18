"use client";

import { User, UserAvatar } from "@/src/entity/user";
import { Button, Skeleton, Spinner } from "@/src/shared/ui";
import { useTranslations } from "next-intl";
import { useRef } from "react";
import { useChangeAvatar } from "../model/useChangeAvatar";

interface ChangeAvatarProps {
  user: User | null;
  isLoading: boolean;
}

export const ChangeAvatar = ({
  user,
  isLoading: isUserLoading,
}: ChangeAvatarProps) => {
  const t = useTranslations("profile.settings.profile_info.avatar");
  const inputRef = useRef<HTMLInputElement>(null);

  const { onFileChange, isUploading, deleteAvatar, isDeletingAvatar } =
    useChangeAvatar();

  const fallback = user?.username
    ? user.username.slice(0, 2).toUpperCase()
    : "";

  return (
    <div className="flex items-center gap-4">
      {isUserLoading ? (
        <Skeleton className="size-20 rounded-full" />
      ) : (
        <div className="relative size-20">
          <UserAvatar
            className="size-20"
            classNames={{ fallback: "text-2xl" }}
            avatarUrl={user?.avatarUrl || null}
            fallback={fallback}
          />
          {isUploading && (
            <div className="absolute inset-0 bg-background/60 rounded-full flex items-center justify-center border border-foreground/10">
              <Spinner />
            </div>
          )}
        </div>
      )}

      <div className="flex flex-col gap-2">
        <div className="flex gap-2">
          <Button size="sm" onClick={() => inputRef.current?.click()}>
            {t("upload_button")}
          </Button>
          <Button
            disabled={isUploading || isDeletingAvatar || !user?.avatarUrl}
            size="sm"
            variant="outline"
            onClick={() => deleteAvatar()}
            className="flex items-center justify-center min-w-[80px]"
          >
            {isDeletingAvatar ? (
              <Spinner className="size-4 " />
            ) : (
              t("remove_button")
            )}
          </Button>
        </div>
        <span className="text-xs text-muted-foreground">
          {t("description")}
        </span>
      </div>
      <input
        ref={inputRef}
        className="hidden"
        type="file"
        accept="image/jpeg, image/png, image/gif, image/webp"
        onChange={onFileChange}
        disabled={isUploading || isDeletingAvatar}
      />
    </div>
  );
};

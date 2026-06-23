"use client";

import {
  changeAvatarAction,
  confirmAvatarUpload,
  deleteAvatarAction,
} from "@/src/entity/user";
import { storageService } from "@/src/shared/lib/storage";
import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { ChangeEvent } from "react";
import { toast } from "sonner";

export const useChangeAvatar = () => {
  const t = useTranslations();

  const { mutate: uploadAvatar, isPending: isUploading } = useMutation({
    mutationFn: (file: File) =>
      storageService.createItem(file, changeAvatarAction, confirmAvatarUpload),
    onSuccess: () => {
      toast.success(t("toast.profile.avatar_upload_success"));
    },
    onError: (error) => {
      console.error("Avatar upload failed:", error);
    },
  });

  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      uploadAvatar(file);
    }
  };

  const { mutate: deleteAvatar, isPending: isDeletingAvatar } = useMutation({
    mutationKey: ["delete-avatar"],
    mutationFn: () => storageService.deleteItem(deleteAvatarAction),
    onSuccess: () => {
      toast.success(t("toast.profile.avatar_delete_success"));
    },

    onError: (error) => {
      console.error("Avatar deletion failed:", error);
    },
  });

  return { onFileChange, isUploading, deleteAvatar, isDeletingAvatar };
};

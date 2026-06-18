"use client";

import { API_URL } from "@/src/shared/constants";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { ChangeEvent } from "react";
import { toast } from "sonner";

export const useChangeAvatar = () => {
  const queryClient = useQueryClient();

  const t = useTranslations();

  const { mutate: uploadAvatar, isPending: isUploading } = useMutation({
    mutationFn: async (file: File) => {
      const urlResponse = await fetch(`${API_URL}/user/upload-url`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fileName: file.name,
          contentType: file.type,
        }),
      });

      if (!urlResponse.ok)
        throw new Error("errors.server.avatar_upload_failed");

      const { url, key } = await urlResponse.json();

      const s3Response = await fetch(url, {
        method: "PUT",
        body: file,
        headers: { "Content-Type": file.type },
      });

      if (!s3Response.ok) throw new Error("errors.server.avatar_upload_failed");

      const confirmResponse = await fetch(`${API_URL}/user/confirm`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key }),
      });

      if (!confirmResponse.ok)
        throw new Error("errors.server.avatar_upload_failed");

      await confirmResponse.text();
      return true;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["check-auth"] });
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
    mutationFn: async () => {
      const response = await fetch(`${API_URL}/user/avatar`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("errors.server.avatar_delete_failed");
      }

      await response.text();
      return true;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["check-auth"] });
      toast.success(t("toast.profile.avatar_delete_success"));
    },

    onError: (error) => {
      console.error("Avatar deletion failed:", error);
    },
  });

  return { onFileChange, isUploading, deleteAvatar, isDeletingAvatar };
};

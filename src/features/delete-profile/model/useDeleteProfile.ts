"use client";

import { PAGES_CONFIG } from "@/src/shared/configs/pages";
import { API_URL } from "@/src/shared/constants";
import { useRouter } from "@/src/shared/i18n";
import { QueryClient, useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

export const useDeleteProfile = () => {
  const queryClient = new QueryClient();

  const { push } = useRouter();

  const t = useTranslations("toast.profile");

  const { isPending, mutate } = useMutation({
    mutationKey: ["delete-profile"],
    mutationFn: async () => {
      const response = await fetch(`${API_URL}/user/delete`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to delete profile");
      }
      return await response.text();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["check-auth"] });
      push(PAGES_CONFIG.HOME);
      toast.success(t("account_delete_success"));
    },
  });

  const handleDeleteProfile = () => {
    mutate();
  };

  return {
    isPending,
    handleDeleteProfile,
  };
};

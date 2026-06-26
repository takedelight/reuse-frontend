"use client";

import { deleteProfileAction } from "@/src/entity/user";
import { PAGES_CONFIG } from "@/src/shared/configs/pages";
import { useRouter } from "@/src/shared/i18n";
import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

export const useDeleteProfile = () => {
  const { push } = useRouter();

  const t = useTranslations("toast.profile");

  const { isPending, mutate } = useMutation({
    mutationKey: ["delete-profile"],
    mutationFn: deleteProfileAction,
    onSuccess: () => {
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

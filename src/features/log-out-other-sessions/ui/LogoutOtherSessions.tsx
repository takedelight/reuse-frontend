"use client";

import { deleteOtherSessionsAction } from "@/src/entity/session";
import { Button } from "@/src/shared/ui";
import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

export const LogoutOtherSessions = () => {
  const t = useTranslations();

  const { mutate, isPending } = useMutation({
    mutationKey: ["delete_session"],
    mutationFn: deleteOtherSessionsAction,
    onSuccess: () => {
      toast.success(t("toast.profile.sessions_clear_success"));
    },
  });

  return (
    <Button variant="destructive" disabled={isPending} onClick={() => mutate()}>
      {t("profile.sessions.sign_out_all_other")}
    </Button>
  );
};

"use client";

import { deleteSessionAction } from "@/src/entity/session";
import { Button } from "@/src/shared/ui";
import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

interface DeleteSessionProps {
  sessionId: string;
}

export const DeleteSession = ({ sessionId }: DeleteSessionProps) => {
  const t = useTranslations();

  const { mutate, isPending } = useMutation({
    mutationKey: ["delete_session", sessionId],
    mutationFn: deleteSessionAction,
    onSuccess: () => {
      toast.success(t("toast.profile.sessions_clear_success"));
    },
  });

  return (
    <Button
      variant="destructive"
      disabled={isPending}
      onClick={() => mutate(sessionId)}
    >
      {t("profile.sessions.sign_out")}
    </Button>
  );
};

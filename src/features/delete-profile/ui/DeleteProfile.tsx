"use client";

import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Spinner,
} from "@/src/shared/ui";
import { useTranslations } from "next-intl";
import { useDeleteProfile } from "../model/useDeleteProfile";

export const DeleteProfile = () => {
  const t = useTranslations("profile.settings.danger_zone.delete_account");

  const { handleDeleteProfile, isPending } = useDeleteProfile();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive">{t("submit_button")}</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{t("modal.title")}</DialogTitle>
          <DialogDescription>{t("modal.description")}</DialogDescription>
        </DialogHeader>

        <DialogFooter className="gap-2 sm:gap-0">
          <DialogClose asChild>
            <Button variant="outline">{t("modal.cancel_button")}</Button>
          </DialogClose>
          <Button
            onClick={handleDeleteProfile}
            disabled={isPending}
            variant="destructive"
          >
            {isPending ? <Spinner /> : t("modal.confirm_button")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

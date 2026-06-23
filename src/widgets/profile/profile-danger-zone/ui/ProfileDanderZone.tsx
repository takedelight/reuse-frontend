import { DeleteProfile } from "@/src/features/delete-profile/ui/DeleteProfile";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/shared/ui";
import { useTranslations } from "next-intl";

export const ProfileDangerZone = () => {
  const t = useTranslations();

  return (
    <Card className="border-destructive/30 bg-destructive/5">
      <CardHeader>
        <CardTitle className="text-destructive">
          {t("profile.settings.danger_zone.title")}
        </CardTitle>
        <CardDescription>
          {t("profile.settings.danger_zone.description")}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex flex-col gap-0.5">
            <span className="text-sm font-semibold text-foreground">
              {t("profile.settings.danger_zone.delete_account.label")}
            </span>
            <span className="text-xs text-muted-foreground">
              {t("profile.settings.danger_zone.delete_account.description")}
            </span>
          </div>
          <DeleteProfile />
        </div>
      </CardContent>
    </Card>
  );
};

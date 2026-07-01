import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Label,
} from "@/src/shared/ui";
import { RiShieldKeyholeLine } from "@remixicon/react";
import { getTranslations } from "next-intl/server";

export const TwoFactor = async () => {
  const t = await getTranslations("profile.security.two_factor");

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("title")}</CardTitle>
        <CardDescription>{t("description")}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="flex items-center justify-between rounded-lg border p-4">
          <div className="flex flex-col gap-0.5">
            <Label htmlFor="2fa-email" className="flex items-center gap-2">
              <RiShieldKeyholeLine className="text-muted-foreground" />
              {t("app_email_codes.label")}
            </Label>
            <span className="text-xs text-muted-foreground">
              {t("app_email_codes.description")}
            </span>
          </div>
          <Button variant="outline">{t("app_email_codes.enable")}</Button>
        </div>
      </CardContent>
    </Card>
  );
};

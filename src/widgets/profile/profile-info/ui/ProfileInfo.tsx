"use client";

import { useAuth } from "@/src/core/auth";
import { ChangeAvatar } from "@/src/features/change-avatar";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Input,
  Label,
  Textarea,
} from "@/src/shared/ui";
import { useTranslations } from "next-intl";

export const ProfileInfo = () => {
  const t = useTranslations("profile.settings.profile_info");
  const { values } = useAuth();

  const { user, isLoading } = values;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("title")}</CardTitle>
        <CardDescription>{t("description")}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        <ChangeAvatar user={user} isLoading={isLoading} />

        <form
          className="flex flex-col gap-4"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="username">Username</Label>
              <Input id="username" placeholder="anniko" defaultValue="anniko" />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="example@gmail.com"
                defaultValue="nikolaenkooleksiy@gmail.com"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              placeholder={t("form.bio_placeholder")}
              className="resize-none h-28"
            />
            <span className="text-xs text-muted-foreground text-right">
              0 / 300 characters
            </span>
          </div>

          <div className="flex justify-end">
            <Button type="submit">Save Changes</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

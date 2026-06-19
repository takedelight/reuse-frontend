import { getUserProfile } from "@/src/entity/user";
import { ChangeAvatar } from "@/src/features/change-avatar";
import { UpdateProfileForm } from "@/src/features/update-profile-info";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/shared/ui";
import { getTranslations } from "next-intl/server";

export const ProfileInfo = async () => {
  const t = await getTranslations("profile.settings.profile_info");

  const user = await getUserProfile();

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("title")}</CardTitle>
        <CardDescription>{t("description")}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        <ChangeAvatar user={user} />

        <UpdateProfileForm initialUser={user} />
      </CardContent>
    </Card>
  );
};

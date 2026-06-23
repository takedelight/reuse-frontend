import {
  ChangeAvatar,
  ChangeAvatarSkeleton,
} from "@/src/features/change-avatar";
import { UpdateProfileForm } from "@/src/features/update-profile-info";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/shared/ui";
import { getTranslations } from "next-intl/server";
import { cookies } from "next/headers";
import { Suspense } from "react";

export const ProfileInfo = async () => {
  const t = await getTranslations("profile.settings.profile_info");

  const user = (await cookies()).get("user")?.value
    ? JSON.parse((await cookies()).get("user")?.value as string)
    : null;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("title")}</CardTitle>
        <CardDescription>{t("description")}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        <Suspense fallback={<ChangeAvatarSkeleton />}>
          <ChangeAvatar user={user} />
        </Suspense>

        <UpdateProfileForm initialUser={user} />
      </CardContent>
    </Card>
  );
};

"use client";

import { User, UserAvatar } from "@/src/entity/user";
import { PAGES_CONFIG } from "@/src/shared/configs/pages";
import { Link } from "@/src/shared/i18n";
import { Button } from "@/src/shared/ui";
import { useTranslations } from "next-intl";

interface HeaderAuthProps {
  user: User | null;
}

export const HeaderAuth = ({ user }: HeaderAuthProps) => {
  const t = useTranslations();

  if (user) {
    return (
      <Link
        href={PAGES_CONFIG.PROFILE.HOME}
        className="hidden lg:flex items-center gap-2 rounded-full outline-none"
      >
        <UserAvatar
          avatarUrl={user.avatarUrl}
          fallback={user.username.slice(0, 2).toUpperCase()}
        />
      </Link>
    );
  }

  return (
    <Button variant="ghost" className="hidden lg:flex" asChild>
      <Link href={PAGES_CONFIG.AUTH.LOGIN}>{t("auth.links.login")}</Link>
    </Button>
  );
};

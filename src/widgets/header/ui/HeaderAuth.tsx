"use client";

import { useAuth } from "@/src/core/auth";
import { User, UserAvatar } from "@/src/entity/user";
import { PAGES_CONFIG } from "@/src/shared/configs/pages";
import { Link } from "@/src/shared/i18n";
import { Button, Skeleton } from "@/src/shared/ui";
import { useTranslations } from "next-intl"; // Додали імпорт хука перекладів

interface HeaderAuthProps {
  initialUser: User | null;
}

export const HeaderAuth = ({ initialUser }: HeaderAuthProps) => {
  const t = useTranslations();

  const {
    values: { user: clientUser, isAuthenticated, isLoading },
  } = useAuth();

  const currentUser = clientUser || initialUser;
  const isAuth = isAuthenticated || !!initialUser;

  if (isLoading) {
    return <Skeleton className="size-8  rounded-full" />;
  }

  return (
    <>
      {isAuth && currentUser ? (
        <Link
          href={PAGES_CONFIG.PROFILE.HOME}
          className="hidden lg:flex items-center gap-2 rounded-full outline-none"
        >
          <UserAvatar
            avatarUrl={currentUser.avatarUrl}
            fallback={currentUser.username.slice(0, 2).toUpperCase()}
          />
        </Link>
      ) : (
        <Button variant="ghost" className="hidden lg:flex" asChild>
          <Link href={PAGES_CONFIG.AUTH.LOGIN}>{t("auth.links.login")}</Link>
        </Button>
      )}
    </>
  );
};

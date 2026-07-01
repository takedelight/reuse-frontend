"use client";

import { User, UserAvatar } from "@/src/entity/user";
import { SignOut } from "@/src/features/sign-out";
import { PAGES_CONFIG } from "@/src/shared/configs/pages";
import { Link } from "@/src/shared/i18n";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/src/shared/ui/dropdown-menu";
import {
  RiLogoutBoxRLine,
  RiSettings4Line,
  RiUserLine,
} from "@remixicon/react";
import { useTranslations } from "next-intl";

interface UserMenuProps {
  user: User;
}

export const UserMenu = ({ user }: UserMenuProps) => {
  const t = useTranslations();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="hidden lg:flex items-center gap-2 rounded-full outline-none">
        <UserAvatar
          avatarUrl={user.avatarUrl}
          fallback={user.username?.slice(0, 2).toUpperCase()}
        />
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem asChild>
          <Link href={PAGES_CONFIG.PROFILE.HOME} className="gap-2">
            <RiUserLine className="size-4" />
            {t("profile.aside.links.profile")}
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link href={PAGES_CONFIG.PROFILE.SETTINGS} className="gap-2">
            <RiSettings4Line className="size-4" />
            {t("profile.aside.links.settings")}
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem asChild variant="destructive">
          <SignOut
            variant="ghost"
            className="w-full justify-start gap-2 px-1.5"
          >
            <RiLogoutBoxRLine className="size-4" />
            {t("auth.links.logout")}
          </SignOut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

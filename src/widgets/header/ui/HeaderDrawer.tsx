"use client";

import { Link } from "@/src/shared/i18n";
import {
  RiCloseLine,
  RiLogoutBoxRLine,
  RiMenuLine,
  RiMoonClearLine,
} from "@remixicon/react";
import { useState } from "react";

import { useTheme } from "next-themes";

import {
  Avatar,
  AvatarImage,
  Button,
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/src/shared/ui";

import { PAGES_CONFIG } from "@/src/shared/configs/pages";
import { DrawerClose } from "@/src/shared/ui/drawer";
import { Label } from "@/src/shared/ui/label";
import { Switch } from "@/src/shared/ui/switch";
import {
  DRAWER_ACCOUNT_LINKS,
  HEADER_NAV_LINKS,
} from "@/src/widgets/header/model/const";
import { useTranslations } from "next-intl";

const mockUser = {
  id: "usr_9481024",
  username: "johndoe",
  email: "john.doe@example.com",
  avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=johndoe",
  createdAt: "2026-03-15T10:30:00Z",
};

const islogb = false;

export const HeaderDrawer = () => {
  const t = useTranslations();

  const { theme, setTheme } = useTheme();

  const [isOpen, setOpen] = useState(false);
  const [isDark, setDark] = useState(theme === "dark");

  return (
    <Drawer direction="right" open={isOpen} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button
          className="lg:hidden"
          aria-label="Open menu"
          variant="ghost"
          size="icon"
        >
          <RiMenuLine className="size-5" />
        </Button>
      </DrawerTrigger>

      <DrawerContent className="flex w-full! max-w-sm flex-col">
        <DrawerHeader className="border-b">
          <DrawerTitle className="sr-only">Menu Drawer</DrawerTitle>

          <div className="flex items-start justify-between">
            {islogb ? (
              <div className="flex items-center gap-3">
                <Avatar className="size-12">
                  <AvatarImage
                    src={mockUser.avatarUrl}
                    alt={mockUser.username}
                  />
                </Avatar>

                <div className="flex flex-col">
                  <span className="font-semibold">{mockUser.username}</span>

                  <span className="text-muted-foreground text-sm">
                    {mockUser.email}
                  </span>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <div className="flex flex-col text-left">
                  <span className="font-semibold text-foreground text-sm tracking-wide">
                    {t("header.drawer.header.title")}
                  </span>
                  <span className="text-xs text-muted-foreground font-medium">
                    {t("header.drawer.header.subtitle")}
                  </span>
                </div>
              </div>
            )}
            <DrawerClose asChild>
              <Button aria-label="Close menu" variant="ghost" size="icon">
                <RiCloseLine className="size-5" />
              </Button>
            </DrawerClose>
          </div>
        </DrawerHeader>

        <nav className="flex-1 overflow-y-auto p-4">
          {islogb && (
            <div className="mb-6">
              <span className="text-xs font-bold uppercase tracking-wider text-foreground/50">
                {t("header.account_nav.title")}
              </span>

              <ul className="flex flex-col gap-1">
                {DRAWER_ACCOUNT_LINKS.map((link) => {
                  const Icon = link.icon;

                  return (
                    <li className={"flex-1 "} key={link.href}>
                      <Button
                        variant="ghost"
                        className="justify-start w-full gap-3"
                        asChild
                      >
                        <DrawerClose asChild>
                          <Link href={link.href}>
                            <Icon className="size-4" />
                            {t(link.key)}
                          </Link>
                        </DrawerClose>
                      </Button>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}

          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-foreground/50">
              {t("header.nav.title")}
            </span>

            <ul className="flex flex-col gap-1">
              {HEADER_NAV_LINKS.map((link) => {
                const Icon = link.icon;

                return (
                  <li className={"flex-1"} key={link.href}>
                    <Button
                      variant="ghost"
                      className="justify-start w-full gap-3"
                      asChild
                    >
                      <DrawerClose asChild>
                        <Link href={link.href}>
                          <Icon className="size-4" />
                          {t(link.key)}
                        </Link>
                      </DrawerClose>
                    </Button>
                  </li>
                );
              })}
            </ul>
          </div>
        </nav>

        <div className="px-4">
          <Label
            htmlFor="theme-switch"
            className="mb-4 flex cursor-pointer items-center justify-between rounded-lg border p-4"
          >
            <div className="flex items-center gap-3">
              <div className="bg-muted flex size-9 items-center justify-center rounded-md">
                <RiMoonClearLine className="size-4" />
              </div>

              <div className="flex flex-col">
                <span className="text-sm font-medium">
                  {t("header.drawer.appereance.title")}
                </span>

                <span className="text-muted-foreground text-xs">
                  {t("header.drawer.appereance.text")}
                </span>
              </div>
            </div>

            <Switch
              id="theme-switch"
              checked={isDark}
              onCheckedChange={(checked) => {
                setDark(checked);
                setTheme(checked ? "dark" : "light");
              }}
            />
          </Label>
        </div>

        <div className="border-t p-4">
          {islogb ? (
            <Button variant="destructive" className="w-full gap-2">
              <RiLogoutBoxRLine className="size-4" />
              {t("auth.links.logout")}
            </Button>
          ) : (
            <div className="flex flex-col gap-2">
              <Button asChild>
                <Link href={PAGES_CONFIG.AUTH.LOGIN}>
                  {t("auth.links.login")}
                </Link>
              </Button>

              <Button variant="outline" asChild>
                <Link href={PAGES_CONFIG.AUTH.REGISTER}>
                  {t("auth.links.register")}
                </Link>
              </Button>
            </div>
          )}
        </div>
      </DrawerContent>
    </Drawer>
  );
};

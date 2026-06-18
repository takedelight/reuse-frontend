"use client";

import { useAuth } from "@/src/core/auth";
import { UserAvatar } from "@/src/entity/user";
import { ToggleLanguage } from "@/src/features/toggle-language";
import { PAGES_CONFIG } from "@/src/shared/configs/pages";
import { Link } from "@/src/shared/i18n";
import { Button, Separator } from "@/src/shared/ui";
import { HEADER_NAV_LINKS } from "@/src/widgets/header/model/const";
import { HeaderDrawer } from "@/src/widgets/header/ui/HeaderDrawer";
import { ToggleTheme } from "@/src/widgets/header/ui/ToggleTheme";
import { useTranslations } from "next-intl";

export const Header = () => {
  const t = useTranslations();

  const {
    values: { user, isAuthenticated },
  } = useAuth();

  return (
    <header className=" p-2 mb-5">
      <nav className="container mx-auto flex items-center justify-between border border-foreground/10 bg-background/95 backdrop-blur-md px-4 py-3 rounded-2xl shadow-sm">
        <Link
          href={PAGES_CONFIG.HOME}
          className="font-bold text-xl tracking-wide group"
        >
          <span className="text-primary transition-colors">re</span>
          <span className="text-muted-foreground mx-0.5 transition-colors">
            :
          </span>
          <span className="text-foreground transition-colors">use</span>
        </Link>

        <ul className="hidden md:flex items-center gap-10">
          {HEADER_NAV_LINKS.map((link) => {
            const Icon = link.icon;

            return (
              <li key={link.key} className="relative group list-none">
                <Link
                  className="text-foreground/80 flex items-center gap-1 hover:text-primary transition-colors ease-in-out py-1"
                  href={link.href}
                >
                  <Icon className="size-4" />
                  {t(link.key)}
                </Link>
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary scale-x-0 transition-transform duration-300 ease-in-out group-hover:scale-x-100 origin-center"></span>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <ToggleLanguage />
          <ToggleTheme />

          <Separator orientation="vertical" className="h-6" />

          {isAuthenticated && user ? (
            <Link
              href={PAGES_CONFIG.PROFILE.HOME}
              className="hidden lg:flex items-center gap-2 rounded-full outline-none"
            >
              <UserAvatar
                avatarUrl={user.avatarUrl}
                fallback={user.username.slice(0, 2).toUpperCase()}
              />
            </Link>
          ) : (
            <Button variant="ghost" className="hidden lg:flex" asChild>
              <Link href={PAGES_CONFIG.AUTH.LOGIN}>
                {t("auth.links.login")}
              </Link>
            </Button>
          )}

          <HeaderDrawer />
        </div>
      </nav>
    </header>
  );
};

/*
import { cn } from "@/src/shared/lib";
import { Button, Separator } from "@/src/shared/ui";
import { HEADER_NAV_LINKS } from "@/src/widgets/header/model/const";
import { HeaderDrawer } from "@/src/widgets/header/ui/HeaderDrawer";
import { ToggleTheme } from "@/src/widgets/header/ui/ToggleTheme";
import { useTranslations } from "next-intl";

import { useAuth } from "@/src/core/auth";
import { UserAvatar } from "@/src/entity/user";
import { ToggleLanguage } from "@/src/features/toggle-language";
import { PAGES_CONFIG } from "@/src/shared/configs/pages";
import { Link, usePathname } from "@/src/shared/i18n";
import { useEffect, useState } from "react";

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const t = useTranslations();

  const {
    values: { user, isAuthenticated },
  } = useAuth();

  const pathname = usePathname();

  const isMoved = pathname === PAGES_CONFIG.HOME;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={cn(isMoved && "sticky top-0 px-1 z-50 py-4")}>
      <nav
        className={cn(
          "container  py-3 transition-all ease-in-out border border-foreground/10 bg-background/60 backdrop-blur-3xl px-4 opacity-80 rounded-2xl mx-auto flex items-center justify-between",
          isScrolled && "sm:w-200",
        )}
      >
        <Link
          href={PAGES_CONFIG.HOME}
          className="font-bold text-xl tracking-wide group"
        >
          <span className="text-primary transition-colors">re</span>
          <span className="text-muted-foreground mx-0.5 transition-colors">
            :
          </span>
          <span className="text-foreground transition-colors">use</span>
        </Link>

        <ul className="hidden md:flex items-center gap-10">
          {HEADER_NAV_LINKS.map((link) => {
            const Icon = link.icon;

            return (
              <li key={link.key} className="relative group list-none">
                <Link
                  className="text-foreground/80 flex items-center gap-1 hover:text-primary  transition-colors ease-in-out  py-1"
                  href={link.href}
                >
                  <Icon className="size-4" />
                  {t(link.key)}
                </Link>
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary scale-x-0 transition-transform duration-300 ease-in-out group-hover:scale-x-100 origin-center"></span>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <ToggleLanguage />
          <ToggleTheme />

          <Separator orientation="vertical" className="self-center-safe" />

          {isAuthenticated && user ? (
            <Link
              href={PAGES_CONFIG.PROFILE.HOME}
              className="hidden lg:flex items-center gap-2"
            >
              {" "}
              <UserAvatar
                avatarUrl={user.avatarUrl}
                fallback={user.username.slice(0, 2).toUpperCase()}
              />
            </Link>
          ) : (
            <Button variant="ghost" className="hidden lg:flex" asChild>
              <Link href={PAGES_CONFIG.AUTH.LOGIN}>
                {t("auth.links.login")}
              </Link>
            </Button>
          )}

          <HeaderDrawer />
        </div>
      </nav>
    </header>
  );
};
*/

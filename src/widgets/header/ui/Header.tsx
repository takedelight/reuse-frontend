"use client";

import { cn } from "@/src/shared/lib";
import { Button } from "@/src/shared/ui/button";
import { HEADER_NAV_LINKS } from "@/src/widgets/header/model/const";
import { HeaderDrawer } from "@/src/widgets/header/ui/HeaderDrawer";
import { ToggleTheme } from "@/src/widgets/header/ui/ToggleTheme";
import { useTranslations } from "next-intl";

import { Link } from "@/src/shared/i18n";
import { useEffect, useState } from "react";

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const t = useTranslations();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="sticky top-0 px-2 z-50 py-4">
      <nav
        className={cn(
          "container  py-3 transition-all ease-in-out border border-foreground/10 bg-background/60 backdrop-blur-2xl rounded-2xl mx-auto px-2 flex items-center justify-between",
          isScrolled && "sm:w-200",
        )}
      >
        <Link href="/" className="font-bold text-xl tracking-wide group">
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
          <ToggleTheme />

          <Button variant="ghost" className="hidden lg:flex" asChild>
            <Link href={"/login"}>{t("auth.links.login")}</Link>
          </Button>

          <HeaderDrawer />
        </div>
      </nav>
    </header>
  );
};

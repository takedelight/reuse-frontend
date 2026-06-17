"use client";

import { PAGES_CONFIG } from "@/src/shared/configs/pages";
import { Link } from "@/src/shared/i18n";
import { Button } from "@/src/shared/ui";
import { RiDiscordFill, RiGithubFill, RiTelegram2Fill } from "@remixicon/react";
import { useTranslations } from "next-intl";
import { FOOTER_LEGAL_LINKS, FOOTER_NAV_LINKS } from "../model/const";

export const Footer = () => {
  const t = useTranslations("footer");

  return (
    <footer className="sticky bottom-0 px-1 z-50 py-4 w-full ">
      <nav className="container border border-foreground/10 bg-background/60 backdrop-blur-3xl p-4  opacity-90 rounded-2xl mx-auto flex flex-col md:flex-row md:items-start justify-between  gap-8 md:gap-4">
        <div className="max-w-sm flex flex-col gap-4">
          <Link
            href={PAGES_CONFIG.HOME}
            className="font-bold text-xl tracking-wide inline-block"
          >
            <span className="text-primary">re</span>
            <span className="text-muted-foreground mx-0.5">:</span>
            <span className="text-foreground">use</span>
          </Link>

          <p className="text-sm text-muted-foreground leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quia
            nesciunt animi, voluptates perspiciatis provident tempore.
          </p>

          <ul className="flex items-center gap-4">
            {[
              { icon: RiDiscordFill, href: "https://discord.gg/..." },
              { icon: RiTelegram2Fill, href: "https://t.me/..." },
              { icon: RiGithubFill, href: "https://github.com/..." },
            ].map((social, idx) => {
              const Icon = social.icon;
              return (
                <li key={idx}>
                  <Button asChild variant="outline">
                    <Link
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Icon className="size-5" />
                    </Link>
                  </Button>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="grid grid-cols-2  gap-10">
          <div className="flex flex-col gap-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-foreground/50">
              {t("nav.links.title")}
            </h3>
            <ul className="flex flex-col gap-2.5">
              {FOOTER_NAV_LINKS.map((link) => (
                <li key={link.key}>
                  <Link
                    href={link.href}
                    className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors cursor-pointer"
                  >
                    {t(link.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-foreground/50">
              {t("nav.legal.title")}
            </h3>
            <ul className="flex flex-col gap-2.5">
              {FOOTER_LEGAL_LINKS.map((link) => (
                <li key={link.key}>
                  <Link
                    href={link.href}
                    className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors cursor-pointer"
                  >
                    {t(link.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </footer>
  );
};

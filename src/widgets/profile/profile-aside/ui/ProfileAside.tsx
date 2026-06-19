"use client";

import { Link, usePathname } from "@/src/shared/i18n";
import { cn } from "@/src/shared/lib";
import { Button, ScrollArea, ScrollBar } from "@/src/shared/ui";
import { useTranslations } from "next-intl";
import { ASIDE_LINKS } from "../model/const";

export const ProfileAside = () => {
  const t = useTranslations();

  const pathname = usePathname();

  return (
    <aside className="xl:sticky top-24 col-span-2 border-foreground/10 h-fit   bg-card  border rounded-xl">
      <ScrollArea className="w-full">
        <ul className="flex p-2 xl:p-0 w-full  xl:flex-col xl:xl:items-stretch items-center gap-2">
          {ASIDE_LINKS.map((link) => {
            const Icon = link.icon;

            const isActive = pathname === link.href;

            return (
              <li className="flex-1" key={link.href}>
                <Button
                  className={cn(
                    "w-full justify-start gap-3 transition-colors  hover:text-primary",
                    isActive && "text-primary",
                  )}
                  asChild
                  variant="ghost"
                >
                  <Link href={link.href}>
                    <Icon className="size-4 opacity-80 group-hover:opacity-100" />
                    <span className="text-sm font-medium">{t(link.key)}</span>
                  </Link>
                </Button>
              </li>
            );
          })}
        </ul>

        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </aside>
  );
};

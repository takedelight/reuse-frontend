"use client";

import { usePathname, useRouter } from "@/src/shared/i18n";
import { Button } from "@/src/shared/ui";
import { useLocale } from "next-intl";

export const ToggleLanguage = () => {
  const locale = useLocale() as "en" | "uk";
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="flex items-center gap-1 p-1 rounded-xl h-9 select-none">
      <Button
        variant={locale === "uk" ? "default" : "ghost"}
        size="sm"
        onClick={() => {
          if (locale === "uk") return;
          router.replace(pathname, {
            locale: "uk",
            scroll: false,
          });
        }}
        className={`h-7 px-2  text-xs font-bold transition-colors cursor-pointer rounded-lg ${locale !== "uk" && "bg-muted"}`}
      >
        UK
      </Button>

      <span className="h-4 w-px bg-foreground/15" />

      <Button
        variant={locale === "en" ? "default" : "ghost"}
        size="sm"
        onClick={() => {
          if (locale === "en") return;
          router.replace(pathname, {
            locale: "en",
            scroll: false,
          });
        }}
        className={`h-7 px-2 text-xs font-bold transition-colors cursor-pointer rounded-lg `}
      >
        EN
      </Button>
    </div>
  );
};

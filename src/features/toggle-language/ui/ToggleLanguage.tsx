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
        variant="ghost"
        size="sm"
        onClick={() => {
          if (locale === "uk") return;
          router.replace(pathname, {
            locale: "uk",
            scroll: false,
          });
        }}
        className={`h-7 px-2 text-xs font-bold transition-colors cursor-pointer rounded-lg ${
          locale === "uk"
            ? "text-primary-foreground bg-primary shadow-2xs"
            : "text-muted-foreground/60 hover:text-foreground"
        }`}
      >
        UK
      </Button>

      <span className="h-4 w-px bg-foreground/15" />

      <Button
        variant="ghost"
        size="sm"
        onClick={() => {
          if (locale === "en") return;
          router.replace(pathname, {
            locale: "en",
            scroll: false,
          });
        }}
        className={`h-7 px-2 text-xs font-bold transition-colors cursor-pointer rounded-lg ${
          locale === "en"
            ? "text-primary-foreground bg-primary shadow-2xs"
            : "text-muted-foreground/60 hover:text-foreground"
        }`}
      >
        EN
      </Button>
    </div>
  );
};

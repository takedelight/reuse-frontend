import { defineRouting } from "next-intl/routing";

export type Locale = "en" | "uk";

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ["en", "uk"],

  // Used when no locale matches
  defaultLocale: "uk",
  localePrefix: "as-needed",
});

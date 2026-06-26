import { ThemeProvider } from "@/src/core/theme";
import { routing } from "@/src/shared/i18n/routing";
import { cn } from "@/src/shared/lib";
import { Toaster } from "@/src/shared/ui";
import type { Metadata } from "next";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { Onest, Space_Grotesk } from "next/font/google";
import { notFound } from "next/navigation";
import { QueryProvider } from "../providers/query.provider";
import "./globals.css";

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

const onest = Onest({
  subsets: ["cyrillic"],
  variable: "--font-onest",
});

export const metadata: Metadata = {
  title: {
    template: "%s | re:use",
    default: "re:use",
  },
  description: "Reuse app",
};

export default async function RootLayout({ children, params }: LayoutProps) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const fontClass = locale === "en" ? "font-space-grotesk" : "font-onest";

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={cn(
        locale === "en" ? spaceGrotesk.variable : onest.variable,
        fontClass,
      )}
    >
      <body className="h-screen w-full bg-background text-foreground antialiased flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
        >
          <NextIntlClientProvider>
            <QueryProvider>
              <Toaster />
              {children}
            </QueryProvider>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

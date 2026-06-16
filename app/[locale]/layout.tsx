import { ThemeProvider } from "@/src/core/theme";
import { routing } from "@/src/shared/i18n/routing";
import { cn } from "@/src/shared/lib";
import { Header } from "@/src/widgets/header";
import type { Metadata } from "next";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { Onest, Space_Grotesk } from "next/font/google";
import { notFound } from "next/navigation";
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

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={cn("h-full", spaceGrotesk.variable, onest.variable)}
    >
      <body className="min-h-full    flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
        >
          <NextIntlClientProvider>
            <Header />
            <main className={"flex-1"}>{children}</main>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

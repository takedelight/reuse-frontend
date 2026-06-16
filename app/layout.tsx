import type { Metadata } from "next";
import { Onest, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/src/core/theme";
import { Header } from "@/src/widgets/header";
import { cn } from "@/src/shared/lib";
import { ReactNode } from "react";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html
      lang="uk"
      suppressHydrationWarning
      className={cn("h-full", spaceGrotesk.variable, onest.variable)}
    >
      <body className="min-h-full    flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
        >
          <Header />
          <main className={"flex-1"}>{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}

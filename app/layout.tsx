import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/src/core/theme";
import { Header } from "@/src/widgets/header";
import { cn } from "@/src/shared/lib";
import { ReactNode } from "react";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans",
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
      lang="en"
      suppressHydrationWarning
      className={cn("h-full", spaceGrotesk.variable)}
    >
      <body className="min-h-full    flex flex-col">
        <ThemeProvider
          attribute="class"
          disableTransitionOnChange
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

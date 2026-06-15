"use client";

import { ToggleTheme } from "@/src/widgets/header/ui/ToggleTheme";
import Link from "next/link";
import { Button } from "@/src/shared/ui/button";
import { useEffect, useState } from "react";
import { cn } from "@/src/shared/lib";
import { RiMenuLine } from "@remixicon/react";

const LINKS = ["Link 1", "Link 2", "Link 3", "Link 4"];

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

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

        <ul className="hidden sm:flex items-center gap-10">
          {LINKS.map((link) => (
            <li key={link} className="relative group list-none">
              <Link
                className="text-foreground/80 hover:text-primary transition-colors ease-in-out block py-1"
                href={link}
              >
                {link}
              </Link>
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary scale-x-0 transition-transform duration-300 ease-in-out group-hover:scale-x-100 origin-center"></span>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <ToggleTheme />
          <Button variant="ghost" className="hidden" asChild>
            <Link href={"/login"}>
              <span className="hidden">Login</span>
            </Link>
          </Button>

          <Button variant="ghost">
            <RiMenuLine />
          </Button>
        </div>
      </nav>
    </header>
  );
};

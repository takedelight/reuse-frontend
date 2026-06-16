"use client";

import { Button } from "@/src/shared/ui";
import { useTheme } from "next-themes";
import { RiMoonLine, RiSunLine } from "@remixicon/react";

export const ToggleTheme = () => {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      className="hidden lg:block"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      {theme === "light" ? <RiSunLine /> : <RiMoonLine />}
    </Button>
  );
};

import { getCurrentUser } from "@/src/entity/user";
import { ToggleLanguage } from "@/src/features/toggle-language";
import { Link } from "@/src/shared/i18n";
import { Logo } from "@/src/shared/ui";
import { HEADER_NAV_LINKS } from "@/src/widgets/header/model/const";
import { HeaderDrawer } from "@/src/widgets/header/ui/HeaderDrawer";
import { ToggleTheme } from "@/src/widgets/header/ui/ToggleTheme";
import { getTranslations } from "next-intl/server";
import { HeaderAuth } from "./HeaderAuth";

export const Header = async () => {
  const t = await getTranslations();

  const user = await getCurrentUser();
  return (
    <header className=" p-2 mb-5">
      <nav className="container mx-auto flex items-center justify-between border  dark:bg-background/95 border-card bg-white backdrop-blur-md px-4 py-3 rounded-2xl ">
        <Logo />

        <ul className="hidden md:flex items-center gap-10">
          {HEADER_NAV_LINKS.map((link) => {
            const Icon = link.icon;

            return (
              <li key={link.key} className="relative group list-none">
                <Link
                  className="text-foreground/80 flex items-center gap-1 hover:text-primary transition-colors ease-in-out py-1"
                  href={link.href}
                >
                  <Icon className="size-4" />
                  {t(link.key)}
                </Link>
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary scale-x-0 transition-transform duration-300 ease-in-out group-hover:scale-x-100 origin-center"></span>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-4">
          <ToggleLanguage />
          <ToggleTheme />

          <HeaderAuth user={user} />

          <HeaderDrawer />
        </div>
      </nav>
    </header>
  );
};

import { User } from "@/src/entity/user";
import { PAGES_CONFIG } from "@/src/shared/configs/pages";
import { Link } from "@/src/shared/i18n";
import { Button } from "@/src/shared/ui";
import { getTranslations } from "next-intl/server";
import { UserMenu } from "./UserMenu";

interface HeaderAuthProps {
  user: User | null;
}

export const HeaderAuth = async ({ user }: HeaderAuthProps) => {
  const t = await getTranslations();

  if (user) {
    return <UserMenu user={user} />;
  }

  return (
    <Button variant="ghost" className="hidden lg:flex" asChild>
      <Link href={PAGES_CONFIG.AUTH.LOGIN}>{t("auth.links.login")}</Link>
    </Button>
  );
};

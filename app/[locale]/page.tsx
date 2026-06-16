import { useTranslations } from "next-intl";

export default function HomePage() {
  const t = useTranslations("HomePage");
  return (
    <section className="container mx-auto px-2">
      <h1>{t("title")}</h1>
    </section>
  );
}

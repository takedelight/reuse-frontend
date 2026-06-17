import { PAGES_CONFIG } from "@/src/shared/configs/pages";
import { Link } from "@/src/shared/i18n";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Checkbox,
  Field,
  FieldContent,
  FieldGroup,
  FieldLabel,
  FieldSet,
  Input,
  Label,
} from "@/src/shared/ui";
import { RiGithubFill, RiGoogleFill } from "@remixicon/react";
import { useTranslations } from "next-intl";

export const LoginCard = () => {
  const t = useTranslations("auth.login_page");

  return (
    <Card className="w-75 sm:w-150">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">{t("title")}</CardTitle>
        <CardDescription>{t("description")}</CardDescription>
      </CardHeader>

      <CardContent className="space-y-10 mt-6">
        <div className="grid sm:grid-cols-2 gap-4">
          <Button className="w-full" variant="outline">
            <RiGoogleFill />
            {t("oauth.google")}
          </Button>

          <Button className="w-full" variant="outline">
            <RiGithubFill />
            {t("oauth.github")}
          </Button>
        </div>

        <div className="h-px w-full relative bg-secondary">
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-card px-2 uppercase text-sm text-muted-foreground">
            {t("oauth.divider")}
          </span>
        </div>

        <form>
          <FieldSet>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">{t("form.email_label")}</FieldLabel>
                <FieldContent>
                  <Input id="email" placeholder={t("form.email_placeholder")} />
                </FieldContent>
              </Field>

              <Field>
                <div className="flex items-center justify-between mb-1">
                  <FieldLabel htmlFor="password">
                    {t("form.password_label")}
                  </FieldLabel>
                  <Link
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    href="/"
                  >
                    {t("form.forgot_password_link")}
                  </Link>
                </div>
                <FieldContent>
                  <Input
                    id="password"
                    type="password"
                    placeholder={t("form.password_placeholder")}
                  />
                </FieldContent>
              </Field>

              <Field orientation="horizontal" className="items-center gap-2">
                <Checkbox id="remember-me" />
                <Label
                  htmlFor="remember-me"
                  className="cursor-pointer select-none"
                >
                  {t("form.remember_me")}
                </Label>
              </Field>
            </FieldGroup>
          </FieldSet>
        </form>
      </CardContent>

      <CardFooter className="flex flex-col items-center gap-4">
        <Button className="w-full">{t("form.submit_button")}</Button>
        <span className="text-sm text-muted-foreground">
          {t("footer.dont_have_account")}{" "}
          <Link
            href={PAGES_CONFIG.AUTH.REGISTER}
            className="text-primary hover:underline"
          >
            {t("footer.sign_up_link")}
          </Link>
        </span>
      </CardFooter>
    </Card>
  );
};

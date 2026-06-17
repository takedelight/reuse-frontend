"use client";

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
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
  Input,
  Label,
} from "@/src/shared/ui";
import { RiGithubFill, RiGoogleFill } from "@remixicon/react";
import { useTranslations } from "next-intl";
import { Controller } from "react-hook-form";
import { useLogin } from "../model/hooks/useLogin";

export const LoginCard = () => {
  const { loginFormId, control, formState, handleSubmit, onSubmit } =
    useLogin();
  const t = useTranslations();

  const { errors } = formState;

  return (
    <Card className="w-75 sm:w-150">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">
          {t("auth.login_page.title")}
        </CardTitle>
        <CardDescription>{t("auth.login_page.description")}</CardDescription>
      </CardHeader>

      <CardContent className="space-y-10 mt-6">
        <div className="grid sm:grid-cols-2 gap-4">
          <Button className="w-full" variant="outline">
            <RiGoogleFill />
            {t("auth.login_page.oauth.google")}
          </Button>

          <Button className="w-full" variant="outline">
            <RiGithubFill />
            {t("auth.login_page.oauth.github")}
          </Button>
        </div>

        <div className="h-px w-full relative bg-secondary">
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-card px-2 uppercase text-sm text-muted-foreground">
            {t("auth.login_page.oauth.divider")}
          </span>
        </div>

        <form id={loginFormId} onSubmit={handleSubmit(onSubmit)}>
          <FieldSet>
            <FieldGroup>
              <Controller
                control={control}
                name="email"
                render={({ field }) => (
                  <Field>
                    <FieldLabel htmlFor="email">
                      {t("auth.login_page.form.email_label")}
                    </FieldLabel>
                    <FieldContent>
                      <Input
                        id="email"
                        placeholder={t(
                          "auth.login_page.form.email_placeholder",
                        )}
                        {...field}
                      />
                    </FieldContent>

                    <FieldError
                      errors={
                        errors.email?.message
                          ? [{ message: t(errors.email.message) }]
                          : undefined
                      }
                    />
                  </Field>
                )}
              />

              <Controller
                control={control}
                name="password"
                render={({ field }) => (
                  <Field>
                    <div className="flex items-center justify-between mb-1">
                      <FieldLabel htmlFor="password">
                        {t("auth.login_page.form.password_label")}
                      </FieldLabel>
                      <Link
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                        href="/"
                      >
                        {t("auth.login_page.form.forgot_password_link")}
                      </Link>
                    </div>
                    <FieldContent>
                      <Input
                        id="password"
                        type="password"
                        placeholder="********"
                        {...field}
                      />
                    </FieldContent>
                    <FieldError
                      errors={
                        errors.password?.message
                          ? [{ message: t(errors.password.message) }]
                          : undefined
                      }
                    />
                  </Field>
                )}
              />

              <Controller
                control={control}
                name="isRememberMe"
                render={({ field }) => (
                  <Field
                    orientation="horizontal"
                    className="items-center gap-2"
                  >
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      id="remember-me"
                    />
                    <Label
                      htmlFor="remember-me"
                      className="cursor-pointer select-none"
                    >
                      {t("auth.login_page.form.remember_me")}
                    </Label>
                  </Field>
                )}
              />
            </FieldGroup>
          </FieldSet>
        </form>
      </CardContent>

      <CardFooter className="flex flex-col items-center gap-4">
        <Button form={loginFormId} className="w-full">
          {t("auth.login_page.form.submit_button")}
        </Button>
        <span className="text-sm text-muted-foreground">
          {t("auth.login_page.footer.dont_have_account")}{" "}
          <Link
            href={PAGES_CONFIG.AUTH.REGISTER}
            className="text-primary hover:underline"
          >
            {t("auth.login_page.footer.sign_up_link")}
          </Link>
        </span>
      </CardFooter>
    </Card>
  );
};

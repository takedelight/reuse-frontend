"use client";

import { PAGES_CONFIG } from "@/src/shared/configs/pages/page.config";
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
import { useRegister } from "../model/hooks/useRegister";

export const RegisterCard = () => {
  const t = useTranslations();

  const { registerFormId, handleSubmit, onSubmit, formState, control } =
    useRegister();

  const { errors } = formState;

  return (
    <Card className="w-75 sm:w-150">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">
          {t("auth.register_page.title")}
        </CardTitle>
        <CardDescription>{t("auth.register_page.description")}</CardDescription>
      </CardHeader>

      <CardContent className="space-y-10 mt-6">
        <div className="grid sm:grid-cols-2 gap-4">
          <Button className="w-full" variant="outline">
            <RiGoogleFill />
            {t("auth.register_page.oauth.google")}
          </Button>

          <Button className="w-full" variant="outline">
            <RiGithubFill />
            {t("auth.register_page.oauth.github")}
          </Button>
        </div>

        <div className="h-px w-full relative bg-secondary">
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-card px-2 uppercase text-sm text-muted-foreground">
            {t("auth.register_page.oauth.divider")}
          </span>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} id={registerFormId}>
          <FieldSet>
            <FieldGroup>
              <Controller
                control={control}
                name="username"
                render={({ field }) => (
                  <Field>
                    <FieldLabel htmlFor="username">
                      {t("auth.register_page.form.username_label")}
                    </FieldLabel>
                    <FieldContent>
                      <Input id="username" placeholder="john.doe" {...field} />
                    </FieldContent>
                    <FieldError
                      errors={
                        errors.username?.message
                          ? [{ message: t(errors.username.message) }]
                          : undefined
                      }
                    />
                  </Field>
                )}
              />

              <Controller
                control={control}
                name="email"
                render={({ field }) => (
                  <Field>
                    <FieldLabel htmlFor="email">
                      {t("auth.register_page.form.email_label")}
                    </FieldLabel>
                    <FieldContent>
                      <Input
                        id="email"
                        placeholder="john.doe@example.com"
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
                    <FieldLabel htmlFor="password">
                      {t("auth.register_page.form.password_label")}
                    </FieldLabel>

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
                name="confirmPassword"
                render={({ field }) => (
                  <Field>
                    <FieldLabel htmlFor="confirm-password">
                      {t("auth.register_page.form.confirm_password_label")}
                    </FieldLabel>
                    <FieldContent>
                      <Input
                        id="confirm-password"
                        type="password"
                        {...field}
                        placeholder="********"
                      />
                    </FieldContent>
                    <FieldError
                      errors={
                        errors.confirmPassword?.message
                          ? [{ message: t(errors.confirmPassword.message) }]
                          : undefined
                      }
                    />
                  </Field>
                )}
              />

              <Field orientation="horizontal" className="items-center gap-2">
                <Checkbox id="remember-me" />
                <Label
                  htmlFor="remember-me"
                  className="cursor-pointer select-none"
                >
                  {t("auth.register_page.form.remember_me")}
                </Label>
              </Field>
            </FieldGroup>
          </FieldSet>
        </form>
      </CardContent>

      <CardFooter className="flex flex-col items-center gap-4">
        <Button form={registerFormId} className="w-full">
          {t("auth.register_page.form.submit_button")}
        </Button>
        <span className="text-sm text-muted-foreground">
          {t("auth.register_page.footer.already_have_account")}{" "}
          <Link
            href={PAGES_CONFIG.AUTH.LOGIN}
            className="text-primary hover:underline"
          >
            {t("auth.register_page.footer.sign_in_link")}
          </Link>
        </span>
      </CardFooter>
    </Card>
  );
};

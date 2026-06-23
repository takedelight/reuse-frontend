"use client";

import { BIO_MAX_LENGTH, User } from "@/src/entity/user";
import {
  Button,
  Field,
  FieldContent,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
  Input,
  Textarea,
} from "@/src/shared/ui";
import { useTranslations } from "next-intl";
import { Controller } from "react-hook-form";
import { useUpdateProfile } from "../model/hooks/useUpdateProfile";

interface UpdateProfileFormProps {
  initialUser: User | null;
}

export const UpdateProfileForm = ({ initialUser }: UpdateProfileFormProps) => {
  const t = useTranslations();

  const { formId, onSubmit, control, formState, handleSubmit } =
    useUpdateProfile(initialUser);

  const { errors, isDirty, isValid } = formState;

  const isDisabled = !isDirty || !isValid;

  return (
    <form
      id={formId}
      className="flex flex-col gap-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <FieldSet>
        <FieldGroup>
          <Field className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Controller
              control={control}
              name="username"
              render={({ field }) => (
                <Field className="flex flex-col gap-1.5">
                  <FieldLabel htmlFor="username">
                    {t("profile.settings.profile_info.form.username_label")}
                  </FieldLabel>
                  <FieldContent>
                    <Input id="username" placeholder="john.doe" {...field} />
                  </FieldContent>

                  <FieldError
                    errors={[
                      {
                        message: errors.username?.message
                          ? t(errors.username.message)
                          : undefined,
                      },
                    ]}
                  />
                </Field>
              )}
            />
            <Controller
              control={control}
              name="email"
              render={({ field }) => (
                <Field className="flex flex-col gap-1.5">
                  <FieldLabel htmlFor="email">
                    {t("profile.settings.profile_info.form.email_label")}
                  </FieldLabel>
                  <FieldContent>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john.doe@example.com"
                      {...field}
                    />
                  </FieldContent>

                  <FieldError
                    errors={[
                      {
                        message: errors.email?.message
                          ? t(errors.email.message)
                          : undefined,
                      },
                    ]}
                  />
                </Field>
              )}
            />
          </Field>

          <Controller
            control={control}
            name="bio"
            render={({ field }) => (
              <Field className="flex flex-col gap-1.5">
                <FieldLabel htmlFor="bio">
                  {t("profile.settings.profile_info.form.bio_label")}
                </FieldLabel>
                <FieldContent className="relative">
                  <Textarea
                    id="bio"
                    placeholder={t(
                      "profile.settings.profile_info.form.bio_placeholder",
                    )}
                    className="resize-none  h-28"
                    {...field}
                    maxLength={BIO_MAX_LENGTH}
                    value={field.value || ""}
                  />
                  <span className="text-xs absolute bottom-1 right-2 text-muted-foreground">
                    {field.value?.length || 0} / {BIO_MAX_LENGTH}
                  </span>
                </FieldContent>

                <FieldError
                  errors={[
                    {
                      message: errors.bio?.message
                        ? t(errors.bio.message)
                        : undefined,
                    },
                  ]}
                />
              </Field>
            )}
          />
        </FieldGroup>
      </FieldSet>

      <div className="flex justify-end">
        <Button type="submit" disabled={isDisabled}>
          {t("profile.settings.profile_info.form.submit_button")}
        </Button>
      </div>
    </form>
  );
};

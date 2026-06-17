"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useId } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  registerSchema,
  type RegisterSchemaInput,
  type RegisterSchemaOutput,
} from "../schemas/register.schema";

export const useRegister = () => {
  const t = useTranslations();

  const form = useForm<RegisterSchemaInput>({
    resolver: zodResolver(registerSchema),

    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      isRememberMe: false,
    },

    mode: "onSubmit",
  });

  const registerFormId = useId();

  const onSubmit: SubmitHandler<RegisterSchemaOutput> = (data) => {
    toast.success(t("toast.auth.success"));
  };

  return { ...form, onSubmit, registerFormId };
};

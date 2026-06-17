"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useId } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  loginSchema,
  type LoginSchemaInput,
  type LoginSchemaOutput,
} from "../schemas/login.schema";

export const useLogin = () => {
  const t = useTranslations();

  const form = useForm<LoginSchemaInput>({
    resolver: zodResolver(loginSchema),

    defaultValues: {
      email: "",
      password: "",
      isRememberMe: false,
    },

    mode: "onSubmit",
  });

  const loginFormId = useId();

  const onSubmit: SubmitHandler<LoginSchemaOutput> = (data) => {
    toast.success(t("toast.auth.success"));
  };

  return { ...form, onSubmit, loginFormId };
};

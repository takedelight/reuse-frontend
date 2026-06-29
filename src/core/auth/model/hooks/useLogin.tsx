"use client";

import { useRouter } from "@/src/shared/i18n";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useId } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { loginAction } from "../../api/login.action";
import { loginSchema, type LoginSchemaInput } from "../schemas/login.schema";

export const useLogin = () => {
  const t = useTranslations();

  const router = useRouter();

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

  const registerMutation = useMutation({
    mutationKey: ["login"],
    mutationFn: loginAction,
    onSuccess: () => {
      router.push("/");
      toast.success(t("toast.auth.success_login"));
    },
    onError: (error: unknown) => {
      if (error instanceof Error) {
        const isValidKey =
          error.message.startsWith("errors.") ||
          error.message.startsWith("auth.");
        const translationKey = isValidKey
          ? error.message
          : "errors.server.unknown_error";

        toast.error(t(translationKey));
      }
    },
  });

  const onSubmit: SubmitHandler<LoginSchemaInput> = (data) => {
    registerMutation.mutate(data);
  };

  return { ...form, onSubmit, loginFormId };
};

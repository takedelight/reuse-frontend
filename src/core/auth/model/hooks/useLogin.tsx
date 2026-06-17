"use client";

import { API_URL } from "@/src/shared/constants";
import { useRouter } from "@/src/shared/i18n";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useId } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { loginSchema, type LoginSchemaInput } from "../schemas/login.schema";

export const useLogin = () => {
  const t = useTranslations();

  const router = useRouter();

  const queryClient = useQueryClient();

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
    mutationFn: async (data: LoginSchemaInput) => {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        let errorKey = "errors.server.unknown_error";
        try {
          const result = await response.json();
          errorKey = Array.isArray(result.message)
            ? result.message[0]
            : result.message || errorKey;
        } catch {}
        throw new Error(errorKey);
      }

      const text = await response.text();
      return text ? JSON.parse(text) : {};
    },
    onSuccess: () => {
      router.push("/");
      queryClient.invalidateQueries({ queryKey: ["check-auth"] });
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

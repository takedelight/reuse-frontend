"use client";

import { API_URL } from "@/src/shared/constants";
import { useRouter } from "@/src/shared/i18n";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
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

  const router = useRouter();

  const queryClient = useQueryClient();

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

  const registerMutation = useMutation({
    mutationKey: ["register"],
    mutationFn: async (data: RegisterSchemaInput) => {
      const { confirmPassword, ...rest } = data;

      const response = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(rest),
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
      toast.success(t("toast.auth.register_success"));
    },
    onError: (error: unknown) => {1
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

  const onSubmit: SubmitHandler<RegisterSchemaOutput> = (data) => {
    registerMutation.mutate(data);
  };

  return { ...form, onSubmit, registerFormId };
};

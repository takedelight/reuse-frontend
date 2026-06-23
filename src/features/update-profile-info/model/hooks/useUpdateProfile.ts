"use client";

import {
  updateUserAction,
  UpdateUserInput,
  updateUserSchema,
  User,
} from "@/src/entity/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useEffect, useId } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export const useUpdateProfile = (initialUser: User | null) => {
  const t = useTranslations();

  const form = useForm<UpdateUserInput>({
    resolver: zodResolver(updateUserSchema),
    mode: "onChange",
    defaultValues: {
      bio: initialUser?.bio || "",
      username: initialUser?.username || "",
      email: initialUser?.email || "",
    },
  });

  useEffect(() => {
    form.reset({
      bio: initialUser?.bio || "",
      username: initialUser?.username || "",
      email: initialUser?.email || "",
    });
  }, [initialUser, form]);

  const formId = useId();

  const { mutate: updateProfile, isPending } = useMutation({
    mutationKey: ["update-profile"],
    mutationFn: updateUserAction,
    onSuccess: () => {
      toast.success(t("toast.profile.profile_update_success"));
    },
    onError: (error: Error) => {
      toast.error(t(error.message) || t("toast.profile.update_profile_error"));
    },
  });

  const onSubmit = (data: UpdateUserInput) => {
    updateProfile(data);
  };

  return { ...form, formId, updateProfile, isPending, onSubmit };
};

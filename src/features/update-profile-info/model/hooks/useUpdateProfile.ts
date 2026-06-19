"use client";

import { useAuth } from "@/src/core/auth";
import { UpdateUserInput, updateUserSchema, User } from "@/src/entity/user";
import { API_URL } from "@/src/shared/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useEffect, useId } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export const useUpdateProfile = (initialUser: User | null) => {
  const queryClient = useQueryClient();

  const t = useTranslations("toast");

  const {
    values: { user: clientUser },
  } = useAuth();

  const currentUser = clientUser || initialUser;

  const form = useForm<UpdateUserInput>({
    resolver: zodResolver(updateUserSchema),
    mode: "onChange",
    defaultValues: {
      bio: currentUser?.bio || "",
      username: currentUser?.username || "",
      email: currentUser?.email || "",
    },
  });

  useEffect(() => {
    form.reset({
      bio: currentUser?.bio || "",
      username: currentUser?.username || "",
      email: currentUser?.email || "",
    });
  }, [currentUser]);

  const formId = useId();

  const { mutate: updateProfile, isPending } = useMutation({
    mutationKey: ["update-profile"],
    mutationFn: async (data: UpdateUserInput) => {
      const response = await fetch(`${API_URL}/user`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message || "Failed to update profile");
      }
    },
    onSuccess: () => {
      toast.success(t("profile.profile_update_success"));
      queryClient.invalidateQueries({ queryKey: ["check-auth"] });
    },
    onError: (error: Error) => {
      toast.error(error.message || t("profile.update_profile_error"));
    },
  });

  const onSubmit = (data: UpdateUserInput) => {
    updateProfile(data);
  };

  return { ...form, formId, updateProfile, isPending, onSubmit };
};

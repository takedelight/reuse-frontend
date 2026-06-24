"use server";

import { UpdateUserInput } from "@/src/entity/user";
import { PAGES_CONFIG } from "@/src/shared/configs/pages";
import { API_URL } from "@/src/shared/constants";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function updateUserAction(data: UpdateUserInput) {
  const cookieStore = await cookies();

  const accessToken = cookieStore.get("accessToken")?.value;

  const response = await fetch(`${API_URL}/profile`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Cookie: `accessToken=${accessToken}`,
    },
    body: JSON.stringify(data),
  });

  const responseData = await response.json();

  if (!response.ok) {
    throw new Error(responseData.message || "Failed to update profile");
  }

  cookieStore.set("user", JSON.stringify(responseData), {
    path: "/",
    httpOnly: false,
    sameSite: "lax",
  });

  revalidatePath(PAGES_CONFIG.PROFILE.SETTINGS);

  return responseData;
}

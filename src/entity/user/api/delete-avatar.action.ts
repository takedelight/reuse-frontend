"use server";

import { PAGES_CONFIG } from "@/src/shared/configs/pages";
import { API_URL } from "@/src/shared/constants";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function deleteAvatarAction() {
  const cookieStore = await cookies();

  const accessToken = cookieStore.get("accessToken")?.value;

  const response = await fetch(`${API_URL}/profile/avatar`, {
    method: "DELETE",
    headers: {
      Cookie: `accessToken=${accessToken}`,
    },
  });
  const responseData = await response.json();

  if (!response.ok) {
    throw new Error(responseData.message || "Failed to delete avatar");
  }

  cookieStore.set("user", JSON.stringify(responseData), {
    path: "/",
    httpOnly: false,
    sameSite: "lax",
  });

  revalidatePath(PAGES_CONFIG.PROFILE.SETTINGS);
}

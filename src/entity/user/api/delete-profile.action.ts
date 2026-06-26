"use server";

import { PAGES_CONFIG } from "@/src/shared/configs/pages";
import { API_URL } from "@/src/shared/constants";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function deleteProfileAction() {
  const cookieStore = await cookies();

  const accessToken = cookieStore.get("accessToken")?.value;

  const response = await fetch(`${API_URL}/user/delete`, {
    method: "DELETE",
    headers: {
      Cookie: `accessToken=${accessToken}`,
    },
  });
  const responseData = await response.json();

  if (!response.ok) {
    throw new Error(responseData.message || "Failed to delete profile");
  }

  revalidatePath(PAGES_CONFIG.PROFILE.SETTINGS);
}

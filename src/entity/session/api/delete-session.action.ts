"use server";

import { PAGES_CONFIG } from "@/src/shared/configs/pages";
import { API_URL } from "@/src/shared/constants";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function deleteSessionAction(sessionId: string) {
  try {
    const cookieStore = await cookies();
    const cookieHeader = cookieStore.toString();

    const res = await fetch(`${API_URL}/session/${sessionId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieHeader,
      },
    });

    if (!res.ok) {
      return { success: false, error: "failed_to_delete" };
    }

    revalidatePath(PAGES_CONFIG.PROFILE.SECURITY);
  } catch (error) {
    console.error("Delete session action error:", error);
  }
}

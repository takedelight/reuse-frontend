"use server";

import { API_URL } from "@/src/shared/constants";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function signOutAction() {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();

  try {
    await fetch(`${API_URL}/auth/logout`, {
      method: "POST",
      headers: {
        Cookie: cookieHeader,
      },
    });
  } catch (error) {
    console.error("Logout API error:", error);
  }

  cookieStore.delete("accessToken");
  cookieStore.delete("refreshToken");
  cookieStore.delete("user");

  redirect("/auth/login");
}

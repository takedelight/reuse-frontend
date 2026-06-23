"use server";

import { API_URL } from "@/src/shared/constants";
import { cookies } from "next/headers";
import { User } from "../model/schemas/user.schema";

export async function getUserProfile(): Promise<User | null> {
  try {
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const cookieStore = await cookies();

    const response = await fetch(`${API_URL}/auth/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStore.toString(),
      },
      cache: "no-store",
    });

    if (response.status === 401) return null;
    if (!response.ok) throw new Error("errors.server.unknown_error");

    return response.json();
  } catch (error) {
    console.error("getMeAction error:", error);
    return null;
  }
}

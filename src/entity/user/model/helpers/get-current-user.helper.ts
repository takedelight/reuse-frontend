"use server";

import { cookies } from "next/headers";
import { cache } from "react";
import { User } from "../schemas/user.schema";

export const getCurrentUser = cache(async (): Promise<User | null> => {
  try {
    const cookieStore = await cookies();
    const userCookie = cookieStore.get("user")?.value;

    if (!userCookie) return null;

    return JSON.parse(userCookie) as User;
  } catch (error) {
    console.error("Failed to parse user cookie:", error);
    return null;
  }
});

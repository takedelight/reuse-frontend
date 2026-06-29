"use server";

import { PAGES_CONFIG } from "@/src/shared/configs/pages";
import { API_URL } from "@/src/shared/constants";
import * as cookie from "cookie";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { LoginSchemaInput } from "../model/schemas/login.schema";

export async function loginAction(data: LoginSchemaInput) {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
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

  const setCookieHeader = response.headers.get("set-cookie");

  if (setCookieHeader) {
    const cookieStore = await cookies();
    const parsedCookies = cookie.parseCookie(setCookieHeader);

    if (parsedCookies.access_token) {
      cookieStore.set("access_token", parsedCookies.access_token, {
        path: "/",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
      });
    }

    if (parsedCookies.refresh_token) {
      cookieStore.set("refresh_token", parsedCookies.refresh_token, {
        path: "/",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
      });
    }
  }

  revalidatePath(PAGES_CONFIG.HOME, "layout");
}

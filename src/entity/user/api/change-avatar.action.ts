"use server";

import { PAGES_CONFIG } from "@/src/shared/configs/pages";
import { API_URL } from "@/src/shared/constants";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function changeAvatarAction(file: File) {
  const cookieStore = await cookies();

  const accessToken = cookieStore.get("accessToken")?.value;

  const response = await fetch(`${API_URL}/user/upload-url`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: `accessToken=${accessToken}`,
    },
    body: JSON.stringify({
      fileName: file.name,
      contentType: file.type,
    }),
  });

  if (!response.ok) throw new Error("errors.server.avatar_upload_failed");

  const { url, key } = await response.json();

  return { url, key };
}

export async function confirmAvatarUpload(key: string) {
  const cookieStore = await cookies();

  const accessToken = cookieStore.get("accessToken")?.value;

  const response = await fetch(`${API_URL}/user/confirm`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: `accessToken=${accessToken}`,
    },
    body: JSON.stringify({ key }),
  });

  const data = await response.json();

  cookieStore.set("user", JSON.stringify(data), {
    path: "/",
    httpOnly: false,
    sameSite: "lax",
  });

  revalidatePath(PAGES_CONFIG.PROFILE.SETTINGS);

  return data;
}

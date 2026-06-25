"use server";

import { API_URL } from "@/src/shared/constants";
import { cookies } from "next/headers";
import { type Session } from "../model/schemas/session.schema";

export async function getSessionsAction(): Promise<Session[]> {
  const cookieStore = await cookies();

  const accessToken = cookieStore.get("accessToken")?.value;

  const response = await fetch(`${API_URL}/session`, {
    headers: {
      "Content-Type": "application/json",
      Cookie: `accessToken=${accessToken}`,
    },
  });

  if (!response.ok) throw new Error("errors.server.avatar_upload_failed");

  return await response.json();
}

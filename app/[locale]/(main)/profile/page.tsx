import { ProfileCard } from "@/src/widgets/profile/profile-card";
import { type Metadata } from "next";

interface Props {
  params: Promise<{ locale: string }>;
}

async function getMe() {
  try {
    const { cookies } = await import("next/headers");
    const cookieStore = await cookies();

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });

    if (!res.ok) return null;

    const data = await res.json();
    return data;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const user = await getMe();

  return {
    title: user?.username,
    description: "View and manage your re:use profile.",
  };
}

export default function ProfilePage() {
  return <ProfileCard />;
}

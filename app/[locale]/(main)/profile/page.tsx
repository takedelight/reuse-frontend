import { getCurrentUser } from "@/src/entity/user";
import { ProfileCard } from "@/src/widgets/profile/profile-card";
import { type Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const user = await getCurrentUser();

  return {
    title: user?.username,
    description: "View and manage your re:use profile.",
  };
}

export default function ProfilePage() {
  return <ProfileCard />;
}

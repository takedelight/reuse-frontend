import { ProfileAside } from "@/src/widgets/profile/profile-aside";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="container flex flex-col xl:grid xl:grid-cols-8  gap-5 mx-auto px-1 ">
      <ProfileAside />
      <div className="col-span-6 ">{children}</div>
    </section>
  );
}

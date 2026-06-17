import { Footer } from "@/src/widgets/footer";
import { Header } from "@/src/widgets/header";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className={"flex-1"}>{children}</main>
      <Footer />
    </>
  );
}

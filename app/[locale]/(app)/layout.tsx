import { FlickeringGrid } from "@/src/shared/ui";
import { Footer } from "@/src/widgets/footer";
import { Header } from "@/src/widgets/header";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className={"flex-1"}>
        <FlickeringGrid
          className="absolute inset-0 -z-10 h-full w-full object-cover"
          squareSize={4}
          gridGap={12}
          color="#585b70"
          maxOpacity={0.8}
          flickerChance={1}
        />
        {children}
      </main>
      <Footer />
    </>
  );
}

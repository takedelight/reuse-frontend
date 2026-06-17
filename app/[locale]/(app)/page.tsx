import { FlickeringGrid } from "@/src/shared/ui";

export default function HomePage() {
  return (
    <>
      <FlickeringGrid
        className="absolute inset-0 -z-10 h-full w-full object-cover"
        squareSize={4}
        gridGap={12}
        color="#585b70"
        maxOpacity={0.8}
        flickerChance={1}
      />

      <section className="container mx-auto px-2"></section>
    </>
  );
}

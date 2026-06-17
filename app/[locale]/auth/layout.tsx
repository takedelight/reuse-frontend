export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex-1">
      <section className="container grid h-screen place-items-center mx-auto px-4">
        {children}
      </section>
    </main>
  );
}

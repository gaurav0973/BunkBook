export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="flex flex-1 items-center justify-center min-h-screen"
      style={{
        backgroundImage: "radial-gradient(var(--muted) 1px, transparent 1px)",
        backgroundSize: "24px 24px",
      }}
    >
      <div className="flex w-full max-w-md flex-col items-center justify-between p-6">
        {children}
      </div>
    </div>
  );
}

export const metadata = {
  title: "Planificateur r?novation logements + local",
  description:
    "Estimez les professionnels et mat?riaux pour transformer un local en logements et commerce."
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body
        style={{
          margin: 0,
          fontFamily:
            "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif",
          color: "#0f172a",
          background: "#f8fafc"
        }}
      >
        {children}
      </body>
    </html>
  );
}


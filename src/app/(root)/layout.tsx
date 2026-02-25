import MainLayout from "@/layouts/MainLayout";
import AppListener from "@/components/AppListener";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <MainLayout>{children}</MainLayout>
      <AppListener />
    </>
  );
}

import type { Metadata } from "next";
import "./globals.css";
import LoadingComp from "@/components/loading";

export const metadata: Metadata = {
  title: "Sistem Belajar Siswa",
  description: "Sistem Belajar Siswa",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <LoadingComp />
        <div>{children}</div>
      </body>
    </html>
  );
}

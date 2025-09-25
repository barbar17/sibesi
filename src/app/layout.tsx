import type { Metadata } from "next";
import "@/style/globals.css";
import LoadingComp from "@/components/loading";
import { ToastContainer } from "react-toastify";

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
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <div>{children}</div>
      </body>
    </html>
  );
}

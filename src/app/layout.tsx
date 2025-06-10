import "./globals.css";
import { ReactNode } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const metadata = {
  title: "My Shop",
  description: "Интернет-магазин на Next.js",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="ru">
      <body>
        <header className="container">
        </header>
        <main className="container">{children}</main>
        <ToastContainer />
      </body>
    </html>
  );
}

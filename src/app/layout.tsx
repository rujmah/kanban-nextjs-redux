import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AppProvider from "./providers";

export const metadata: Metadata = {
  title: "Kanban Board",
  description: "Kanban board",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AppProvider>
          <div className="page-container">{children}</div>
        </AppProvider>
      </body>
    </html>
  );
}

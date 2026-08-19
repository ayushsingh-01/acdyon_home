import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Acdyon — Make room for the work that matters",
  description: "A calmer operating system for teams with a lot in motion."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

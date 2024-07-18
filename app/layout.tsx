import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import MatrixBackground from "@/components/MatrixBackground";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "My Profile",
  description: "Keitumetse Frederick's Mogotsi profile",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <MatrixBackground />
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}

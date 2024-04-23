import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/ui/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Discordify",
  description: "Web interface to manage the Discordify bot on your server",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={"w-screen h-screen overflow-hidden p-8"}>
        <div className="border w-full h-full rounded-lg bg-gradient-linear">
          <Header />
          {children}
        </div>
      </body>
    </html>
  );
}

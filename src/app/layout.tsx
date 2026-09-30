import type { Metadata, Viewport } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChatAssistant from "@/components/ChatAssistant";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-dm-sans",
});

export const metadata: Metadata = {
  title: "AlloCode — Sites web, bots Discord et applications",
  description: "AlloCode imagine et développe des sites web, bots Discord et applications sur mesure pour donner vie à vos projets numériques.",
};

export const viewport: Viewport = {
  themeColor: "#08131c",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="fr"
      className={`${dmSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#08131c] text-gray-100">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <ChatAssistant />
      </body>
    </html>
  );
}

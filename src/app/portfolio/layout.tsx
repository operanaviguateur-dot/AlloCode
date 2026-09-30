import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfolio — AlloCode",
  description: "Découvrez les formats de projets numériques qu'AlloCode peut concevoir : sites web, bots Discord et applications sur mesure.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

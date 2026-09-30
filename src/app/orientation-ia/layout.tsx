import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Orientation IA — AlloCode",
  description: "Laissez l'IA vous aider à définir et orienter votre projet numérique.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

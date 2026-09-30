import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact — AlloCode",
  description: "Présentez votre projet de site web, bot Discord ou application à AlloCode et recevez une réponse par e-mail.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

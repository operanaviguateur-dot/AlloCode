import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-gray-800 py-8">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-gray-400">
          <Link href="/" className="font-bold text-white">
            AlloCode
          </Link>
          <span className="ml-2">Développement web indépendant · 2026</span>
        </div>
        <nav className="flex items-center gap-6">
          <Link href="/portfolio" className="text-gray-400 hover:text-white transition-colors">
            Portfolio
          </Link>
          <Link href="/orientation-ia" className="text-purple-400 hover:text-purple-300 transition-colors flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="11" width="18" height="10" rx="2" />
              <circle cx="12" cy="5" r="2" />
              <path d="M12 7v4" />
              <line x1="8" y1="16" x2="8" y2="16" />
              <line x1="16" y1="16" x2="16" y2="16" />
            </svg>
            Orientation IA
          </Link>
          <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">
            Contact
          </Link>
          <Link href="/mentions-legales" className="text-gray-400 hover:text-white transition-colors">
            Mentions légales
          </Link>
          <a href="mailto:allocode17@gmail.com" className="text-gray-400 hover:text-white transition-colors">
            E-mail
          </a>
        </nav>
      </div>
    </footer>
  );
}

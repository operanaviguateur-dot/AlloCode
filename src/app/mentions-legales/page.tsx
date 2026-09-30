import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mentions légales — AlloCode",
  description: "Mentions légales du site AlloCode.",
};

export default function MentionsLegales() {
  return (
    <div className="pt-20">
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold mb-12 text-white">Mentions légales</h1>

          <div className="space-y-8 text-gray-300">
            <div>
              <h2 className="text-2xl font-bold mb-4 text-white">Éditeur du site</h2>
              <p>AlloCode</p>
              <p>Benjamin Braun</p>
              <p>Entrepreneur individuel</p>
              <p>Email : allocode17@gmail.com</p>
              <p>Téléphone : +32 472 38 57 58</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4 text-white">Hébergement</h2>
              <p>Le site est hébergé par Vercel Inc.</p>
              <p>340 S Lemon Ave #4133</p>
              <p>Walnut, CA 91789, USA</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4 text-white">Propriété intellectuelle</h2>
              <p>
                L'ensemble du contenu de ce site (textes, images, vidéos, logos, etc.) est protégé par le droit d'auteur.
                Toute reproduction, même partielle, est interdite sans autorisation préalable.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4 text-white">Protection des données personnelles</h2>
              <p>
                Les données collectées via le formulaire de contact sont utilisées uniquement pour répondre à vos demandes.
                Elles ne sont pas transmises à des tiers.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4 text-white">Cookies</h2>
              <p>
                Ce site n'utilise pas de cookies de tracking. Seuls les cookies nécessaires au bon fonctionnement du site peuvent être utilisés.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

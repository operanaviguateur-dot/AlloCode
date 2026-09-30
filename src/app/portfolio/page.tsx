"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Portfolio() {
  return (
    <div className="pt-20">
      <section className="py-20 px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-12"
          >
            <p className="text-gray-400 mb-2">Portfolio / Formats de projets</p>
            <h1 className="text-5xl font-bold text-white">
              Des projets utiles, <em className="text-gray-400">bien pensés.</em>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-gray-300 mb-16 max-w-2xl"
          >
            Chaque projet part d'un besoin concret. Voici quelques formats que je peux imaginer et développer avec vous.
          </motion.p>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {[
              {
                tags: ["Studio", "Services", "Contact"],
                title: "Un site à votre image.",
                type: "Site web",
                description: "Une présence en ligne claire. Une vitrine rapide et soignée pour présenter votre activité et faciliter la prise de contact.",
              },
              {
                tags: ["# accueil · bot en ligne"],
                title: "AlloBot",
                type: "Bot Discord",
                description: "Moins de tâches répétitives. Un bot personnalisé pour accueillir, modérer ou automatiser les petits rituels de votre serveur.",
              },
              {
                tags: ["ESPACE PERSONNEL"],
                title: "Tout au même endroit.",
                type: "Application",
                description: "Un outil conçu pour le quotidien. Une application simple d'utilisation qui rassemble les actions importantes dans un seul espace.",
              },
              {
                tags: ["Vue d'ensemble"],
                title: "Outil web",
                type: "Une interface qui fait gagner du temps",
                description: "Un tableau de bord ou un outil métier ajusté à vos données, à vos habitudes et à votre équipe.",
              },
            ].map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                className="p-8 border border-gray-800 rounded-lg hover:border-purple-500 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2 mb-4">
                  {project.tags.map((tag, i) => (
                    <span key={i} className="text-gray-500">
                      {tag}
                      {i < project.tags.length - 1 && <span className="text-gray-600 mx-1">·</span>}
                    </span>
                  ))}
                </div>
                <h3 className="text-2xl font-bold mb-2 text-white">{project.title}</h3>
                <p className="text-gray-400 mb-4">{project.type}</p>
                <p className="text-lg text-gray-300">{project.description}</p>
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-gray-500 text-sm mb-16"
          >
            Ces visuels illustrent des pistes de création, pas des commandes déjà réalisées. Les projets livrés seront ajoutés ici.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            whileHover={{ scale: 1.02 }}
            className="text-center p-12 border border-gray-800 rounded-lg hover:border-purple-500 transition-colors"
          >
            <h2 className="text-3xl font-bold mb-4 text-white">Votre projet</h2>
            <p className="text-xl text-gray-300 mb-8">
              On peut partir de zéro, ou améliorer l'existant.
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#08131c] rounded-full font-medium hover:bg-gray-200 transition-colors"
              >
                En discuter
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
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}

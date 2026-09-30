"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="pt-20">
      <section className="min-h-[80vh] flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 mb-4"
          >
            Développement indépendant · Sur mesure
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-5xl md:text-7xl font-bold mb-6 text-white"
          >
            Vos idées méritent mieux qu'un <em className="text-gray-400">simple brouillon.</em>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto"
          >
            Des sites web aux applications, je transforme votre idée en un outil numérique clair, utile et fait pour vous.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href="/contact"
              className="px-8 py-4 bg-white text-[#08131c] rounded-full font-medium hover:bg-gray-200 transition-colors"
            >
              Parler de mon projet
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
                className="inline ml-1"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
            <Link
              href="/portfolio"
              className="px-8 py-4 border border-gray-600 text-white rounded-full font-medium hover:bg-gray-800 transition-colors"
            >
              Voir le portfolio
            </Link>
            <Link
              href="/orientation-ia"
              className="px-8 py-4 border border-purple-500 text-purple-400 rounded-full font-medium hover:bg-purple-500/10 transition-colors flex items-center justify-center gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
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
              S'orienter avec l'IA
            </Link>
          </motion.div>
        </motion.div>
      </section>

      <section className="py-20 px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto"
        >
          <p className="text-gray-400 mb-2">01 / Ce que je développe</p>
          <h2 className="text-4xl font-bold mb-12 text-white">Du code, pour vos idées.</h2>
          <p className="text-xl text-gray-300 mb-12 max-w-2xl">
            Un projet unique ou un besoin bien précis : on définit ensemble la bonne solution et je la construis avec vous.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                number: "01",
                title: "Sites web",
                description: "Un site vitrine ou une expérience web sur mesure, pensée pour être belle, rapide et simple à parcourir.",
              },
              {
                number: "02",
                title: "Bots Discord",
                description: "Des commandes et automatisations utiles, adaptées à la façon dont votre communauté fonctionne.",
              },
              {
                number: "03",
                title: "Applications",
                description: "Des outils web ou logiciels conçus autour de votre usage, de vos contraintes et de votre quotidien.",
              },
            ].map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                className="p-8 border border-gray-800 rounded-lg hover:border-purple-500 transition-colors cursor-pointer"
              >
                <div className="text-4xl font-bold text-gray-600 mb-4">{service.number}</div>
                <h3 className="text-2xl font-bold mb-4 text-white">{service.title}</h3>
                <p className="text-gray-400">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      <section className="py-20 px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          <p className="text-gray-400 mb-2">02 / Le prochain pas</p>
          <h2 className="text-4xl font-bold mb-6 text-white">Vous avez l'idée. On peut déjà en parler.</h2>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              href="/contact"
              className="inline-block px-8 py-4 bg-white text-[#08131c] rounded-full font-medium hover:bg-gray-200 transition-colors"
            >
              Décrire mon projet ↗
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}

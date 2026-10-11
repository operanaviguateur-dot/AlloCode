"use client";

import { motion } from "framer-motion";

export default function ServiceDisponible() {
  const browsers = [
    { name: "Chrome", url: "https://www.google.com/chrome/" },
    { name: "Brave", url: "https://brave.com/download/" },
    { name: "DuckDuckGo", url: "https://duckduckgo.com/browser" },
    { name: "Firefox", url: "https://www.mozilla.org/firefox/" },
    { name: "Safari", url: "https://www.apple.com/safari/" },
    { name: "Tor", url: "https://www.torproject.org/download/" },
    { name: "Opera", url: "https://www.opera.com/download" },
  ];

  const operatingSystems = [
    { name: "Android", url: "https://www.android.com/" },
    { name: "Windows", url: "https://www.microsoft.com/windows" },
    { name: "iOS", url: "https://www.apple.com/ios/" },
    { name: "Linux", url: "https://www.linux.org/" },
    { name: "Wear OS", url: "https://www.android.com/wear-os/" },
  ];

  return (
    <div className="pt-20">
      <section className="py-20 px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-12"
          >
            <p className="text-gray-400 mb-2">Services / Compatibilité</p>
            <h1 className="text-5xl font-bold text-white">
              Service <em className="text-gray-400">disponible.</em>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-gray-300 mb-16"
          >
            L'assistant IA AlloCode est compatible avec les navigateurs web et systèmes d'exploitation suivants.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {browsers.map((browser, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="p-4 rounded-lg transition-colors bg-gray-900/30 backdrop-blur-sm"
              >
                <h3 className="text-white font-semibold text-center text-sm mb-1">
                  {browser.name}
                </h3>
                <a
                  href={browser.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center bg-purple-600 hover:bg-purple-700 text-white py-1.5 px-3 rounded transition-colors text-xs"
                >
                  Accéder
                </a>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-24"
          >
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-gray-300 mb-8"
            >
              L'assistant IA AlloCode est également compatible avec les systèmes d'exploitation suivants.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {operatingSystems.map((os, index) => (
                <motion.div
                  key={os.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="p-4 rounded-lg transition-colors bg-gray-900/30 backdrop-blur-sm"
                >
                  <h3 className="text-white font-semibold text-center text-sm mb-1">
                    {os.name}
                  </h3>
                  <a
                    href={os.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-center bg-purple-600 hover:bg-purple-700 text-white py-1.5 px-3 rounded transition-colors text-xs"
                  >
                    Accéder
                  </a>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-gray-400 text-center mt-12 text-sm"
          >
            Pour une expérience optimale, utilisez la dernière version de votre navigateur ou système d'exploitation.
          </motion.p>
        </motion.div>
      </section>
    </div>
  );
}

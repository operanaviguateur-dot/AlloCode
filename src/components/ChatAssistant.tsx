"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import SendIcon from "./icons/SendIcon";
import BotIcon from "./icons/BotIcon";
import UserIcon from "./icons/UserIcon";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function ChatAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Bonjour ! Je suis **Claude Opus 5.5 high**, votre assistant IA. Je peux vous aider à naviguer sur le site, répondre à vos questions sur les services d'AlloCode, et vous donner des estimations de prix. Dites-moi ce dont vous avez besoin !",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    // Check if tooltip was previously dismissed
    const dismissed = localStorage.getItem("assistant-tooltip-dismissed");
    if (dismissed) {
      setShowTooltip(false);
    }
  }, []);

  const dismissTooltip = () => {
    setShowTooltip(false);
    localStorage.setItem("assistant-tooltip-dismissed", "true");
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const navigateToPage = (page: string) => {
    router.push(page);
    setMessages((prev) => [
      ...prev,
      {
        role: "assistant",
        content: `Je vous redirige vers la page ${page}...`,
      },
    ]);
  };

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [...messages, { role: "user", content: userMessage }],
          isAssistant: true,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get response");
      }

      const data = await response.json();
      let aiMessage = data.message;

      // Check if the AI wants to navigate using NAVIGUE:/page format
      if (aiMessage.startsWith("NAVIGUE:")) {
        const page = aiMessage.replace("NAVIGUE:", "");
        navigateToPage(page);
        return;
      }

      setMessages((prev) => [...prev, { role: "assistant", content: aiMessage }]);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Désolé, une erreur s'est produite. Veuillez réessayer.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Floating button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 p-4 bg-purple-600 text-white rounded-full shadow-lg hover:bg-purple-700 transition-colors"
            title="Ouvrir l'assistant IA"
          >
            <BotIcon />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Tooltip indicator */}
      <AnimatePresence>
        {showTooltip && !isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="fixed bottom-24 right-20 z-50 bg-purple-600 text-white px-4 py-3 rounded-lg shadow-lg max-w-xs"
          >
            <div className="flex items-start gap-3">
              <div className="flex-1">
                <p className="font-semibold text-sm mb-1">Nouveau assistant IA</p>
                <p className="text-xs text-purple-100 mb-2">
                  Discutez avec Claude Opus 5.5 high pour naviguer et obtenir des estimations !
                </p>
                <a
                  href="/service-disponible"
                  className="text-xs text-purple-200 hover:text-white underline"
                >
                  Voir les navigateurs compatibles
                </a>
              </div>
              <button
                onClick={dismissTooltip}
                className="text-purple-200 hover:text-white transition-colors flex-shrink-0"
              >
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
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
            {/* Arrow pointing to button */}
            <div className="absolute -bottom-2 right-8 w-4 h-4 bg-purple-600 transform rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat popup */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-6 right-6 z-50 w-96 max-h-[600px] bg-[#0a0f16] border border-gray-800 rounded-2xl shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="p-4 border-b border-gray-800 flex items-center justify-between bg-[#08131c] rounded-t-2xl">
              <div className="flex items-center gap-3">
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="p-2 bg-purple-600/20 rounded-lg"
                >
                  <img
                    src="data:image/svg+xml;utf8,%3Csvg%20fill%3D%22%23D97757%22%20role%3D%22img%22%20viewBox%3D%220%200%2024%2024%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Ctitle%3EClaude%3C%2Ftitle%3E%3Cpath%20d%3D%22m4.7144%2015.9555%204.7174-2.6471.079-.2307-.079-.1275h-.2307l-.7893-.0486-2.6956-.0729-2.3375-.0971-2.2646-.1214-.5707-.1215-.5343-.7042.0546-.3522.4797-.3218.686.0608%201.5179.1032%202.2767.1578%201.6514.0972%202.4468.255h.3886l.0546-.1579-.1336-.0971-.1032-.0972L6.973%209.8356l-2.55-1.6879-1.3356-.9714-.7225-.4918-.3643-.4614-.1578-1.0078.6557-.7225.8803.0607.2246.0607.8925.686%201.9064%201.4754%202.4893%201.8336.3643.3035.1457-.1032.0182-.0728-.164-.2733-1.3539-2.4467-1.445-2.4893-.6435-1.032-.17-.6194c-.0607-.255-.1032-.4674-.1032-.7285L6.287.1335%206.6997%200l.9957.1336.419.3642.6192%201.4147%201.0018%202.2282%201.5543%203.0296.4553.8985.2429.8318.091.255h.1579v-.1457l.1275-1.706.2368-2.0947.2307-2.6957.0789-.7589.3764-.9107.7468-.4918.5828.2793.4797.686-.0668.4433-.2853%201.8517-.5586%202.9021-.3643%201.9429h.2125l.2429-.2429.9835-1.3053%201.6514-2.0643.7286-.8196.85-.9046.5464-.4311h1.0321l.759%201.1293-.34%201.1657-1.0625%201.3478-.8804%201.1414-1.2628%201.7-.7893%201.36.0729.1093.1882-.0183%202.8535-.607%201.5421-.2794%201.8396-.3157.8318.3886.091.3946-.3278.8075-1.967.4857-2.3072.4614-3.4364.8136-.0425.0304.0486.0607%201.5482.1457.6618.0364h1.621l3.0175.2247.7892.522.4736.6376-.079.4857-1.2142.6193-1.6393-.3886-3.825-.9107-1.3113-.3279h-.1822v.1093l1.0929%201.0686%202.0035%201.8092%202.5075%202.3314.1275.5768-.3218.4554-.34-.0486-2.2039-1.6575-.85-.7468-1.9246-1.621h-.1275v.17l.4432.6496%202.3436%203.5214.1214%201.0807-.17.3521-.6071.2125-.6679-.1214-1.3721-1.9246L14.38%2017.959l-1.1414-1.9428-.1397.079-.674%207.2552-.3156.3703-.7286.2793-.6071-.4614-.3218-.7468.3218-1.4753.3886-1.9246.3157-1.53.2853-1.9004.17-.6314-.0121-.0425-.1397.0182-1.4328%201.9672-2.1796%202.9446-1.7243%201.8456-.4128.164-.7164-.3704.0667-.6618.4008-.5889%202.386-3.0357%201.4389-1.882.929-1.0868-.0062-.1579h-.0546l-6.3385%204.1164-1.1293.1457-.4857-.4554.0608-.7467.2307-.2429%201.9064-1.3114Z%22%2F%3E%3C%2Fsvg%3E"
                    alt="Claude"
                    className="w-6 h-6"
                  />
                </motion.div>
                <div>
                  <p className="text-white font-semibold flex items-center gap-2">
                    Claude Opus 5.5 high
                    <span className="text-xs bg-purple-600/30 text-purple-300 px-2 py-0.5 rounded-full font-medium">beta</span>
                  </p>
                  <p className="text-gray-400 text-xs">Assistant IA AlloCode</p>
                </div>
              </div>
              <motion.button
                whileHover={{ rotate: 90 }}
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </motion.button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[400px]">
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex gap-3 ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {message.role === "assistant" && (
                    <div className="flex-shrink-0 w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                      <BotIcon />
                    </div>
                  )}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className={`max-w-[80%] p-3 rounded-xl ${
                      message.role === "user"
                        ? "bg-purple-600 text-white"
                        : "bg-gray-800 text-gray-100"
                    }`}
                  >
                    {message.role === "assistant" ? (
                      <div className="prose prose-invert prose-xs max-w-none">
                        <ReactMarkdown
                          remarkPlugins={[remarkGfm]}
                          components={{
                            p: ({ children }) => (
                              <p className="mb-2 text-gray-200 text-sm">{children}</p>
                            ),
                            strong: ({ children }) => (
                              <strong className="font-bold text-white">{children}</strong>
                            ),
                            a: ({ children, href }) => (
                              <a
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-purple-400 hover:text-purple-300 underline text-sm"
                              >
                                {children}
                              </a>
                            ),
                          }}
                        >
                          {message.content}
                        </ReactMarkdown>
                      </div>
                    ) : (
                      <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                    )}
                  </motion.div>
                  {message.role === "user" && (
                    <div className="flex-shrink-0 w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
                      <UserIcon />
                    </div>
                  )}
                </motion.div>
              ))}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex gap-3 justify-start"
                >
                  <div className="flex-shrink-0 w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                    <BotIcon />
                  </div>
                  <div className="bg-gray-800 text-gray-100 p-3 rounded-xl">
                    <div className="flex space-x-1">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" />
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-100" />
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-200" />
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-gray-800 bg-[#08131c] rounded-b-2xl">
              <div className="flex gap-2 items-end">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Posez une question..."
                  className="flex-1 px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:border-purple-500 transition-colors resize-none"
                  rows={1}
                  disabled={isLoading}
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={sendMessage}
                  disabled={isLoading || !input.trim()}
                  className="p-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  <SendIcon />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

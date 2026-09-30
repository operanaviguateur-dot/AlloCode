"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import SendIcon from "@/components/icons/SendIcon";
import BotIcon from "@/components/icons/BotIcon";
import UserIcon from "@/components/icons/UserIcon";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function OrientationIA() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Bonjour ! Je suis l'assistant IA d'AlloCode. Je peux vous aider à définir votre projet, vous donner des estimations de prix basées sur nos tarifs, et répondre à vos questions sur nos services de développement (sites web, bots Discord, applications). Comment puis-je vous aider aujourd'hui ?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get response");
      }

      const data = await response.json();
      setMessages((prev) => [...prev, { role: "assistant", content: data.message }]);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Désolé, une erreur s'est produite. Veuillez réessayer ou contacter directement allocode17@gmail.com",
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
    <div className="pt-20">
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-purple-600/20 rounded-lg">
                <BotIcon />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Assistant IA</p>
                <h1 className="text-3xl font-bold text-white">
                  Discutez de votre projet
                </h1>
              </div>
            </div>
            <p className="text-gray-400 ml-14">
              Je peux vous aider à définir votre projet, donner des estimations de prix et répondre à vos questions.
            </p>
          </div>

          <div className="border border-gray-800 rounded-2xl overflow-hidden bg-[#0a0f16] shadow-2xl">
            <div className="h-[600px] overflow-y-auto p-6 space-y-6">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex gap-4 ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {message.role === "assistant" && (
                    <div className="flex-shrink-0 w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center">
                      <BotIcon />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] p-5 rounded-2xl ${
                      message.role === "user"
                        ? "bg-purple-600 text-white"
                        : "bg-gray-800 text-gray-100"
                    }`}
                  >
                    {message.role === "assistant" ? (
                      <div className="prose prose-invert prose-sm max-w-none">
                        <ReactMarkdown
                          remarkPlugins={[remarkGfm]}
                          components={{
                            h1: ({ children }) => (
                              <h1 className="text-xl font-bold mb-3 text-white">{children}</h1>
                            ),
                            h2: ({ children }) => (
                              <h2 className="text-lg font-bold mb-2 text-white">{children}</h2>
                            ),
                            h3: ({ children }) => (
                              <h3 className="text-base font-bold mb-2 text-white">{children}</h3>
                            ),
                            p: ({ children }) => (
                              <p className="mb-3 text-gray-200">{children}</p>
                            ),
                            ul: ({ children }) => (
                              <ul className="mb-3 list-disc list-inside space-y-1 text-gray-200">
                                {children}
                              </ul>
                            ),
                            ol: ({ children }) => (
                              <ol className="mb-3 list-decimal list-inside space-y-1 text-gray-200">
                                {children}
                              </ol>
                            ),
                            li: ({ children }) => (
                              <li className="text-gray-200">{children}</li>
                            ),
                            strong: ({ children }) => (
                              <strong className="font-bold text-white">{children}</strong>
                            ),
                            code: ({ children }) => (
                              <code className="bg-gray-700 px-1.5 py-0.5 rounded text-sm text-purple-300">
                                {children}
                              </code>
                            ),
                            a: ({ children, href }) => (
                              <a
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-purple-400 hover:text-purple-300 underline"
                              >
                                {children}
                              </a>
                            ),
                            blockquote: ({ children }) => (
                              <blockquote className="border-l-4 border-purple-500 pl-4 italic text-gray-300 mb-3">
                                {children}
                              </blockquote>
                            ),
                          }}
                        >
                          {message.content}
                        </ReactMarkdown>
                      </div>
                    ) : (
                      <p className="whitespace-pre-wrap">{message.content}</p>
                    )}
                  </div>
                  {message.role === "user" && (
                    <div className="flex-shrink-0 w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center">
                      <UserIcon />
                    </div>
                  )}
                </div>
              ))}
              {isLoading && (
                <div className="flex gap-4 justify-start">
                  <div className="flex-shrink-0 w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center">
                    <BotIcon />
                  </div>
                  <div className="bg-gray-800 text-gray-100 p-5 rounded-2xl">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100" />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200" />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-4 border-t border-gray-800 bg-[#08131c]">
              <div className="flex gap-4 items-end">
                <div className="flex-1 relative">
                  <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Décrivez votre projet ou posez une question..."
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-xl text-white focus:outline-none focus:border-purple-500 transition-colors resize-none pr-12"
                    rows={1}
                    disabled={isLoading}
                  />
                </div>
                <button
                  onClick={sendMessage}
                  disabled={isLoading || !input.trim()}
                  className="p-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  <SendIcon />
                </button>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-gray-400 mb-4">
              Prêt à passer à l'action ? Discutons de votre projet directement.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#08131c] rounded-full font-medium hover:bg-gray-200 transition-colors"
            >
              Contacter AlloCode
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
          </div>
        </div>
      </section>
    </div>
  );
}

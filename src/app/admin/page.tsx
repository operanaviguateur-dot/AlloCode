"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import LogoutButton from "@/components/LogoutButton";

export default function AdminPage() {
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [passwordError, setPasswordError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState("");
  const router = useRouter();

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("contact_messages")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching messages:", error);
    } else {
      setMessages(data || []);
    }
    setLoading(false);
  };

  const handleDeleteMessage = async (id: number) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer ce message ?")) return;

    const supabase = createClient();
    const { error } = await supabase
      .from("contact_messages")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Error deleting message:", error);
      alert("Erreur lors de la suppression du message");
    } else {
      setMessages(messages.filter((msg) => msg.id !== id));
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError("");
    setPasswordSuccess("");

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordError("Les mots de passe ne correspondent pas");
      return;
    }

    if (passwordData.newPassword.length < 6) {
      setPasswordError("Le mot de passe doit contenir au moins 6 caractères");
      return;
    }

    const supabase = createClient();
    const { error } = await supabase.auth.updateUser({
      password: passwordData.newPassword,
    });

    if (error) {
      setPasswordError(error.message);
    } else {
      setPasswordSuccess("Mot de passe modifié avec succès");
      setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
      setTimeout(() => setShowPasswordForm(false), 2000);
    }
  };

  return (
    <div className="pt-20 min-h-screen">
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <div>
              <p className="text-gray-400 mb-2">Admin / Messages</p>
              <h1 className="text-5xl font-bold text-white">
                Messages de contact
              </h1>
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => setShowPasswordForm(!showPasswordForm)}
                className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
              >
                Changer le mot de passe
              </button>
              <LogoutButton />
            </div>
          </div>

          {showPasswordForm && (
            <div className="mb-8 p-6 bg-gray-900 border border-gray-800 rounded-lg">
              <h2 className="text-xl font-bold text-white mb-4">Changer le mot de passe</h2>
              {passwordError && (
                <div className="mb-4 p-3 bg-red-900/50 border border-red-500 rounded text-red-300">
                  {passwordError}
                </div>
              )}
              {passwordSuccess && (
                <div className="mb-4 p-3 bg-green-900/50 border border-green-500 rounded text-green-300">
                  {passwordSuccess}
                </div>
              )}
              <form onSubmit={handlePasswordChange} className="space-y-4">
                <div>
                  <label className="block text-gray-300 mb-2">Nouveau mot de passe</label>
                  <input
                    type="password"
                    value={passwordData.newPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                    required
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-purple-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-2">Confirmer le mot de passe</label>
                  <input
                    type="password"
                    value={passwordData.confirmPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                    required
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-purple-500 transition-colors"
                  />
                </div>
                <div className="flex gap-4">
                  <button
                    type="submit"
                    className="px-6 py-3 bg-white text-[#08131c] rounded-lg font-medium hover:bg-gray-200 transition-colors"
                  >
                    Modifier
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowPasswordForm(false)}
                    className="px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
                  >
                    Annuler
                  </button>
                </div>
              </form>
            </div>
          )}

          <div className="bg-gray-900 border border-gray-800 rounded-lg overflow-hidden">
            {loading ? (
              <div className="p-12 text-center">
                <p className="text-gray-400 text-lg">Chargement...</p>
              </div>
            ) : messages && messages.length > 0 ? (
              <div className="divide-y divide-gray-800">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className="p-6 hover:bg-gray-800/50 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-white mb-1">
                          {message.name}
                        </h3>
                        <p className="text-gray-400 text-sm">{message.email}</p>
                      </div>
                      <div className="text-right">
                        <span className="inline-block px-3 py-1 bg-purple-900/50 text-purple-300 rounded-full text-sm mb-2">
                          {message.project_type || "Non spécifié"}
                        </span>
                        <p className="text-gray-500 text-xs">
                          {new Date(message.created_at).toLocaleDateString("fr-FR", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                    </div>
                    <p className="text-gray-300 whitespace-pre-wrap mb-4">{message.message}</p>
                    <button
                      onClick={() => handleDeleteMessage(message.id)}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
                    >
                      Supprimer
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-12 text-center">
                <p className="text-gray-400 text-lg">Aucun message pour le moment</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

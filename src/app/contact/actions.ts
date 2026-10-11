"use server";

import { createClient } from "@supabase/supabase-js";

type ContactPayload = {
  name: string;
  email: string;
  projectType: string;
  message: string;
};

export async function submitContactMessage(
  payload: ContactPayload,
): Promise<{ ok: true } | { ok: false }> {
  const name = payload.name.trim();
  const email = payload.email.trim();
  const message = payload.message.trim();
  const projectType = payload.projectType.trim();

  if (!name || !email || !message) {
    return { ok: false };
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    console.error("Missing Supabase env for contact form");
    return { ok: false };
  }

  // Use the anon key without the visitor's auth cookies.
  // INSERT is allowed for `anon`, not for a logged-in `authenticated` admin session.
  const supabase = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const { error } = await supabase.from("contact_messages").insert({
    name,
    email,
    project_type: projectType,
    message,
  });

  if (error) {
    console.error("Contact insert failed:", error);
    return { ok: false };
  }

  return { ok: true };
}

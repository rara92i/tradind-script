"use server";

import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");

  if (code) {
    const supabase = createRouteHandlerClient({ cookies });
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
      console.error("Erreur de connexion avec Supabase:", error.message);
      return NextResponse.redirect(
        new URL("/login?error=auth", requestUrl.origin)
      );
    }

    // Vérifier si la session est bien créée avant de rediriger
    if (!data.session) {
      console.error("Session non créée après l’authentification");
      return NextResponse.redirect(
        new URL("/login?error=session", requestUrl.origin)
      );
    }
  }

  return NextResponse.redirect(new URL("/dashboard", requestUrl.origin));
}

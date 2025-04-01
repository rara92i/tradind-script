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

    if (error || !data.session) {
      return NextResponse.redirect(new URL("/login?error=auth_failed", requestUrl.origin));
    }

    // On récupère les tokens d'authentification
    const { access_token, refresh_token } = data.session;

    // On redirige vers le dashboard en transmettant les tokens
    return NextResponse.redirect(new URL(`/dashboard?access_token=${access_token}&refresh_token=${refresh_token}`, requestUrl.origin));
  }

  return NextResponse.redirect(new URL("/login", requestUrl.origin));
}

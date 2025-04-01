"use server";

import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");

  if (!code) {
    return NextResponse.redirect(new URL("/login?error=no_code", requestUrl.origin));
  }

  const supabase = createRouteHandlerClient({ cookies });
  const { data, error } = await supabase.auth.exchangeCodeForSession(code);

  if (error || !data.session) {
    return NextResponse.redirect(new URL("/login?error=auth_failed", requestUrl.origin));
  }

  // 🔹 Vérification : Stocke les tokens en cookie pour assurer la persistance de la session
  const response = NextResponse.redirect(new URL("/dashboard", requestUrl.origin));
  response.cookies.set("sb-access-token", data.session.access_token, {
    httpOnly: true,
    secure: true,
    sameSite: "Lax",
    path: "/",
  });
  response.cookies.set("sb-refresh-token", data.session.refresh_token, {
    httpOnly: true,
    secure: true,
    sameSite: "Lax",
    path: "/",
  });

  return response;
}

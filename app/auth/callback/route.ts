 "use server";

import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");

  if (code) {
    const supabase = createRouteHandlerClient({ cookies });
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
      return NextResponse.redirect(
        new URL("/login?error=auth_failed", requestUrl.origin)
      );
    }

    // La session est déjà gérée via les cookies, donc on redirige simplement vers le dashboard
    return NextResponse.redirect(new URL("/dashboard", requestUrl.origin));
  }

  return NextResponse.redirect(new URL("/login", requestUrl.origin));
}
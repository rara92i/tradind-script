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

    if (!error && data?.session) {
      const token = data.session.access_token;
      return NextResponse.redirect(
        new URL(`/dashboard?token=${token}`, requestUrl.origin)
      );
    }
  }

  return NextResponse.redirect(new URL("/login", requestUrl.origin));
}

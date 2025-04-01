'use server';

import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');

  if (code) {
    const supabase = createRouteHandlerClient({ cookies });
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
      return NextResponse.redirect(new URL('/login?error=auth_failed', requestUrl.origin));
    }

    // Récupération des tokens
    const accessToken = data.session?.access_token;
    const refreshToken = data.session?.refresh_token;

    if (accessToken && refreshToken) {
      return NextResponse.redirect(
        new URL(`/dashboard?access_token=${accessToken}&refresh_token=${refreshToken}`, requestUrl.origin)
      );
    }
  }

  return NextResponse.redirect(new URL('/login', requestUrl.origin));
}

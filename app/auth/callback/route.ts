'use server';

import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  const next = requestUrl.searchParams.get('next') || '/dashboard'; // Ajout de la redirection dynamique

  if (code) {
    const supabase = createRouteHandlerClient({ cookies });
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
      console.error("Erreur d'échange de code:", error);
      return NextResponse.redirect(new URL('/login?error=auth_failed', requestUrl.origin));
    }

    return NextResponse.redirect(new URL(next, requestUrl.origin)); // Redirection vers la bonne page
  }

  return NextResponse.redirect(new URL('/login', requestUrl.origin));
}

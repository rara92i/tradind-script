'use server';

import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');

  if (!code) {
    console.error("Erreur : Aucun code trouvé dans l'URL");
    return NextResponse.redirect(new URL('/login', requestUrl.origin));
  }

  const supabase = createRouteHandlerClient({ cookies });
  const { data, error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    console.error("Erreur d'échange de session :", error.message);
    return NextResponse.redirect(new URL('/login', requestUrl.origin));
  }

  console.log("Session échangée avec succès :", data);
  return NextResponse.redirect(new URL('/dashboard', requestUrl.origin));
}

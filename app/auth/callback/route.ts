'use server';

import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');

  if (code) {
    const supabase = createRouteHandlerClient({ cookies });
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
      console.error('Erreur lors de l’échange du code:', error.message);
      return NextResponse.redirect(new URL('/login?error=auth_failed', requestUrl.origin));
    }

    // ✅ Vérifier que la session existe bien après l'échange du code
    const { data: session } = await supabase.auth.getSession();
    if (!session || !session.session) {
      console.error('Aucune session trouvée après connexion');
      return NextResponse.redirect(new URL('/login?error=no_session', requestUrl.origin));
    }
  }

  return NextResponse.redirect(new URL('/dashboard', requestUrl.origin));
}

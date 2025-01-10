import { NextResponse } from 'next/server'
// The client you created from the Server-Side Auth instructions
import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  // if "next" is in param, use it as the redirect URL
  const next = searchParams.get('next') ?? '/'
  const cookieStore = cookies()

  if (code) {
    const supabase = createClient(cookieStore)
    const { data, error } = await supabase.auth.exchangeCodeForSession(code)
    
    if (!error && data.session) {
      const providerToken = data.session.provider_token
      const providerRefreshToken = data.session.provider_refresh_token
      const userId = data.session.user.id

      // Store or update the provider token in user_meta
      const { error: upsertError } = await supabase
        .from('user_meta')
        .upsert(
          { 
            user_id: userId,
            provider_token: providerToken,
            provider_refresh_token: providerRefreshToken,
          },
          { 
            onConflict: 'user_id',
            ignoreDuplicates: false,
          }
        )

      if (upsertError) {
        console.error('Error storing provider token:', upsertError)
      }

      const forwardedHost = request.headers.get('x-forwarded-host')
      const isLocalEnv = process.env.NODE_ENV === 'development'
      
      if (isLocalEnv) {
        return NextResponse.redirect(`${origin}${next}`)
      } else if (forwardedHost) {
        return NextResponse.redirect(`https://${forwardedHost}${next}`)
      } else {
        return NextResponse.redirect(`${origin}${next}`)
      }
    }
  }

  // return the user to an error page with instructions
  return NextResponse.redirect(`${origin}/auth/auth-code-error`)
}
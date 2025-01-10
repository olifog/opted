'use client'

import { createClient } from '@/utils/supabase/client'
import { Button } from '@/components/ui/button'

export function AuthButton() {
  const supabase = createClient()

  const handleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback?next=/dashboard`,
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
      },
    })
  }

  return (
    <Button 
      onClick={handleLogin}
      className="w-full"
    >
      Continue with Google
    </Button>
  )
} 
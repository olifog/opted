import { redirect } from 'next/navigation'
import { AuthButton } from '@/components/auth/auth-button'
import { trpc } from '@/trpc/server'

export default async function LoginPage() {
  const user = await trpc.user.getSignedInUser()

  if (user) {
    redirect('/dashboard')
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-sm space-y-4 rounded-lg border p-6 shadow-lg">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-bold">Welcome Back</h1>
          <p className="text-gray-500">Sign in to your account to continue</p>
        </div>
        <AuthButton />
      </div>
    </div>
  )
} 
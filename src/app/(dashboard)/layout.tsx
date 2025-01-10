import { redirect } from 'next/navigation'
import { Sidebar } from '@/components/layout/sidebar'
import { trpc } from '@/trpc/server'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { data: { user } } = await trpc.user.getSignedInUser()

  if (!user) {
    redirect('/login')
  }

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar user={user} />
      <main className="flex-1 p-6">
        {children}
      </main>
    </div>
  )
} 
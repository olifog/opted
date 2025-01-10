export default function DashboardPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-lg border bg-card p-6">
          <h2 className="font-semibold">Welcome to OPTED</h2>
          <p className="text-sm text-muted-foreground">
            This is your dashboard. More features coming soon.
          </p>
        </div>
      </div>
    </div>
  )
} 
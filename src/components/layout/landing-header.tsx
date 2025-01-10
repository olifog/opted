import { Button } from "@/components/ui/button"
import { Logo } from "@/components/logo"
import Link from "next/link"

const navigation = [
  { name: 'Pricing', href: '/pricing' },
  { name: 'FAQ', href: '/faq' },
]

export function LandingHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto w-full max-w-screen-xl px-6">
        <nav className="flex h-14 items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/">
              <Logo />
            </Link>
          </div>
          <div className="flex items-center gap-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                {item.name}
              </Link>
            ))}
            <Button asChild variant="ghost" size="sm">
              <Link href="/login">Sign in</Link>
            </Button>
            <Button asChild size="sm">
              <Link href="/login">Get Started</Link>
            </Button>
          </div>
        </nav>
      </div>
    </header>
  )
} 
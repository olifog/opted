import { Button } from "@/components/ui/button"
import { Calendar, Clock, Brain, ArrowRight, ChevronRight } from "lucide-react"
import Link from "next/link"
import { LandingHeader } from "@/components/layout/landing-header"

const navigation = [
  { name: 'Pricing', href: '/pricing' },
  { name: 'FAQ', href: '/faq' },
]

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <LandingHeader />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="mx-auto w-full max-w-screen-xl px-6 flex flex-col items-center justify-center gap-4 pb-8 pt-32 text-center md:pb-12 md:pt-40 lg:py-32">
          <a
            href="/login"
            className="inline-flex items-center rounded-lg bg-muted px-3 py-1 text-sm font-medium gap-1"
          >
            🎉 <span className="sm:hidden">New:</span><span className="hidden sm:inline">Introducing OPTED:</span>Your AI Calendar Assistant
            <ChevronRight className="h-4 w-4" />
          </a>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            We optimize for{" "}
            <span className="text-primary">Joy.</span>
          </h1>
          <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
            Opted uses AI to automatically organize your life in Google
            Calendar, creating the perfect plan for short-term and long-term goals based on your deadlines and
            preferences.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button asChild size="lg" className="h-12 px-8">
              <Link href="/login">
                Get Started <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="h-12 px-8">
              <Link href="/pricing">View Pricing</Link>
            </Button>
          </div>
        </section>

        {/* Features Section */}
        <section className="mx-auto w-full max-w-screen-xl px-6 space-y-6 py-8 md:py-12 lg:py-24">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
            <h2 className="font-bold text-3xl leading-[1.1] sm:text-3xl md:text-5xl">
              Why Choose Opted?
            </h2>
            <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
              We&apos;re not a tool, we&apos;re a system.
            </p>
          </div>
          <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
            <div className="relative overflow-hidden rounded-lg border bg-background p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-4">
                <Brain className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-xl">AI-Powered Planning</h3>
              <p className="text-muted-foreground text-sm mt-2">
                Smart algorithms that understand your work patterns and optimize
                your schedule accordingly.
              </p>
            </div>
            <div className="relative overflow-hidden rounded-lg border bg-background p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-4">
                <Calendar className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-xl">Seamless Integration</h3>
              <p className="text-muted-foreground text-sm mt-2">
                Works directly with Google Calendar, no complex setup required.
              </p>
            </div>
            <div className="relative overflow-hidden rounded-lg border bg-background p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-4">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-xl">Smart Deadlines</h3>
              <p className="text-muted-foreground text-sm mt-2">
                Automatically prioritizes tasks based on deadlines and importance.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="border-t bg-muted/50">
          <div className="mx-auto w-full max-w-screen-xl px-6 flex flex-col items-center justify-center gap-4 py-12 text-center md:py-16">
            <h2 className="font-bold text-3xl leading-[1.1] sm:text-3xl md:text-4xl">
              Ready to optimize your schedule?
            </h2>
            <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
              Join thousands of professionals who trust Opted to manage their time effectively.
            </p>
            <Button asChild size="lg" className="mt-4">
              <Link href="/login">Start Free Trial</Link>
            </Button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t py-6 md:py-0">
        <div className="mx-auto w-full max-w-screen-xl px-6 flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
          <p className="text-sm text-muted-foreground">
            Built with ❤️ by OPTED. All rights reserved.
          </p>
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
          </div>
        </div>
      </footer>
    </div>
  )
}

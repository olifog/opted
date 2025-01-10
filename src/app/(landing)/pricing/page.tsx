import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"
import Link from "next/link"
import { LandingHeader } from "@/components/layout/landing-header"

const plans = [
  {
    name: "Free",
    description: "Perfect for getting started with AI calendar management",
    price: "Free",
    features: [
      "AI scheduling",
      "Google Calendar integration",
      "2 week time horizon",
      "Basic analytics",
      "Email support",
    ],
  },
  {
    name: "Power User",
    description: "For the min maxers.",
    price: "$10/month",
    comingSoon: true,
    features: [
      "Everything in Free",
      "Advanced AI scheduling that learns your patterns",
      "Priority support",
      "Advanced analytics & insights",
      "Custom scheduling rules",
      "Multiple calendar support",
    ],
  },
]

export default function PricingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <LandingHeader />

      <main className="flex-1">
        <section className="mx-auto w-full max-w-screen-xl px-6 flex flex-col items-center justify-center gap-4 pb-8 pt-16 text-center md:pb-12 md:pt-24">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Simple, transparent pricing
          </h1>
          <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
            Choose the plan that&apos;s right for you
          </p>
        </section>

        <section className="mx-auto w-full max-w-screen-xl px-6 pb-16">
          <div className="grid gap-6 sm:grid-cols-2 lg:gap-12">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className="relative flex flex-col rounded-2xl border bg-background p-6 shadow-sm"
              >
                {plan.comingSoon && (
                  <div className="absolute -top-3 right-6 inline-flex items-center rounded-full border bg-background px-3 py-1 text-xs font-semibold">
                    Coming Soon
                  </div>
                )}
                <div className="flex-1">
                  <h3 className="text-xl font-semibold">{plan.name}</h3>
                  <p className="mt-2 text-muted-foreground">{plan.description}</p>
                  <p className="mt-4">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    {plan.price !== "Free" && (
                      <span className="text-muted-foreground">/month</span>
                    )}
                  </p>
                  <ul className="mt-6 space-y-3">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-primary" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <Button
                  asChild
                  className="mt-6"
                  variant={plan.comingSoon ? "outline" : "default"}
                  disabled={plan.comingSoon}
                >
                  <Link href={plan.comingSoon ? "#" : "/login"}>
                    {plan.comingSoon ? "Coming Soon" : "Get Started"}
                  </Link>
                </Button>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t py-6 md:py-0">
        <div className="mx-auto w-full max-w-screen-xl px-6 flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
          <p className="text-sm text-muted-foreground">
            Built with ❤️ by OPTED. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
} 
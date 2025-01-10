import { LandingHeader } from "@/components/layout/landing-header"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
  {
    question: "What is OPTED?",
    answer: "OPTED is an AI-powered calendar assistant that helps you optimize your schedule by automatically organizing your tasks and meetings in Google Calendar based on your preferences and deadlines."
  },
  {
    question: "How does the AI scheduling work?",
    answer: "Our AI analyzes your work patterns, meeting preferences, and task deadlines to create the most efficient schedule possible. It considers factors like your peak productivity hours, meeting frequency preferences, and task priorities."
  },
  {
    question: "Is my calendar data secure?",
    answer: "Yes, we take security seriously. We only access the calendar data we need to function, and all data is encrypted in transit and at rest. We never share your data with third parties."
  },
  {
    question: "What's included in the free plan?",
    answer: "The free plan includes basic AI scheduling, Google Calendar integration, a 2 week time horizon, basic analytics, and email support. It's perfect for getting started with AI calendar management."
  },
  {
    question: "When will the Power User plan be available?",
    answer: "The Power User plan is coming soon! It will include advanced features like unlimited tasks, priority support, advanced analytics, custom scheduling rules, and multiple calendar support for $10/month."
  },
  {
    question: "Can I cancel my subscription anytime?",
    answer: "Yes, you can cancel your subscription at any time. For the free plan, there's nothing to cancel. For the Power User plan (when available), you can cancel from your account settings."
  },
  {
    question: "How do I get started?",
    answer: "Simply sign up for a free account, connect your Google Calendar, and start adding tasks. Our AI will begin optimizing your schedule immediately."
  }
]

export default function FAQPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <LandingHeader />

      <main className="flex-1">
        <section className="mx-auto w-full max-w-screen-xl px-6 flex flex-col items-center justify-center gap-4 pb-8 pt-16 text-center md:pb-12 md:pt-24">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Frequently Asked Questions
          </h1>
          <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
            Everything you need to know about OPTED
          </p>
        </section>

        <section className="mx-auto w-full max-w-3xl px-6 pb-16">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent>
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
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
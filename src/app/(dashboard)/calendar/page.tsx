import { Calendar } from "@/components/ui/calendar"
import { Card } from "@/components/ui/card"
import { addDays, format } from "date-fns"
import { Brain, Calendar as CalendarIcon, Clock, Target } from "lucide-react"

const sampleEvents = [
  {
    title: "Team Standup",
    date: addDays(new Date(), 1),
    type: "meeting",
    duration: "30m",
    icon: CalendarIcon,
  },
  {
    title: "Project Planning",
    date: addDays(new Date(), 1),
    type: "focus",
    duration: "2h",
    icon: Brain,
  },
  {
    title: "Client Presentation",
    date: addDays(new Date(), 2),
    type: "meeting",
    duration: "1h",
    icon: Target,
  },
]

const eventTypeStyles = {
  meeting: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300",
  focus: "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300",
}

export default function CalendarPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Calendar</h1>
        <p className="text-muted-foreground">
          Your AI-optimized schedule
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-[1fr,300px]">
        <Card className="p-6">
          <Calendar
            mode="single"
            selected={new Date()}
            className="rounded-md border"
          />
        </Card>

        <div className="space-y-6">
          <Card>
            <div className="p-6">
              <h3 className="font-semibold">Upcoming Events</h3>
              <div className="mt-4 space-y-4">
                {sampleEvents.map((event, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className={`mt-1 rounded-full p-1.5 ${eventTypeStyles[event.type as keyof typeof eventTypeStyles]}`}>
                      <event.icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="font-medium leading-none">
                        {event.title}
                      </p>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="mr-1 h-3 w-3" />
                        {event.duration} · {format(event.date, "MMM d")}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          <Card>
            <div className="p-6">
              <h3 className="font-semibold">Today&apos;s Focus Time</h3>
              <div className="mt-2">
                <div className="text-3xl font-bold">4.5h</div>
                <p className="text-sm text-muted-foreground">
                  2.5h more than yesterday
                </p>
              </div>
            </div>
          </Card>

          <Card>
            <div className="p-6">
              <h3 className="font-semibold">Schedule Health</h3>
              <div className="mt-2">
                <div className="text-3xl font-bold text-green-500">Good</div>
                <p className="text-sm text-muted-foreground">
                  Well-balanced mix of focus time and meetings
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
} 
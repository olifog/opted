import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, Clock, Target, TrendingUp } from "lucide-react"

const stats = [
  {
    title: "Tasks Completed",
    value: "24",
    description: "Last 7 days",
    icon: CheckCircle2,
    trend: "+5%",
  },
  {
    title: "Average Focus Time",
    value: "2.5h",
    description: "Per day",
    icon: Clock,
    trend: "+12%",
  },
  {
    title: "Goals Achieved",
    value: "8/10",
    description: "This month",
    icon: Target,
    trend: "+2",
  },
  {
    title: "Productivity Score",
    value: "85",
    description: "Out of 100",
    icon: TrendingUp,
    trend: "+3%",
  },
]

export default function StatsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Statistics</h1>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center text-xs text-muted-foreground">
                <span>{stat.description}</span>
                <span className="ml-2 text-green-600">{stat.trend}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Weekly Task Completion</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] flex items-center justify-center text-muted-foreground">
              Chart placeholder
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Focus Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] flex items-center justify-center text-muted-foreground">
              Chart placeholder
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 
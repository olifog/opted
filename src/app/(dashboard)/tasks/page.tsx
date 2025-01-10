import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { PlusCircle } from "lucide-react"
import { cn } from "@/lib/utils"

const exampleTasks = [
  {
    id: 1,
    title: "Review project proposal",
    completed: false,
    dueDate: "2024-03-20",
    priority: "High",
  },
  {
    id: 2,
    title: "Team meeting preparation",
    completed: true,
    dueDate: "2024-03-19",
    priority: "Medium",
  },
  {
    id: 3,
    title: "Update documentation",
    completed: false,
    dueDate: "2024-03-22",
    priority: "Low",
  },
]

export default function TasksPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Tasks</h1>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Task
        </Button>
      </div>

      <div className="grid gap-4">
        {exampleTasks.map((task) => (
          <Card key={task.id} className="p-4">
            <div className="flex items-center gap-4">
              <Checkbox checked={task.completed} />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className={cn("font-medium", task.completed && "line-through text-muted-foreground")}>
                    {task.title}
                  </h3>
                  <span className={cn(
                    "text-xs px-2 py-0.5 rounded-full",
                    task.priority === "High" && "bg-red-100 text-red-700",
                    task.priority === "Medium" && "bg-yellow-100 text-yellow-700",
                    task.priority === "Low" && "bg-green-100 text-green-700",
                  )}>
                    {task.priority}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Due {new Date(task.dueDate).toLocaleDateString()}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
} 
'use client'

import { format } from 'date-fns'
import { Calendar, Clock } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import type { Task } from '@/components/tasks/types'

interface TaskDetailsProps {
  task: Task
  onEdit: (task: Task) => void
  onAddSubtask: (parentTask: Task) => void
  onUpdateTask: (taskId: number, data: Partial<Task>) => void
  onDelete: (taskId: number) => void
}

export function TaskDetails({ task, onEdit, onAddSubtask, onUpdateTask, onDelete }: TaskDetailsProps) {
  return (
    <Card className="p-6 space-y-6">
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-bold">{task.name}</h2>
            {task.description && (
              <p className="mt-2 text-muted-foreground">{task.description}</p>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => onEdit(task)}>
              Edit
            </Button>
            <Button variant="outline" size="sm" onClick={() => onDelete(task.id)}>Delete</Button>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Checkbox
              checked={task.complete}
              onCheckedChange={(checked) => {
                onUpdateTask(task.id, { complete: !!checked })
              }}
            />
            <span className="text-sm">
              {task.complete ? 'Completed' : 'In Progress'}
            </span>
          </div>
        </div>

        {(task.deadline || task.startline || task.time_estimate) && (
          <div className="flex flex-col gap-2">
            {task.deadline && (
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4" />
                <span>Due {format(new Date(task.deadline), 'MMMM d, yyyy h:mma')}</span>
              </div>
            )}
            {task.startline && (
              <div className="flex items-center gap-2 text-sm">
                <Clock className="h-4 w-4" />
                <span>Start {format(new Date(task.startline), 'MMMM d, yyyy h:mma')}</span>
              </div>
            )}
            {task.time_estimate && (
              <div className="flex items-center gap-2 text-sm">
                <Clock className="h-4 w-4" />
                <span>Estimated {task.time_estimate} minutes</span>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">Subtasks</h3>
          <Button variant="outline" size="sm" onClick={() => onAddSubtask(task)}>
            Add Subtask
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Checkbox
            checked={task.enforce_child_order}
            onCheckedChange={(checked) => {
              onUpdateTask(task.id, { enforce_child_order: !!checked })
            }}
          />
          <span className="text-sm">
            Force subtasks to be completed in order
          </span>
        </div>
      </div>
    </Card>
  )
} 
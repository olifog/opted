'use client'

import { format } from 'date-fns'
import { Checkbox } from '@/components/ui/checkbox'
import { Clock, Plus, GripVertical } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { Task } from '@/components/tasks/types'
import type { DraggableSyntheticListeners } from '@dnd-kit/core'

interface TaskItemProps {
  task: Task
  isSelected: boolean
  onClick: () => void
  onUpdateTask: (taskId: number, data: Partial<Task>) => void
  onAddSubtask: () => void
  dragHandleProps?: DraggableSyntheticListeners
}

export function TaskItem({ task, isSelected, onClick, onUpdateTask, onAddSubtask, dragHandleProps }: TaskItemProps) {
  return (
    <div
      className={`
        flex-1 flex items-center gap-2 py-1 px-1.5 rounded-sm cursor-pointer
        hover:bg-muted/50
        ${isSelected ? 'bg-muted/50' : ''}
      `}
      onClick={onClick}
    >
      <Button
        variant="ghost"
        size="icon"
        className="h-7 w-7 cursor-grab active:cursor-grabbing"
        {...dragHandleProps}
      >
        <GripVertical className="h-4 w-4" />
      </Button>
      <Checkbox
        checked={task.complete}
        onCheckedChange={(checked) => {
          onUpdateTask(task.id, { complete: !!checked })
        }}
        onClick={(e) => e.stopPropagation()}
        className="h-4 w-4"
      />
      <div className="flex-1 min-w-0 flex items-center gap-2">
        <span className={`font-medium truncate ${task.complete ? 'line-through text-muted-foreground' : ''}`}>
          {task.name}
        </span>
        <div className="flex items-center gap-2 text-xs text-muted-foreground shrink-0">
          {task.deadline && (
            <span>Due {format(new Date(task.deadline), 'MMM d, h:mma')}</span>
          )}
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span>{task.time_estimate}m</span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 ml-1"
            onClick={(e) => {
              e.stopPropagation()
              onAddSubtask()
            }}
            data-no-dnd="true"
          >
            <Plus className="h-3 w-3" />
          </Button>
        </div>
      </div>
    </div>
  )
} 
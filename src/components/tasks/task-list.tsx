'use client'

import { useState } from 'react'
import { ChevronRight, ChevronDown } from 'lucide-react'
import { SortableTaskItem } from '@/components/tasks/sortable-task-item'
import type { Task } from '@/components/tasks/types'
import {
  DndContext,
  DragEndEvent,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'

interface TaskListProps {
  tasks: Task[]
  parentId?: number
  onTaskSelect: (task: Task) => void
  selectedTaskId?: number
  onAddSubtask: (parentTask: Task) => void
  onUpdateTask: (taskId: number, data: Partial<Task>) => void
  onReorderTask: (taskId: number, newParentId: number | null, newIndex: number) => void
}

export function TaskList({
  tasks,
  parentId,
  onTaskSelect,
  selectedTaskId,
  onAddSubtask,
  onUpdateTask,
  onReorderTask,
}: TaskListProps) {
  const [expandedTasks, setExpandedTasks] = useState<Set<number>>(new Set())

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  )

  const toggleExpand = (taskId: number) => {
    const newExpanded = new Set(expandedTasks)
    if (newExpanded.has(taskId)) {
      newExpanded.delete(taskId)
    } else {
      newExpanded.add(taskId)
    }
    setExpandedTasks(newExpanded)
  }

  const parentTasks = tasks.filter(task => 
    parentId ? task.parent_task_id === parentId : !task.parent_task_id
  ).sort((a, b) => {
    // First try to sort by parent_task_index
    if (a.parent_task_index !== null && b.parent_task_index !== null) {
      return a.parent_task_index - b.parent_task_index
    }
    
    // If either task doesn't have an index, fall back to creation time
    const aTime = new Date(a.created_at).getTime()
    const bTime = new Date(b.created_at).getTime()
    if (aTime !== bTime) {
      return aTime - bTime
    }
    
    // If created at the exact same time, use ID as final tiebreaker
    return a.id - b.id
  })

  const handleDragStart = (event: DragStartEvent) => {
    const activeId = event.active.id as number
    // Expand the parent task when starting to drag
    const activeTask = tasks.find(t => t.id === activeId)
    if (activeTask?.parent_task_id) {
      setExpandedTasks(prev => new Set([...prev, activeTask.parent_task_id!]))
    }
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    
    if (!over) return

    const activeTask = tasks.find(t => t.id === active.id)
    const overTask = tasks.find(t => t.id === over.id)
    
    if (!activeTask || !overTask) return

    // Don't allow dropping a task onto itself
    if (activeTask.id === overTask.id) return

    // Get siblings to calculate the index
    const siblingTasks = tasks.filter((t: Task) => t.parent_task_id === overTask.parent_task_id).sort((a, b) => (a.parent_task_index ?? 0) - (b.parent_task_index ?? 0))

    // Pass the reorder event up to the parent
    onReorderTask(
      activeTask.id,
      overTask.parent_task_id,
      siblingTasks.findIndex(t => t.id === overTask.id)
    )
  }

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="space-y-1">
        <SortableContext
          items={parentTasks.map(t => t.id)}
          strategy={verticalListSortingStrategy}
        >
          {parentTasks.map(task => {
            const hasChildren = tasks.some(t => t.parent_task_id === task.id)
            const isExpanded = expandedTasks.has(task.id)

            return (
              <div key={task.id} className="space-y-1">
                <div className="flex items-center gap-1">
                  {hasChildren && (
                    <button
                      onClick={() => toggleExpand(task.id)}
                      className="p-1 hover:bg-muted rounded-sm"
                      data-no-dnd="true"
                    >
                      {isExpanded ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      )}
                    </button>
                  )}
                  {!hasChildren && <div className="w-6" />}
                  <SortableTaskItem
                    task={task}
                    isSelected={task.id === selectedTaskId}
                    onClick={() => onTaskSelect(task)}
                    onUpdateTask={onUpdateTask}
                    onAddSubtask={() => onAddSubtask(task)}
                  />
                </div>
                {isExpanded && hasChildren && (
                  <div className="ml-4 pl-4 border-l">
                    <TaskList
                      tasks={tasks}
                      parentId={task.id}
                      onTaskSelect={onTaskSelect}
                      selectedTaskId={selectedTaskId}
                      onAddSubtask={onAddSubtask}
                      onUpdateTask={onUpdateTask}
                      onReorderTask={onReorderTask}
                    />
                  </div>
                )}
              </div>
            )
          })}
        </SortableContext>
      </div>
    </DndContext>
  )
} 
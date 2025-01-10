import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { TaskItem } from './task-item'
import type { Task } from './types'

interface SortableTaskItemProps {
  task: Task
  isSelected: boolean
  onClick: () => void
  onUpdateTask: (taskId: number, data: Partial<Task>) => void
  onAddSubtask: () => void
}

export function SortableTaskItem({ task, ...props }: SortableTaskItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: task.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : undefined
  }

  return (
    <div ref={setNodeRef} style={style} {...attributes}>
      <TaskItem
        task={task}
        dragHandleProps={listeners}
        {...props}
      />
    </div>
  )
} 
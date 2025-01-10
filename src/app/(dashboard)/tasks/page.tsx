'use client'

import { useState } from 'react'
import { TaskList } from '@/components/tasks/task-list'
import { TaskDetails } from '@/components/tasks/task-details'
import { TaskModal } from '@/components/tasks/task-modal'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { trpc } from '@/trpc/client'
import type { Task } from '@/components/tasks/types'

interface TaskModalState {
  open: boolean
  task?: Task
  parentTask?: Task
}

export default function TasksPage() {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)
  const [modalState, setModalState] = useState<TaskModalState>({
    open: false
  })

  const utils = trpc.useUtils()
  const { data: tasks } = trpc.task.getTasks.useQuery()
  const { mutate: createTask } = trpc.task.createTask.useMutation({
    onSuccess: () => {
      utils.task.getTasks.invalidate()
    }
  })
  const { mutate: deleteTask } = trpc.task.deleteTask.useMutation({
    onSuccess: () => {
      utils.task.getTasks.invalidate()
      setSelectedTask(null)
    }
  })
  const { mutate: updateTask } = trpc.task.updateTask.useMutation({
    onMutate: async (updatedTask) => {
      // Cancel outgoing refetches
      await utils.task.getTasks.cancel()

      // Snapshot the previous value
      const previousTasks = utils.task.getTasks.getData()

      // Optimistically update to the new value
      utils.task.getTasks.setData(undefined, (old) => {
        if (!old?.data) return old
        return {
          ...old,
          data: old.data.map(task => 
            task.id === updatedTask.id
              ? { ...task, ...updatedTask }
              : task
          )
        }
      })

      // If this is the selected task, update it as well
      if (selectedTask?.id === updatedTask.id) {
        setSelectedTask(prev => prev ? { ...prev, ...updatedTask } : prev)
      }

      // Return a context object with the snapshotted value
      return { previousTasks, previousSelectedTask: selectedTask }
    },
    onError: (err, newTask, context) => {
      // If the mutation fails, use the context returned from onMutate to roll back
      if (context?.previousTasks) {
        utils.task.getTasks.setData(undefined, context.previousTasks)
      }
      if (context?.previousSelectedTask) {
        setSelectedTask(context.previousSelectedTask)
      }
    },
    onSettled: () => {
      // Always refetch after error or success to ensure data is in sync with server
      utils.task.getTasks.invalidate()
    }
  })
  const { mutate: updateTaskLocations } = trpc.task.updateTaskLocations.useMutation({
    onMutate: async ({ tasks: updatedTasks }) => {
      // Cancel outgoing refetches
      await utils.task.getTasks.cancel()

      // Snapshot the previous value
      const previousTasks = utils.task.getTasks.getData()

      // Optimistically update to the new value
      utils.task.getTasks.setData(undefined, (old) => {
        if (!old?.data) return old
        return {
          ...old,
          data: old.data.map(task => {
            const update = updatedTasks.find(u => u.id === task.id)
            if (!update) return task
            return {
              ...task,
              parent_task_id: update.parentTaskId ?? null,
              parent_task_index: update.parentTaskIndex ?? null
            }
          })
        }
      })

      // Return a context object with the snapshotted value
      return { previousTasks }
    },
    onError: (err, newTask, context) => {
      // If the mutation fails, use the context returned from onMutate to roll back
      if (context?.previousTasks) {
        utils.task.getTasks.setData(undefined, context.previousTasks)
      }
    },
    onSettled: () => {
      // Always refetch after error or success to ensure data is in sync with server
      utils.task.getTasks.invalidate()
    }
  })

  const handleTaskSubmit = (data: {
    id?: number
    name: string
    description?: string
    deadline?: string
    startline?: string
    parentTaskId?: number
    parentTaskIndex?: number
    timeEstimate: number
  }) => {
    if (data.id) {
      // This is an edit operation
      updateTask({
        id: data.id,
        name: data.name,
        description: data.description,
        deadline: data.deadline,
        startline: data.startline,
        parentTaskId: data.parentTaskId,
        parentTaskIndex: data.parentTaskIndex,
        timeEstimate: data.timeEstimate,
      })
    } else {
      // This is a create operation
      // If we're adding a subtask, calculate the next index
      let parentTaskIndex = data.parentTaskIndex
      if (data.parentTaskId && !parentTaskIndex && tasks?.data) {
        const existingSubtasks = tasks.data.filter(
          task => task.parent_task_id === data.parentTaskId
        )
        parentTaskIndex = existingSubtasks.length
      }

      createTask({
        name: data.name,
        description: data.description,
        deadline: data.deadline,
        startline: data.startline,
        parentTaskId: data.parentTaskId,
        parentTaskIndex,
        enforceChildOrder: true,
        timeEstimate: data.timeEstimate,
      })
    }
  }

  const handleTaskUpdate = (taskId: number, data: Partial<Task>) => {
    const task = tasks?.data?.find(t => t.id === taskId)
    if (!task) return

    // change all nulls to undefined
    const updatedData = Object.fromEntries(
      Object.entries(data).map(([key, value]) => [key, value ?? undefined])
    )

    updateTask({
      id: taskId,
      ...updatedData,
    })
  }

  const handleTaskDelete = (taskId: number) => {
    deleteTask({
      id: taskId
    })
  }

  const handleTaskReorder = (taskId: number, newParentId: number | null, newIndex: number) => {
    const activeTask = tasks?.data?.find(t => t.id === taskId)
    if (!activeTask || !tasks?.data) return

    console.log(activeTask)
    console.log(newIndex)

    const updates: { id: number, parentTaskId?: number, parentTaskIndex: number }[] = []

    // Get all tasks that will be siblings after the move
    const siblingTasks = tasks.data.filter(t => t.parent_task_id === newParentId).sort((a, b) => (a.parent_task_index ?? 0) - (b.parent_task_index ?? 0))
    const oldSiblingTasks = tasks.data.filter(t => t.parent_task_id === activeTask.parent_task_id).sort((a, b) => (a.parent_task_index ?? 0) - (b.parent_task_index ?? 0))
    
    // If we're moving within the same parent
    if (newParentId === activeTask.parent_task_id) {
      const oldIndex = siblingTasks.findIndex(t => t.id === activeTask.id)

      console.log(siblingTasks)
      console.log(oldIndex)
      
      // Update indices for all affected tasks
      siblingTasks.forEach((task, i) => {
        if (task.id === activeTask.id) return // Skip the task being moved
        
        let newTaskIndex = i
        if (oldIndex < newIndex) {
          // Moving down: shift tasks up
          if (i > oldIndex && i <= newIndex) newTaskIndex = i - 1
        } else {
          // Moving up: shift tasks down
          if (i >= newIndex && i < oldIndex) newTaskIndex = i + 1
        }
        
        if (newTaskIndex !== task.parent_task_index) {
          updates.push({ id: task.id, parentTaskId: newParentId ?? undefined, parentTaskIndex: newTaskIndex })
        }
      })
      
      // Add the moved task
      updates.push({ id: activeTask.id, parentTaskId: newParentId ?? undefined, parentTaskIndex: newIndex })
    } else {
      // Moving to a different parent
      // First, reindex the old siblings to close the gap
      oldSiblingTasks.forEach((task, i) => {
        if (task.id === activeTask.id) return // Skip the task being moved
        const oldIndex = task.parent_task_index ?? 0
        const newTaskIndex = oldIndex > (activeTask.parent_task_index ?? 0) ? oldIndex - 1 : i
        if (newTaskIndex !== task.parent_task_index) {
          updates.push({ id: task.id, parentTaskId: newParentId ?? undefined, parentTaskIndex: newTaskIndex })
        }
      })

      // Then, make space in the new location and update indices
      siblingTasks.forEach((task, i) => {
        if (i >= newIndex) {
          updates.push({ id: task.id, parentTaskIndex: i + 1 })
        }
      })

      // Finally, add the moved task
      updates.push({
        id: activeTask.id,
        parentTaskId: newParentId ?? undefined,
        parentTaskIndex: newIndex
      })
    }

    // Update all tasks in a single mutation
    updateTaskLocations({ tasks: updates })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Tasks</h1>
          <p className="text-muted-foreground">
            Manage and organize your tasks
          </p>
        </div>
        <Button onClick={() => setModalState({ open: true })}>
          <Plus className="h-4 w-4 mr-2" />
          Add Task
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-[1fr,400px]">
        <div className="min-h-[500px] rounded-lg">
          {tasks && (
            <TaskList
              tasks={tasks.data || []}
              onTaskSelect={setSelectedTask}
              selectedTaskId={selectedTask?.id}
              onAddSubtask={(parentTask) => setModalState({
                open: true,
                parentTask
              })}
              onUpdateTask={handleTaskUpdate}
              onReorderTask={handleTaskReorder}
            />
          )}
        </div>

        {selectedTask && (
          <TaskDetails
            task={selectedTask}
            onDelete={handleTaskDelete}
            onEdit={(task) => setModalState({
              open: true,
              task,
              parentTask: task.parent_task_id ? tasks?.data?.find(t => t.id === task.parent_task_id) : undefined
            })}
            onAddSubtask={(parentTask) => setModalState({
              open: true,
              parentTask
            })}
            onUpdateTask={handleTaskUpdate}
          />
        )}
      </div>

      <TaskModal
        open={modalState.open}
        onOpenChange={(open) => setModalState({ open })}
        task={modalState.task}
        parentTask={modalState.parentTask}
        onSubmit={handleTaskSubmit}
      />
    </div>
  )
} 
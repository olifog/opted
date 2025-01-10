'use client'

import { useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { format } from 'date-fns'
import { Calendar as CalendarIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Task } from '@/components/tasks/types'

interface TaskModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  task?: Task
  parentTask?: Task
  onSubmit: (data: {
    id?: number
    name: string
    description?: string
    deadline?: string
    startline?: string
    parentTaskId?: number
    parentTaskIndex?: number
    timeEstimate: number
  }) => void
}

export function TaskModal({ open, onOpenChange, task, parentTask, onSubmit }: TaskModalProps) {
  const [name, setName] = useState(task?.name ?? '')
  const [description, setDescription] = useState(task?.description ?? '')
  const [deadline, setDeadline] = useState<Date | undefined>(
    task?.deadline ? new Date(task.deadline) : undefined
  )
  const [startline, setStartline] = useState<Date | undefined>(
    task?.startline ? new Date(task.startline) : undefined
  )
  const [timeEstimate, setTimeEstimate] = useState<number | undefined>(task?.time_estimate ?? 60)

  useEffect(() => {
    if (task) {
      setName(task.name)
      setDescription(task.description ?? '')
      setDeadline(task.deadline ? new Date(task.deadline) : undefined)
      setStartline(task.startline ? new Date(task.startline) : undefined)
      setTimeEstimate(task.time_estimate)
    }
  }, [task, task?.name, task?.description, task?.deadline, task?.startline, task?.time_estimate])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (timeEstimate === undefined) return // Prevent submit if no time estimate
    onSubmit({
      id: task?.id,
      name,
      description: description || undefined,
      deadline: deadline?.toISOString(),
      startline: startline?.toISOString(),
      parentTaskId: parentTask?.id,
      // If editing a task that already has a parent, keep its index
      parentTaskIndex: task?.parent_task_index ?? undefined,
      timeEstimate,
    })
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {task ? 'Edit Task' : parentTask ? 'Add Subtask' : 'Add Task'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium">
              Name
            </label>
            <Input
              id="name"
              value={name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
              placeholder="Enter task name"
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-medium">
              Description
            </label>
            <Textarea
              id="description"
              value={description}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)}
              placeholder="Enter task description"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="timeEstimate" className="text-sm font-medium">
              Time Estimate (minutes)
            </label>
            <Input
              id="timeEstimate"
              type="number"
              min={0}
              value={timeEstimate ?? ''}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const value = e.target.value === '' ? undefined : parseInt(e.target.value)
                setTimeEstimate(value)
              }}
              required
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium">Start Date & Time</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      'w-full justify-start text-left font-normal',
                      !startline && 'text-muted-foreground'
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {startline ? format(startline, 'PPp') : 'Pick date & time'}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <div className="border-b border-border p-4">
                    <Calendar
                      mode="single"
                      selected={startline}
                      onSelect={setStartline}
                      initialFocus
                    />
                  </div>
                  {startline && (
                    <div className="p-4 border-t border-border">
                      <Input
                        type="time"
                        value={format(startline, 'HH:mm')}
                        onChange={(e) => {
                          if (!e.target.value) return
                          const [hours, minutes] = e.target.value.split(':')
                          const newDate = new Date(startline)
                          newDate.setHours(parseInt(hours) || 0)
                          newDate.setMinutes(parseInt(minutes) || 0)
                          setStartline(newDate)
                        }}
                      />
                    </div>
                  )}
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Due Date & Time</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      'w-full justify-start text-left font-normal',
                      !deadline && 'text-muted-foreground'
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {deadline ? format(deadline, 'PPp') : 'Pick date & time'}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <div className="border-b border-border p-4">
                    <Calendar
                      mode="single"
                      selected={deadline}
                      onSelect={setDeadline}
                      initialFocus
                    />
                  </div>
                  {deadline && (
                    <div className="p-4 border-t border-border">
                      <Input
                        type="time"
                        value={format(deadline, 'HH:mm')}
                        onChange={(e) => {
                          if (!e.target.value) return
                          const [hours, minutes] = e.target.value.split(':')
                          const newDate = new Date(deadline)
                          newDate.setHours(parseInt(hours) || 0)
                          newDate.setMinutes(parseInt(minutes) || 0)
                          setDeadline(newDate)
                        }}
                      />
                    </div>
                  )}
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">
              {task ? 'Save Changes' : 'Create Task'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
} 
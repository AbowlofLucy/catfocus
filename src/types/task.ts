export type TaskCategory = 'Study' | 'Work' | 'Personal' | 'Other'
export type TaskStatus = 'active' | 'completed'

export type AttachmentMeta = {
  name: string
  size: number
  type: string
}

export type Task = {
  id: string
  name: string
  deadline: string
  durationHours: number
  category: TaskCategory
  notes: string
  attachments: AttachmentMeta[]
  status: TaskStatus
  createdAt: string
  completedAt: string | null
}

export type ActiveTimer = {
  taskId: string
  startedAt: number
  durationSeconds: number
  pausedAt: number | null
  totalPausedMs: number
}

import type { ActiveTimer, Task } from '../types/task'

const TASKS_KEY = 'catfocus.tasks.v1'
const TIMER_KEY = 'catfocus.timer.v1'

export function loadTasks(): Task[] {
  try {
    const raw = localStorage.getItem(TASKS_KEY)
    return raw ? (JSON.parse(raw) as Task[]) : []
  } catch {
    return []
  }
}

export function saveTasks(tasks: Task[]) {
  localStorage.setItem(TASKS_KEY, JSON.stringify(tasks))
}

export function loadTimer(): ActiveTimer | null {
  try {
    const raw = localStorage.getItem(TIMER_KEY)
    return raw ? (JSON.parse(raw) as ActiveTimer) : null
  } catch {
    return null
  }
}

export function saveTimer(timer: ActiveTimer | null) {
  if (!timer) {
    localStorage.removeItem(TIMER_KEY)
    return
  }
  localStorage.setItem(TIMER_KEY, JSON.stringify(timer))
}

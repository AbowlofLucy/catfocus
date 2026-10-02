import { useEffect, useState } from 'react'
import type { Task } from '../types/task'
import { loadTasks, saveTasks } from '../utils/storage'

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>(loadTasks)

  useEffect(() => {
    saveTasks(tasks)
  }, [tasks])

  function addTask(task: Task) {
    setTasks((prev) => [task, ...prev])
  }

  function completeTask(taskId: string) {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId
          ? { ...task, status: 'completed', completedAt: new Date().toISOString() }
          : task,
      ),
    )
  }

  function removeTask(taskId: string) {
    setTasks((prev) => prev.filter((task) => task.id !== taskId))
  }

  return { tasks, addTask, completeTask, removeTask }
}

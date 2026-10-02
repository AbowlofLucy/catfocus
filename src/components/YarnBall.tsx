import type { Task } from '../types/task'

type Props = {
  task: Task
  index: number
  onOpen: (task: Task) => void
}

const yarnClasses = ['yarn-sage', 'yarn-blue', 'yarn-rose', 'yarn-taupe', 'yarn-lilac']

export default function YarnBall({ task, index, onOpen }: Props) {
  const radius = 205 + (index % 3) * 58
  const duration = 34 + (index % 5) * 8
  const delay = -(index * 6.5)
  return (
    <div
      className="orbit-track"
      style={{ width: radius * 2, height: radius * 2, animationDuration: `${duration}s`, animationDelay: `${delay}s` }}
    >
      <button
        className={`yarn-ball ${yarnClasses[index % yarnClasses.length]}`}
        style={{ animationDuration: `${duration}s`, animationDelay: `${delay}s` }}
        onClick={() => onOpen(task)}
        title={`${task.name} · ${task.durationHours}h · ${task.deadline}`}
      >
        <span className="yarn-lines">⌁</span>
        <span className="yarn-name">{task.name}</span>
      </button>
    </div>
  )
}

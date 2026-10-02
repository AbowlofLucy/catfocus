import CatFace from './CatFace'
import type { Task } from '../types/task'
import { formatDuration } from '../utils/time'

type Props = {
  task: Task
  elapsed: number
  remaining: number
  paused: boolean
  onPause: () => void
  onStop: () => void
  onDone: () => void
}

export default function TimerView({ task, elapsed, remaining, paused, onPause, onStop, onDone }: Props) {
  return (
    <main className="focus-screen">
      <button className="done-food" onClick={onDone}><span>🥫</span> 我弄完了！</button>
      <div className="timer-stack">
        <p className="timer-label">{paused ? 'PAUSED' : 'FOCUS TIME'}</p>
        <div className="big-timer">{formatDuration(elapsed)}</div>
        <p className="remaining">距离小猫喊饿还有 {formatDuration(remaining)}</p>
      </div>
      <div className="focus-cat-wrap">
        <CatFace mode="play" />
        <h2>小猫玩耍中…</h2>
        <p>{task.name}</p>
        <span className="soft-meta">Deadline · {task.deadline}</span>
      </div>
      <div className="focus-actions">
        <button className="secondary-button" onClick={onPause}>{paused ? '继续' : '暂停'}</button>
        <button className="text-button" onClick={onStop}>停止计时</button>
      </div>
    </main>
  )
}

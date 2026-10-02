import type { ActiveTimer } from '../types/task'

export function elapsedSeconds(timer: ActiveTimer, now = Date.now()) {
  const end = timer.pausedAt ?? now
  return Math.max(0, Math.floor((end - timer.startedAt - timer.totalPausedMs) / 1000))
}

export function remainingSeconds(timer: ActiveTimer, now = Date.now()) {
  return Math.max(0, timer.durationSeconds - elapsedSeconds(timer, now))
}

export function formatDuration(totalSeconds: number) {
  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60
  return [hours, minutes, seconds].map((v) => String(v).padStart(2, '0')).join(':')
}

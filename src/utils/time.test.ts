import { describe, expect, it } from 'vitest'
import { elapsedSeconds, formatDuration, remainingSeconds } from './time'

describe('time helpers', () => {
  it('formats seconds as hh:mm:ss', () => {
    expect(formatDuration(3661)).toBe('01:01:01')
  })

  it('accounts for paused time', () => {
    const timer = {
      taskId: 'x',
      startedAt: 1_000,
      durationSeconds: 60,
      pausedAt: null,
      totalPausedMs: 5_000,
    }
    expect(elapsedSeconds(timer, 16_000)).toBe(10)
    expect(remainingSeconds(timer, 16_000)).toBe(50)
  })
})

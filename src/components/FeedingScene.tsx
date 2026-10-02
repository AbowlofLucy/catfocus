import { useEffect, useState } from 'react'
import CatFace from './CatFace'
import type { Task } from '../types/task'

type Props = {
  task: Task
  onComplete: () => void
  onCancel: () => void
}

export default function FeedingScene({ task, onComplete, onCancel }: Props) {
  const [scoops, setScoops] = useState(0)
  const [phase, setPhase] = useState<'waiting' | 'eating' | 'full'>('waiting')

  useEffect(() => {
    if (scoops === 3 && phase === 'waiting') {
      setPhase('eating')
      const timer = window.setTimeout(() => setPhase('full'), 5000)
      return () => clearTimeout(timer)
    }
  }, [scoops, phase])

  return (
    <main className="feeding-screen">
      {phase === 'waiting' && (
        <>
          <p className="eyebrow">TASK COMPLETE</p>
          <h1>小猫在饭盆前等你</h1>
          <CatFace mode="idle" />
          <div className="bowl-wrap">
            <div className="bowl">
              <div className="food-fill" style={{ height: `${scoops * 26}%` }} />
            </div>
            <button className="feed-button" disabled={scoops >= 3} onClick={() => setScoops((v) => Math.min(3, v + 1))}>＋ 加粮</button>
            <p>{scoops}/3</p>
          </div>
          <button className="text-button" onClick={onCancel}>还没完成，返回</button>
        </>
      )}

      {phase === 'eating' && (
        <>
          <h1>干饭小猫启动！</h1>
          <CatFace mode="eat" />
          <div className="eating-bowl">🥣</div>
          <p className="soft-meta">正在认真吃饭 5 秒…</p>
        </>
      )}

      {phase === 'full' && (
        <>
          <h1>主人，我吃饱啦！</h1>
          <CatFace mode="full" />
          <p>“{task.name}” 已经完成，小猫也获得了奖励。</p>
          <button className="paw-button" onClick={onComplete}>🐾 返回首页</button>
        </>
      )}
    </main>
  )
}

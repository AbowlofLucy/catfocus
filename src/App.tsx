import { useEffect, useMemo, useState } from 'react'
import AddTaskModal from './components/AddTaskModal'
import CatFace from './components/CatFace'
import FeedingScene from './components/FeedingScene'
import FilterPanel from './components/FilterPanel'
import HungryOverlay from './components/HungryOverlay'
import TaskCard from './components/TaskCard'
import TimerView from './components/TimerView'
import YarnBall from './components/YarnBall'
import { useTasks } from './hooks/useTasks'
import type { ActiveTimer, Task } from './types/task'
import { loadTimer, saveTimer } from './utils/storage'
import { elapsedSeconds, remainingSeconds } from './utils/time'

function App() {
  const { tasks, addTask, completeTask, removeTask } = useTasks()
  const [addOpen, setAddOpen] = useState(false)
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)
  const [durationFilter, setDurationFilter] = useState('all')
  const [dateFilter, setDateFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('active')
  const [activeTimer, setActiveTimer] = useState<ActiveTimer | null>(loadTimer)
  const [now, setNow] = useState(Date.now())
  const [hungry, setHungry] = useState(false)
  const [notifiedTimerStart, setNotifiedTimerStart] = useState<number | null>(null)
  const [feedingTask, setFeedingTask] = useState<Task | null>(null)

  useEffect(() => {
    saveTimer(activeTimer)
  }, [activeTimer])

  useEffect(() => {
    if (!activeTimer || activeTimer.pausedAt) return
    const id = window.setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(id)
  }, [activeTimer])

  const activeTask = useMemo(
    () => (activeTimer ? tasks.find((task) => task.id === activeTimer.taskId) ?? null : null),
    [activeTimer, tasks],
  )

  const elapsed = activeTimer ? elapsedSeconds(activeTimer, now) : 0
  const remaining = activeTimer ? remainingSeconds(activeTimer, now) : 0

  useEffect(() => {
    if (!activeTimer || remaining > 0 || notifiedTimerStart === activeTimer.startedAt) return
    setHungry(true)
    setNotifiedTimerStart(activeTimer.startedAt)
    document.title = '🐾 主人，我该吃饭啦！'

    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('🐱 CatFocus', { body: '主人，我该吃饭啦！这一轮专注时间已经到了。' })
    }
  }, [activeTimer, remaining, notifiedTimerStart])

  useEffect(() => {
    if (!hungry) document.title = 'CatFocus'
  }, [hungry])

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      if (statusFilter !== 'all' && task.status !== statusFilter) return false
      if (dateFilter && task.deadline !== dateFilter) return false
      if (durationFilter !== 'all') {
        const [min, max] = durationFilter.split('-').map(Number)
        if (task.durationHours < min || task.durationHours > max) return false
      }
      return true
    })
  }, [tasks, statusFilter, dateFilter, durationFilter])

  async function requestNotifications() {
    if ('Notification' in window && Notification.permission === 'default') {
      await Notification.requestPermission()
    }
  }

  function startTask(task: Task) {
    requestNotifications()
    const timer: ActiveTimer = {
      taskId: task.id,
      startedAt: Date.now(),
      durationSeconds: task.durationHours * 3600,
      pausedAt: null,
      totalPausedMs: 0,
    }
    setNow(Date.now())
    setHungry(false)
    setNotifiedTimerStart(null)
    setActiveTimer(timer)
    setSelectedTask(null)
  }

  function pauseOrResume() {
    if (!activeTimer) return
    if (activeTimer.pausedAt) {
      const pauseLength = Date.now() - activeTimer.pausedAt
      setActiveTimer({ ...activeTimer, pausedAt: null, totalPausedMs: activeTimer.totalPausedMs + pauseLength })
      setNow(Date.now())
    } else {
      setActiveTimer({ ...activeTimer, pausedAt: Date.now() })
      setNow(Date.now())
    }
  }

  function stopTimer() {
    setActiveTimer(null)
    setHungry(false)
    setNotifiedTimerStart(null)
  }

  function beginFeeding() {
    if (!activeTask) return
    setHungry(false)
    setFeedingTask(activeTask)
  }

  function finishFeeding() {
    if (!feedingTask) return
    completeTask(feedingTask.id)
    setFeedingTask(null)
    setActiveTimer(null)
    setHungry(false)
    setNotifiedTimerStart(null)
  }

  function createTask(task: Task, startNow: boolean) {
    addTask(task)
    setAddOpen(false)
    if (startNow) startTask(task)
  }

  if (feedingTask) {
    return <FeedingScene task={feedingTask} onComplete={finishFeeding} onCancel={() => setFeedingTask(null)} />
  }

  if (activeTimer && activeTask) {
    return (
      <>
        <TimerView
          task={activeTask}
          elapsed={elapsed}
          remaining={remaining}
          paused={Boolean(activeTimer.pausedAt)}
          onPause={pauseOrResume}
          onStop={stopTimer}
          onDone={beginFeeding}
        />
        {hungry && <HungryOverlay onClose={() => setHungry(false)} />}
      </>
    )
  }

  return (
    <main className="home-screen">
      <header className="topbar">
        <div className="brand">
          <span className="brand-paw">🐾</span>
          <div><strong>CatFocus</strong><small>tiny tasks, happy cat</small></div>
        </div>
        <button className="filter-button" onClick={() => setFiltersOpen((v) => !v)} aria-label="筛选任务">
          <span>⌯</span> 分类
        </button>
      </header>

      {filtersOpen && (
        <FilterPanel
          duration={durationFilter}
          date={dateFilter}
          status={statusFilter}
          onDuration={setDurationFilter}
          onDate={setDateFilter}
          onStatus={setStatusFilter}
          onClose={() => setFiltersOpen(false)}
        />
      )}

      <section className="hero-copy">
        <p className="eyebrow">YOUR FOCUS GARDEN</p>
        <h1>今天也陪小猫<br />慢慢把事情做完。</h1>
        <p>{filteredTasks.filter((t) => t.status === 'active').length} 个毛线球正在等你。</p>
      </section>

      <section className="orbit-stage" aria-label="任务毛线球区域">
        {filteredTasks.slice(0, 10).map((task, index) => (
          <YarnBall key={task.id} task={task} index={index} onOpen={setSelectedTask} />
        ))}
        <div className="center-cat">
          <CatFace mode="idle" />
          <div className="cat-caption">
            <strong>{filteredTasks.length ? '挑一个毛线球开始吧' : '今天还没有任务哦'}</strong>
            <span>{filteredTasks.length ? '点击任务查看详情' : '点右下角给我一个毛线球'}</span>
          </div>
        </div>
      </section>

      <button className="floating-add" onClick={() => setAddOpen(true)} aria-label="添加任务">
        <span>＋</span><small>🐾</small>
      </button>

      <footer className="home-footer">
        <span>任务保存在你的浏览器里 · No account needed</span>
        <span>{tasks.filter((t) => t.status === 'completed').length} tasks fed the cat</span>
      </footer>

      {addOpen && <AddTaskModal onClose={() => setAddOpen(false)} onCreate={createTask} />}
      {selectedTask && (
        <TaskCard
          task={selectedTask}
          onClose={() => setSelectedTask(null)}
          onStart={startTask}
          onRemove={removeTask}
        />
      )}
    </main>
  )
}

export default App

type Props = {
  duration: string
  date: string
  status: string
  onDuration: (v: string) => void
  onDate: (v: string) => void
  onStatus: (v: string) => void
  onClose: () => void
}

export default function FilterPanel({ duration, date, status, onDuration, onDate, onStatus, onClose }: Props) {
  const ranges = ['all', '1-2', '3-4', '5-8', '9-10', '11-12', '13-14', '15-16']
  return (
    <aside className="filter-panel">
      <div className="modal-topline"><h3>筛选任务</h3><button className="icon-button" onClick={onClose}>×</button></div>
      <label>时长</label>
      <select value={duration} onChange={(e) => onDuration(e.target.value)}>
        {ranges.map((r) => <option key={r} value={r}>{r === 'all' ? '全部时长' : `${r} 小时`}</option>)}
      </select>
      <label>日期</label>
      <input type="date" value={date} onChange={(e) => onDate(e.target.value)} />
      <button className="text-button" onClick={() => onDate('')}>清除日期</button>
      <label>状态</label>
      <select value={status} onChange={(e) => onStatus(e.target.value)}>
        <option value="all">全部</option>
        <option value="active">进行中</option>
        <option value="completed">已完成</option>
      </select>
    </aside>
  )
}

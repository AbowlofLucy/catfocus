import type { Task } from '../types/task'

type Props = {
  task: Task
  onClose: () => void
  onStart: (task: Task) => void
  onRemove: (taskId: string) => void
}

export default function TaskCard({ task, onClose, onStart, onRemove }: Props) {
  return (
    <div className="modal-backdrop" onMouseDown={onClose}>
      <section className="modal-card compact" onMouseDown={(e) => e.stopPropagation()}>
        <div className="modal-topline"><div><p className="eyebrow">{task.category}</p><h2>{task.name}</h2></div><button className="icon-button" onClick={onClose}>×</button></div>
        <div className="task-detail-grid">
          <div><span>Deadline</span><strong>{task.deadline}</strong></div>
          <div><span>Focus</span><strong>{task.durationHours} hours</strong></div>
          <div><span>Status</span><strong>{task.status}</strong></div>
          <div><span>Files</span><strong>{task.attachments.length}</strong></div>
        </div>
        {task.notes && <p className="notes-box">{task.notes}</p>}
        {task.attachments.length > 0 && <div className="file-list">{task.attachments.map((file) => <span key={file.name}>📎 {file.name}</span>)}</div>}
        <div className="modal-actions">
          <button className="danger-text" onClick={() => { onRemove(task.id); onClose() }}>删除</button>
          {task.status === 'active' && <button className="paw-button" onClick={() => onStart(task)}><span>🐾</span> Start</button>}
        </div>
      </section>
    </div>
  )
}

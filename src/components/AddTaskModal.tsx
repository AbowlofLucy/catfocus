import { useState } from 'react'
import type { AttachmentMeta, Task, TaskCategory } from '../types/task'

type Props = {
  onClose: () => void
  onCreate: (task: Task, startNow: boolean) => void
}

const categories: TaskCategory[] = ['Study', 'Work', 'Personal', 'Other']

export default function AddTaskModal({ onClose, onCreate }: Props) {
  const [name, setName] = useState('')
  const [deadline, setDeadline] = useState(new Date().toISOString().slice(0, 10))
  const [durationHours, setDurationHours] = useState(1)
  const [category, setCategory] = useState<TaskCategory>('Study')
  const [notes, setNotes] = useState('')
  const [attachments, setAttachments] = useState<AttachmentMeta[]>([])

  function handleFiles(files: FileList | null) {
    if (!files) return
    setAttachments(Array.from(files).map((file) => ({ name: file.name, size: file.size, type: file.type })))
  }

  function submit(startNow: boolean) {
    if (!name.trim() || !deadline) return
    const task: Task = {
      id: crypto.randomUUID(),
      name: name.trim(),
      deadline,
      durationHours,
      category,
      notes: notes.trim(),
      attachments,
      status: 'active',
      createdAt: new Date().toISOString(),
      completedAt: null,
    }
    onCreate(task, startNow)
  }

  return (
    <div className="modal-backdrop" onMouseDown={onClose}>
      <section className="modal-card" onMouseDown={(e) => e.stopPropagation()} aria-modal="true" role="dialog">
        <div className="modal-topline">
          <div>
            <p className="eyebrow">NEW YARN BALL</p>
            <h2>给小猫安排一个新任务</h2>
          </div>
          <button className="icon-button" onClick={onClose} aria-label="关闭">×</button>
        </div>

        <label>任务名字 *</label>
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="例如：复习 Statistical Modelling" autoFocus />

        <div className="form-grid">
          <div>
            <label>期望完成日期 *</label>
            <input type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} />
          </div>
          <div>
            <label>专注时长 *</label>
            <select value={durationHours} onChange={(e) => setDurationHours(Number(e.target.value))}>
              {Array.from({ length: 16 }, (_, i) => i + 1).map((h) => <option key={h} value={h}>{h} 小时</option>)}
            </select>
          </div>
        </div>

        <label>分类</label>
        <div className="category-row">
          {categories.map((item) => (
            <button key={item} className={category === item ? 'chip active' : 'chip'} onClick={() => setCategory(item)}>{item}</button>
          ))}
        </div>

        <label>备注</label>
        <textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="可选：写下任务目标、章节或提醒…" rows={3} />

        <label>相关文件</label>
        <label className="file-drop">
          <input type="file" multiple onChange={(e) => handleFiles(e.target.files)} />
          <span>＋ 选择文件</span>
          <small>第一版只保存文件信息，不会上传文件内容。</small>
        </label>
        {attachments.length > 0 && <div className="file-list">{attachments.map((f) => <span key={f.name}>📎 {f.name}</span>)}</div>}

        <div className="modal-actions">
          <button className="secondary-button" onClick={() => submit(false)}>只保存</button>
          <button className="paw-button" disabled={!name.trim()} onClick={() => submit(true)}><span>🐾</span> Start</button>
        </div>
      </section>
    </div>
  )
}

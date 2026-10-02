type Props = { onClose: () => void }

export default function HungryOverlay({ onClose }: Props) {
  return (
    <div className="hungry-overlay">
      <div className="hungry-paw">🐾</div>
      <h2>主人，我该吃饭啦！</h2>
      <p>这一轮专注时间已经到了。</p>
      <button className="paw-button" onClick={onClose}>知道啦</button>
    </div>
  )
}

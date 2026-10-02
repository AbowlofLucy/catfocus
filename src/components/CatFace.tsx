import type { CSSProperties } from 'react'

type Props = {
  mode?: 'idle' | 'play' | 'eat' | 'full'
}

export default function CatFace({ mode = 'idle' }: Props) {
  const moodClass = `cat-face ${mode}`
  return (
    <div className={moodClass} aria-label={`cat-${mode}`}>
      <div className="ear ear-left" />
      <div className="ear ear-right" />
      <div className="cat-head">
        <div className="eye eye-left"><span className="pupil" /></div>
        <div className="eye eye-right"><span className="pupil" /></div>
        <div className="nose" />
        <div className="mouth"><span /><span /></div>
        <div className="whiskers whiskers-left" style={{ '--side': '-1' } as CSSProperties}><i/><i/><i/></div>
        <div className="whiskers whiskers-right" style={{ '--side': '1' } as CSSProperties}><i/><i/><i/></div>
      </div>
      {mode === 'play' && <div className="play-paw">🐾</div>}
      {mode === 'eat' && <div className="eat-sparkles">✦ ✦</div>}
    </div>
  )
}

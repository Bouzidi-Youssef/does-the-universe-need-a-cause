import { useState } from 'preact/hooks';

const constants = [
  { n: 'gravity', s: [0.44, 0.56] as const },
  { n: 'expansion', s: [0.42, 0.56] as const },
  { n: 'em_alpha', s: [0.44, 0.58] as const },
  { n: 'dark_energy', s: [0.47, 0.53] as const },
];

export default function RangeVis() {
  const [v, setV] = useState(10);

  const lbl = v < 12 ? 'Very narrow' : v < 30 ? 'Narrow' : v < 55 ? 'Moderate' : v < 78 ? 'Wide' : 'Very wide';
  const rW = v / 100;
  const st = Math.max(0, 0.5 - rW / 2);
  const en = Math.min(1, 0.5 + rW / 2);

  const rows = constants.map((c) => {
    const o = Math.max(0, Math.min(c.s[1], en) - Math.max(c.s[0], st));
    const d = en - st;
    return { c, st, en, p: d > 0 ? o / d : 0 };
  });
  const ov = rows.reduce((a, r) => a * r.p, 1);
  const ovColor = ov > 0.1 ? 'var(--green)' : ov > 0.01 ? 'var(--accent)' : 'var(--red)';

  return (
    <>
      <p style="font-family:'Space Grotesk',sans-serif;font-size:11px;color:var(--text-muted);margin-bottom:13px;">
        Green = where life is possible. Blue = sampled range. Widen the range and watch the overlap collapse.
      </p>
      <div class="slider-row">
        <span class="slider-label">Range width</span>
        <input
          type="range"
          min="1"
          max="100"
          value={v}
          onInput={(ev) => setV(Number((ev.target as HTMLInputElement).value))}
        />
        <span class="slider-val">{lbl}</span>
      </div>
      <div class="range-vis">
        {rows.map(({ c, st: s, en: e2, p }) => (
          <div class="range-row">
            <div class="range-name">{c.n}</div>
            <div class="range-track">
              <div class="range-fill" style={`left:${s * 100}%;width:${(e2 - s) * 100}%`} />
              <div class="range-safe" style={`left:${c.s[0] * 100}%;width:${(c.s[1] - c.s[0]) * 100}%`} />
            </div>
            <span
              style={`font-family:'Space Mono',monospace;font-size:10px;min-width:32px;text-align:right;color:${p > 0.5 ? 'var(--green)' : 'var(--red)'};`}
            >
              {(p * 100).toFixed(0)}%
            </span>
          </div>
        ))}
      </div>
      <div
        style="margin-top:9px;padding:10px 13px;background:var(--surface2);border-radius:4px;font-family:'Space Mono',monospace;font-size:11px;line-height:1.8;"
      >
        <span style="color:var(--text-muted)">P(all constants viable)</span>{' '}
        <span style={`color:${ovColor}`}>{(ov * 100).toFixed(3)}%</span>
        <br />
        <span style="color:var(--text-dim)">
          {v < 12
            ? '// Narrow range may accidentally hit life-permitting window'
            : v > 70
              ? '// Wide range makes life-permitting window a negligible sliver'
              : '// Some constants viable — others fall outside the window'}
        </span>
      </div>
    </>
  );
}

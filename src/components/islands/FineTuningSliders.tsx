import { useState } from 'preact/hooks';

function gauss(x: number, width: number) {
  return Math.exp(-Math.pow(x / width, 2));
}

export default function FineTuningSliders() {
  const [g, setG] = useState(50);
  const [e, setE] = useState(50);
  const [em, setEm] = useState(50);

  const gP = gauss(g - 50, 14);
  const eP = gauss(e - 50, 14);
  const emP = gauss(em - 50, 11);
  const combined = gP * eP * emP;

  const rows = [
    { l: 'Gravity', p: gP, ok: g > 35 && g < 65 },
    { l: 'Expansion rate', p: eP, ok: e > 35 && e < 65 },
    { l: 'EM coupling', p: emP, ok: em > 30 && em < 65 },
  ];

  const combinedColor = combined > 0.1 ? 'var(--green)' : combined > 0.01 ? 'var(--accent)' : 'var(--red)';
  const verdict =
    combined > 0.15
      ? 'Broadly hospitable. Life is on the table.'
      : combined > 0.03
        ? 'Marginal — viable universe possible but unlikely.'
        : 'Near-zero — almost no run produces stable structure.';

  return (
    <>
      <div class="code-block">
        <span class="code-comment">// Constants now drawn from bounded random ranges</span>
        <br />
        <span class="code-type">double</span> G = <span class="code-fn">randomInRange</span>(
        <span class="code-num">0</span>, <span class="code-num">1e-7</span>);
        <br />
        <span class="code-type">double</span> H0 = <span class="code-fn">randomInRange</span>(
        <span class="code-num">0</span>, <span class="code-num">200</span>);
        <br />
        <span class="code-type">double</span> a = <span class="code-fn">randomInRange</span>(<span class="code-num">0</span>,{' '}
        <span class="code-num">1</span>);
      </div>
      <p style="font-family:'Space Grotesk',sans-serif;font-size:11px;color:var(--text-muted);margin-top:13px;margin-bottom:9px;">
        Adjust each constant. Green = within life-permitting window.
      </p>
      <div class="slider-row">
        <span class="slider-label">Gravity</span>
        <input type="range" min="0" max="100" value={g} onInput={(ev) => setG(Number((ev.target as HTMLInputElement).value))} />
        <span class="slider-val">{g}%</span>
      </div>
      <div class="slider-row">
        <span class="slider-label">Expansion rate</span>
        <input type="range" min="0" max="100" value={e} onInput={(ev) => setE(Number((ev.target as HTMLInputElement).value))} />
        <span class="slider-val">{e}%</span>
      </div>
      <div class="slider-row">
        <span class="slider-label">EM coupling</span>
        <input type="range" min="0" max="100" value={em} onInput={(ev) => setEm(Number((ev.target as HTMLInputElement).value))} />
        <span class="slider-val">{em}%</span>
      </div>
      <div style="margin-top:14px;">
        {rows.map((c) => (
          <div style="margin-bottom:9px;">
            <div style="display:flex;justify-content:space-between;font-family:'Space Mono',monospace;font-size:11px;color:var(--text-muted);margin-bottom:4px;">
              <span>{c.l}</span>
              <span style={`color:${c.ok ? 'var(--green)' : 'var(--red)'}`}>{(c.p * 100).toFixed(1)}%</span>
            </div>
            <div class="prob-bar-wrap">
              <div class="prob-bar-fill" style={`width:${c.p * 100}%;background:${c.ok ? 'var(--green)' : 'var(--red)'}`} />
            </div>
          </div>
        ))}
        <div style="border-top:1px solid var(--border);padding-top:10px;margin-top:3px;">
          <div style="display:flex;justify-content:space-between;font-family:'Space Mono',monospace;font-size:11px;margin-bottom:4px;">
            <span style="color:var(--text-muted)">P(viable universe)</span>
            <span style={`color:${combinedColor}`}>{(combined * 100).toFixed(3)}%</span>
          </div>
          <div class="prob-bar-wrap" style="height:8px;">
            <div class="prob-bar-fill" style={`width:${combined * 100}%;background:${combinedColor}`} />
          </div>
          <div style="font-family:'Crimson Pro',serif;font-style:italic;font-size:0.86rem;color:var(--text-dim);margin-top:7px;">
            {verdict}
          </div>
        </div>
      </div>
    </>
  );
}

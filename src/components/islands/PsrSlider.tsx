import { useState } from 'preact/hooks';

const labels = [
  'Events in nature have causes',
  'Patterns in data are explainable',
  'The universe itself has a cause',
  'The laws of physics have a cause',
  'Every fact at any level has a sufficient reason',
];

const descs = [
  'Local science — no physicist disputes this',
  'The backbone of empirical method',
  'Where weak PSR stops; strong PSR presses on',
  'Strong PSR territory — science silent here',
  'Full strong PSR: reality is completely intelligible',
];

const cols = ['var(--green)', 'var(--green)', 'var(--accent)', 'var(--accent)', 'var(--blue)'];

export default function PsrSlider() {
  const [v, setV] = useState(1);
  const zone = v < 2 ? 'Weak PSR' : v === 2 ? 'The Boundary' : 'Strong PSR';
  const zoneColor = v < 2 ? 'var(--green)' : v === 2 ? 'var(--accent)' : 'var(--blue)';

  return (
    <>
      <div class="slider-row" style="margin-bottom:16px;">
        <span class="slider-label" style="min-width:0;font-size:11px;color:var(--green);">
          Weak PSR
        </span>
        <input
          type="range"
          min="0"
          max="4"
          value={v}
          step="1"
          onInput={(ev) => setV(Number((ev.target as HTMLInputElement).value))}
        />
        <span class="slider-label" style="min-width:0;font-size:11px;color:var(--blue);text-align:right;">
          Strong PSR
        </span>
      </div>
      <div style="margin-bottom:10px;">
        <div style="height:4px;background:var(--border);border-radius:2px;overflow:hidden;margin-bottom:12px;">
          <div style={`height:100%;width:${((v + 1) / 5) * 100}%;background:${cols[v]};transition:all 0.4s;border-radius:2px;`} />
        </div>
        <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:12px;">
          <div style="flex:1;">
            <div
              style={`font-family:'Space Grotesk',sans-serif;font-size:9px;letter-spacing:0.2em;text-transform:uppercase;margin-bottom:5px;color:${zoneColor};`}
            >
              {zone}
            </div>
            <div style="font-family:'Crimson Pro',serif;font-size:1.05rem;color:#e0dbd2;margin-bottom:5px;">
              {labels[v]}
            </div>
            <div style="font-family:'Crimson Pro',serif;font-size:0.88rem;color:var(--text-muted);line-height:1.55;">
              {descs[v]}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

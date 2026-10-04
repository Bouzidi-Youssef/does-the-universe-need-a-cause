import { useState } from 'preact/hooks';

const steps = [
  { t: 'We explain everything we encounter', b: 'This is the weak PSR in practice — science assumes events have explanations, causes, patterns.', c: 'var(--green)' },
  { t: 'The universe is also something we encounter', b: 'It is a fact: the universe exists, has laws, has a specific structure. We encounter it as surely as we encounter any event.', c: 'var(--accent)' },
  { t: 'Exempting it from explanation is arbitrary', b: 'All other facts require explanation. But this one special fact — "the whole" — is exempt? On what principle?', c: 'var(--accent)' },
  { t: 'Brute facts halt explanation at will', b: 'If we allow brute facts at the foundation, nothing stops us from allowing them anywhere. Explanation becomes a habit, not a necessity.', c: 'var(--red)' },
  { t: 'Rational inquiry resists arbitrary stopping points', b: 'The very act of explaining things presupposes that facts are not arbitrary. Accepting a brute fact uses explanation while denying its universality.', c: 'var(--accent)' },
  { t: 'Therefore: explanation must be universal', b: 'Not just local. Not just internal. If reason is a genuine commitment, it cannot stop at the boundary of the universe.', c: 'var(--blue)' },
  { t: 'Universal explanation requires sufficiency', b: 'Probabilistic or partial explanations can pass between contingent facts. But to explain existence itself, the explanation must be complete — non-derivative.', c: 'var(--blue)' },
  { t: 'Strong PSR', b: 'Every fact, including the existence and structure of reality itself, has a sufficient reason that fully accounts for why it is so and not otherwise.', c: 'var(--accent)' },
];

export default function ArgumentStepper() {
  const [idx, setIdx] = useState(0);
  const s = steps[idx];

  if (!s) return null;

  return (
    <div style="margin-bottom:14px;">
      <div style="height:3px;background:var(--border);border-radius:2px;overflow:hidden;margin-bottom:10px;">
        <div style={`height:100%;width:${((idx + 1) / steps.length) * 100}%;background:${s.c};transition:all 0.4s;border-radius:2px;`} />
      </div>
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
        <span style="font-family:'Space Mono',monospace;font-size:10px;color:var(--text-dim);">
          {idx + 1} / {steps.length}
        </span>
        <div style="display:flex;gap:8px;">
          <button
            onClick={() => setIdx(Math.max(0, idx - 1))}
            disabled={idx === 0}
            style="font-family:'Space Grotesk',sans-serif;font-size:11px;color:var(--text-muted);border:1px solid var(--border2);background:var(--surface2);padding:5px 12px;border-radius:3px;cursor:pointer;"
          >
            ← Prev
          </button>
          <button
            onClick={() => setIdx(Math.min(steps.length - 1, idx + 1))}
            disabled={idx === steps.length - 1}
            style="font-family:'Space Grotesk',sans-serif;font-size:11px;color:var(--accent);border:1px solid var(--accent2);background:var(--accent-glow);padding:5px 12px;border-radius:3px;cursor:pointer;"
          >
            Next →
          </button>
        </div>
      </div>
      <div style="border:1px solid var(--border2);border-radius:6px;padding:16px;background:var(--surface2);min-height:90px;">
        <div style="font-family:'Crimson Pro',serif;font-size:1.05rem;color:#e0dbd2;margin-bottom:8px;">{s.t}</div>
        <div style="font-family:'Crimson Pro',serif;font-size:0.9rem;color:var(--text-muted);line-height:1.6;">{s.b}</div>
      </div>
    </div>
  );
}

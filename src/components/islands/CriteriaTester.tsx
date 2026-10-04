import { useState } from 'preact/hooks';

const criteria = [
  'Internal Consistency',
  'External Consistency',
  'Miracle',
  'Preservation',
  'Clarity',
  'Completeness',
];

export default function CriteriaTester() {
  const [state, setState] = useState<boolean[]>(() => criteria.map(() => true));

  const toggle = (i: number) =>
    setState((prev) => prev.map((v, j) => (j === i ? !v : v)));

  const failed = criteria.filter((_c, i) => !state[i]);
  const passed = failed.length === 0;

  return (
    <>
      <div>
        {criteria.map((name, i) => (
          <div
            class="crit-row"
            onClick={() => toggle(i)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggle(i);
              }
            }}
          >
            <span class="crit-name">{name}</span>
            <span class="crit-status" style={`color:${state[i] ? 'var(--green)' : 'var(--red)'}`}>
              {state[i] ? 'PASS' : 'FAIL'}
            </span>
          </div>
        ))}
      </div>
      <div
        style={`margin-top:12px;padding:12px 14px;border-radius:5px;font-family:'Crimson Pro',serif;font-style:italic;font-size:0.9rem;background:${passed ? 'var(--green-dim)' : 'var(--red-dim)'};border:1px solid ${passed ? 'rgba(74,171,122,0.3)' : 'rgba(201,107,91,0.3)'};color:var(--text);`}
      >
        {passed
          ? 'Consistent with every condition examined — a candidate worth testing further on its positive merits.'
          : `Rejected — fails: ${failed.join(', ')}. A single failed condition is sufficient to set a claim aside.`}
      </div>
    </>
  );
}

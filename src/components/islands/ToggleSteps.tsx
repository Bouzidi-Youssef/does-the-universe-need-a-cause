import { useState } from 'preact/hooks';

export interface ToggleStep {
  num: string;
  title: string;
  body: string;
  formula?: string;
}

export default function ToggleSteps({ steps }: { steps: ToggleStep[] }) {
  const [on, setOn] = useState<boolean[]>(() => steps.map(() => false));

  const toggle = (i: number) =>
    setOn((prev) => prev.map((v, j) => (j === i ? !v : v)));

  return (
    <div class="evo-card toggle-steps">
      {steps.map((s, i) => (
        <div
          class={`evo-step${on[i] ? ' on' : ''}`}
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
          <div class="evo-num">{s.num}</div>
          <div>
            <div class="evo-title">{s.title}</div>
            <div class="evo-body">{s.body}</div>
            {s.formula && <div class="evo-formula">{s.formula}</div>}
          </div>
        </div>
      ))}
    </div>
  );
}

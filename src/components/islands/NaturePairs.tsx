import { useState } from 'preact/hooks';

export interface NaturePair {
  left: string;
  right: string;
  note: string;
}

export default function NaturePairs({ pairs }: { pairs: NaturePair[] }) {
  const [open, setOpen] = useState<boolean[]>(() => pairs.map(() => false));

  const toggle = (i: number) =>
    setOpen((prev) => prev.map((v, j) => (j === i ? !v : v)));

  return (
    <div>
      {pairs.map((p, i) => (
        <div
          class={`nat-row${open[i] ? ' open' : ''}`}
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
          <div class="nat-side" dangerouslySetInnerHTML={{ __html: p.left }} />
          <div class="nat-side" dangerouslySetInnerHTML={{ __html: p.right }} />
          <div class="nat-note">{p.note}</div>
        </div>
      ))}
    </div>
  );
}

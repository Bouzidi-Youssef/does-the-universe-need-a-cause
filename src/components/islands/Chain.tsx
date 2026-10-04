import { useState } from 'preact/hooks';

export interface ChainItem {
  icon: string;
  html: string;
  question?: boolean;
}

export default function Chain({ items, id }: { items: ChainItem[]; id?: string }) {
  const [lit, setLit] = useState(-1);

  return (
    <div class="chain" id={id}>
      {items.map((item, i) => (
        <div
          class={`chain-node${i <= lit ? ' lit' : ''}${item.question ? ' question' : ''}`}
          onClick={() => setLit(i)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              setLit(i);
            }
          }}
        >
          <div class="chain-icon">{item.icon}</div>
          <div class="chain-text" dangerouslySetInnerHTML={{ __html: item.html }} />
        </div>
      ))}
    </div>
  );
}

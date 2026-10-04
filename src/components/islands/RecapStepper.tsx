import { useState } from 'preact/hooks';

interface Step {
  tag: string;
  title: string;
  html: string;
}

const steps: Step[] = [
  {
    tag: 'Step 1 · Foundation',
    title: 'The preconditions of any reasoning',
    html: `<div class="card-text">
        <p>Before any argument can be made — about physics, about God, about anything — certain principles must already be in place. They are not conclusions of science. They are what science, logic, and all rational thought presuppose in order to function at all.</p>
        <div class="law-list">
          <div class="law-row"><span class="law-name">Law of Identity</span><span class="law-stmt">A thing is identical to itself. A = A.</span></div>
          <div class="law-row"><span class="law-name">Non-Contradiction</span><span class="law-stmt">Nothing can both be and not be in the same sense at the same time.</span></div>
          <div class="law-row"><span class="law-name">Excluded Middle</span><span class="law-stmt">For any proposition P, either P is true or its negation is.</span></div>
          <div class="law-row"><span class="law-name">Principle of Sufficient Reason</span><span class="law-stmt">Every contingent fact has an explanation or reason why it is so.</span></div>
        </div>
        <p>Denying any of these is self-defeating: the denial itself must use them to be stated. They are not optional premises. They are the ground under the argument.</p>
      </div>`,
  },
  {
    tag: 'Step 2 · Definition',
    title: 'Necessary vs. contingent existence',
    html: `<div class="card-text">
        <p>Two kinds of existence matter here, and conflating them collapses the whole argument.</p>
        <div class="def-grid">
          <div class="def-box">
            <div class="def-label">Necessary existence</div>
            <div class="def-body">Cannot not exist. Exists by its own nature. There is no possible state of affairs in which it fails to be.</div>
          </div>
          <div class="def-box">
            <div class="def-label">Contingent existence</div>
            <div class="def-body">Could have failed to exist, or been otherwise. Its existence depends on something outside itself.</div>
          </div>
        </div>
        <div class="conclusion-box">
          <div class="conclusion-label">Observation</div>
          <div class="conclusion-text">The universe is contingent. Its constants could have been different. Its laws could have been otherwise. It need not have existed at all. Nothing about it is logically necessary.</div>
        </div>
      </div>`,
  },
  {
    tag: 'Step 3 · Application',
    title: 'Applying PSR to the universe',
    html: `<div class="card-text">
        <p>The Principle of Sufficient Reason is what science uses every time it asks "why?" — every time it refuses to accept an anomaly as a brute fact and searches instead for a cause. That same principle, applied without exception, reaches the universe itself.</p>
        <div class="conclusion-box">
          <div class="conclusion-label">The step</div>
          <div class="conclusion-text">The universe is contingent. Every contingent thing has an explanation. Therefore the universe has an explanation — a reason why it exists and is as it is, rather than otherwise or not at all.</div>
        </div>
        <p>This is not a new assumption. It is the same demand for explanation that makes science possible, now applied to the fact that science itself is most silent about.</p>
      </div>`,
  },
  {
    tag: 'Step 4 · Elimination',
    title: 'Three explanations that fail',
    html: `<div class="card-text">
        <p>If the universe requires an explanation, only a few candidates present themselves. Each can be tested against the logic established so far.</p>
        <div class="elim-grid">
          <div class="elim-row">
            <div class="elim-label dead">Self-explanation</div>
            <div class="elim-body">The universe explains itself. Impossible — it would have to exist before it exists in order to cause itself. Violates non-contradiction.</div>
          </div>
          <div class="elim-row">
            <div class="elim-label dead">Infinite regress</div>
            <div class="elim-body">An endless chain of contingent causes. Each link is explained by the next — but the chain as a whole has no explanation. Explaining every link is not the same as explaining the existence of the chain.</div>
          </div>
          <div class="elim-row">
            <div class="elim-label dead">Brute fact</div>
            <div class="elim-body">No explanation — the universe simply exists. This directly denies PSR. And if brute facts are permitted here, there is no principled reason to demand explanations anywhere else. Science itself becomes unjustified.</div>
          </div>
        </div>
      </div>`,
  },
  {
    tag: 'Step 5 · Conclusion I',
    title: 'The explanation must be necessary',
    html: `<div class="card-text">
        <p>All three insufficient explanations share a feature: they are contingent, or they deny explanation entirely. From this, one conclusion follows.</p>
        <div class="chain-diagram">
          <div class="chain-link"><span class="chain-num">1</span><span class="chain-txt">The universe is <b>contingent</b></span></div>
          <div class="chain-link"><span class="chain-num">2</span><span class="chain-txt">It requires an <b>explanation</b></span></div>
          <div class="chain-link"><span class="chain-num">3</span><span class="chain-txt">Self-explanation, regress, and brute fact all <b>fail</b></span></div>
          <div class="chain-link"><span class="chain-num">4</span><span class="chain-txt">Therefore the explanation must be <b>non-contingent</b></span></div>
        </div>
        <div class="conclusion-box">
          <div class="conclusion-label">Conclusion I</div>
          <div class="conclusion-text">There exists a necessary cause — something whose existence is not dependent on anything prior, and which is sufficient to explain why the contingent universe exists at all.</div>
        </div>
      </div>`,
  },
  {
    tag: 'Step 6 · Conclusion II',
    title: 'The cause is not physical',
    html: `<div class="card-text">
        <p>From the nature of a necessary cause, and from what we know of the universe's beginning, further attributes follow.</p>
        <div class="attr-grid">
          <div class="attr-box">
            <span class="attr-icon" style="color:var(--amber)">⊘</span>
            <div class="attr-name">Independent</div>
            <div class="attr-desc">Not caused by anything else. Its existence requires no prior condition.</div>
          </div>
          <div class="attr-box">
            <span class="attr-icon" style="color:var(--amber)">∞</span>
            <div class="attr-name">Non-contingent</div>
            <div class="attr-desc">Cannot fail to exist. Its existence is its own nature, not an accident.</div>
          </div>
          <div class="attr-box">
            <span class="attr-icon" style="color:var(--amber)">◇</span>
            <div class="attr-name">Outside spacetime</div>
            <div class="attr-desc">The universe began. Its cause precedes the physical framework — not temporally, but causally and explanatorily.</div>
          </div>
        </div>
        <div class="conclusion-box">
          <div class="conclusion-label">Conclusion II</div>
          <div class="conclusion-text">The necessary cause is not a physical entity in the ordinary sense. It is not bound by the spacetime it brought into existence.</div>
        </div>
      </div>`,
  },
  {
    tag: 'Step 7 · Objections',
    title: 'Two objections addressed',
    html: `<div class="card-text">
        <p>Two objections arise at this point, and both dissolve on inspection.</p>
        <div class="obj-block">
          <div class="obj-q">"Causality requires time — if time began at the singularity, asking for a cause before time is meaningless."</div>
          <div class="obj-a">The question is not about temporal precedence. It is about ontological dependence — why the universe exists at all, not what happened before it in a timeline. Explanatory grounding does not require a temporal sequence. A circle has no beginning, but it still requires an explanation for why it exists.</div>
        </div>
        <div class="obj-block" style="margin-top:18px;">
          <div class="obj-q">"Quantum mechanics shows things can emerge from nothing — virtual particles appear from the vacuum without a cause."</div>
          <div class="obj-a">The quantum vacuum is not nothing. It has energy, laws, and mathematical structure. Emergence from the quantum vacuum is a process within an already-existing physical framework — not creation from absolute nothing. The question of what grounds that framework is the original question, deferred by one step.</div>
        </div>
      </div>`,
  },
  {
    tag: 'Step 8 · The open question',
    title: 'What has been established — and what has not',
    html: `<div class="card-text">
        <p>The argument, assembled without gaps, arrives here:</p>
        <div class="chain-diagram" style="margin-bottom:20px;">
          <div class="chain-link"><span class="chain-num">1</span><span class="chain-txt">Rational thought requires the Principle of Sufficient Reason</span></div>
          <div class="chain-link"><span class="chain-num">2</span><span class="chain-txt">The universe is contingent</span></div>
          <div class="chain-link"><span class="chain-num">3</span><span class="chain-txt">Therefore it requires an explanation</span></div>
          <div class="chain-link"><span class="chain-num">4</span><span class="chain-txt">Self-explanation, infinite regress, and brute fact all fail</span></div>
          <div class="chain-link"><span class="chain-num">5</span><span class="chain-txt">Therefore a necessary, non-contingent cause exists</span></div>
          <div class="chain-link"><span class="chain-num">6</span><span class="chain-txt">This cause is independent of spacetime and physical contingency</span></div>
        </div>
        <p>What the argument does <em>not</em> yet establish is the nature of that cause. The candidates narrow sharply — and this is where Chapter III begins.</p>
        <div class="fork-grid">
          <div class="fork-node ruled-out">
            <div class="fork-node-name">Abstract object</div>
            <div class="fork-node-body">Numbers, logic. But these have no causal power. Cannot explain a concrete universe.</div>
            <div class="fork-node-tag" style="color:var(--red-dead)">fails causally</div>
          </div>
          <div class="fork-node ruled-out">
            <div class="fork-node-name">Necessary multiverse</div>
            <div class="fork-node-body">Shifts the question. Why this multiverse? Why its specific structure?</div>
            <div class="fork-node-tag" style="color:var(--red-dead)">defers</div>
          </div>
          <div class="fork-node">
            <div class="fork-node-name">Impersonal substance</div>
            <div class="fork-node-body">Spinoza's ground: necessary, but collapses contingency into necessity.</div>
            <div class="fork-node-tag" style="color:var(--amber)">open</div>
          </div>
          <div class="fork-node">
            <div class="fork-node-name">Personal creator</div>
            <div class="fork-node-body">A conscious, free cause — can account for why this universe rather than another.</div>
            <div class="fork-node-tag" style="color:var(--amber)">open</div>
          </div>
        </div>
      </div>`,
  },
];

function goToChapter3() {
  window.dispatchEvent(new CustomEvent('recap:complete'));
}

function goBack() {
  window.dispatchEvent(new CustomEvent('recap:back'));
}

export default function RecapStepper() {
  const [current, setCurrent] = useState(0);
  const step = steps[current];
  if (!step) return null;
  const last = current === steps.length - 1;

  const goTo = (idx: number) => setCurrent(Math.max(0, Math.min(steps.length - 1, idx)));

  return (
    <div class="recap-inner">
      <button class="recap-exit" onClick={goBack}>
        ← Back to Chapter II
      </button>
      <div class="header">
        <div class="header-eyebrow">Interlude — Before Chapter III</div>
        <h1 class="header-title">What Has Been Established</h1>
        <p class="header-sub">
          Eight steps, assembled one at a time. Each rests on what came before. At the end, one conclusion — and one
          open question.
        </p>
        <div class="progress-track">
          {steps.map((s, i) => (
            <>
              {i > 0 && <div class={`prog-line${i <= current ? ' done' : ''}`} />}
              <div
                class={`prog-dot${i < current ? ' done' : i === current ? ' active' : ''}`}
                onClick={() => goTo(i)}
                role="button"
                tabIndex={0}
                aria-label={s.tag}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    goTo(i);
                  }
                }}
                style="cursor:pointer;"
              />
            </>
          ))}
        </div>
      </div>

      <div class="stage">
        <div class="card-wrap">
          <div class="card active entering" key={current}>
            <div class="card-tag">
              <span class="card-tag-num">{String(current + 1).padStart(2, '0')}</span>
              <span>{step.tag}</span>
            </div>
            <div class="card-body">
              <div class="card-title">{step.title}</div>
              <div dangerouslySetInnerHTML={{ __html: step.html }} />
            </div>
          </div>
          <div class={`connector${current < steps.length - 1 ? ' visible' : ''}`} />
        </div>

        <div class="controls">
          <button class="ctrl-btn prev" disabled={current === 0} onClick={() => goTo(current - 1)}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M9 3L5 7l4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            Back
          </button>
          <span class="step-counter">
            {current + 1} / {steps.length}
          </span>
          <button class="ctrl-btn next" disabled={last} onClick={() => goTo(current + 1)}>
            Next
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M5 3l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </button>
        </div>

        <div
          style={`margin-top:20px;opacity:${last ? '1' : '0'};pointer-events:${last ? 'auto' : 'none'};transition:opacity 0.5s;`}
        >
          <button class="ctrl-btn chapter" onClick={goToChapter3}>
            Continue to Chapter III: On God
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M5 3l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

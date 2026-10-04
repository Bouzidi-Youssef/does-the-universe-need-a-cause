import { useState } from 'preact/hooks';

const notes: Record<string, string> = {
  a: 'This path is consistent with the principle of sufficient reason — the foundation of all causal reasoning. It requires accepting a necessary cause: something outside the causal chain of the universe whose existence is self-explanatory. Science cannot confirm or deny it, because the question lies outside its domain.',
  b: 'This path accepts that some things exist with no explanation — brute facts. It is formally consistent, but it requires suspending the principle of sufficient reason at the deepest level. Crucially, this is not the conclusion of an argument. It is the refusal to follow one to its terminus.',
};

export default function ForkChoice() {
  const [choice, setChoice] = useState<string | null>(null);

  return (
    <>
      <div class="fork-wrap">
        <div class={`fork-card${choice === 'a' ? ' chosen' : ''}`} onClick={() => setChoice('a')} role="button" tabIndex={0}>
          <div class="fork-label">Path A</div>
          <div class="fork-title">The Necessary Cause</div>
          <div class="fork-body">
            Every contingent fact has a cause. The chain cannot regress infinitely. Something uncaused and necessary
            must exist — sufficient to explain all contingent existence.
          </div>
          <div class="fork-result">
            → Requires a cause outside space-time whose existence is self-explanatory. The principle of sufficient
            reason is honoured to its terminus.
          </div>
        </div>
        <div class={`fork-card${choice === 'b' ? ' chosen' : ''}`} onClick={() => setChoice('b')} role="button" tabIndex={0}>
          <div class="fork-label">Path B</div>
          <div class="fork-title">The Brute Fact</div>
          <div class="fork-body">
            The laws of physics, the mathematical structure, the multiverse — they simply exist. No further explanation
            is available or required. The chain stops here.
          </div>
          <div class="fork-result">
            → Requires suspending the principle of sufficient reason at the deepest level — the very level where science
            can no longer help.
          </div>
        </div>
      </div>
      <div
        style="margin-top:11px;font-family:'Crimson Pro',serif;font-style:italic;font-size:0.92rem;color:var(--text-muted);line-height:1.65;padding:11px 13px;border:1px solid var(--border);border-radius:4px;background:var(--surface2);"
      >
        {choice ? notes[choice] : <span style="opacity:0.5">Select a path above to examine its commitments…</span>}
      </div>
    </>
  );
}

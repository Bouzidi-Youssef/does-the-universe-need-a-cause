import { useEffect, useRef, useState } from 'preact/hooks';

interface Star {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
}

const outcomes = [
  { t: 'fail', m: 'collapse — gravity too high, runaway singularity' },
  { t: 'fail', m: 'void — expansion too fast, no structures formed' },
  { t: 'fail', m: 'inert — EM coupling prevents stable atoms' },
  { t: 'success', m: '★ life-bearing conditions detected' },
  { t: 'fail', m: 'collapse — expansion rate too slow, early recollapse' },
];

export default function UniverseSim() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const [runCount, setRunCount] = useState(0);
  const [running, setRunning] = useState(false);
  const [output, setOutput] = useState<{ run: number; kind: string; msg: string; hint: boolean } | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = 170 * dpr;
      const ctx = canvas.getContext('2d');
      if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);
    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animRef.current);
    };
  }, []);

  function runSim() {
    if (running) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const next = runCount + 1;
    setRunCount(next);
    setRunning(true);
    setOutput(null);

    const W = () => canvas.offsetWidth;
    const H = () => 170;
    const stars: Star[] = [];
    for (let i = 0; i < 90; i++) {
      stars.push({
        x: W() / 2 + (Math.random() - 0.5) * 30,
        y: H() / 2 + (Math.random() - 0.5) * 30,
        vx: (Math.random() - 0.5) * 2.2,
        vy: (Math.random() - 0.5) * 2.2,
        r: Math.random() * 1.1 + 0.2,
      });
    }

    const oc = next % 5 === 0 ? outcomes[3] : outcomes[Math.floor(Math.random() * 3) + (next % 3 === 2 ? 2 : 0)];
    if (!oc) return;
    let frame = 0;

    const animate = () => {
      const w = W();
      const h = H();
      ctx.clearRect(0, 0, w, h);
      stars.forEach((s) => {
        s.x += s.vx * (frame * 0.06 + 0.4);
        s.y += s.vy * (frame * 0.06 + 0.4);
        const a = Math.max(0, 1 - frame / 72);
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(220,210,190,${a * 0.8})`;
        ctx.fill();
      });
      frame += 1;
      if (frame < 75) {
        animRef.current = requestAnimationFrame(animate);
      } else {
        setRunning(false);
        setOutput({ run: next, kind: oc.t, msg: oc.m, hint: next % 5 === 4 });
      }
    };
    cancelAnimationFrame(animRef.current);
    animRef.current = requestAnimationFrame(animate);
  }

  return (
    <>
      <div class="code-block">
        <span class="code-keyword">const</span> <span class="code-type">double</span> SPEED_OF_LIGHT ={' '}
        <span class="code-num">299792458.0</span>; <span class="code-comment">// m/s</span>
        <br />
        <span class="code-keyword">const</span> <span class="code-type">double</span> GRAVITY_CONSTANT ={' '}
        <span class="code-num">6.674e-11</span>; <span class="code-comment">// N·m²/kg²</span>
        <br />
        <span class="code-keyword">const</span> <span class="code-type">double</span> EXPANSION_RATE ={' '}
        <span class="code-num">67.4</span>; <span class="code-comment">// km/s/Mpc</span>
        <br />
        <span class="code-keyword">const</span> <span class="code-type">double</span> EM_COUPLING ={' '}
        <span class="code-num">0.007297</span>; <span class="code-comment">// fine structure α</span>
        <br />
        <br />
        <span class="code-type">Universe</span> <span class="code-fn">run</span>() {'{'}
        <br />
        {'  '}
        <span class="code-type">Universe</span> u(GRAVITY_CONSTANT, EXPANSION_RATE, EM_COUPLING);
        <br />
        {'  '}u.<span class="code-fn">bigBang</span>();<br />
        {'  '}u.<span class="code-fn">evolve</span>(<span class="code-num">13.8e9</span>);{' '}
        <span class="code-comment">// years</span>
        <br />
        {'  '}
        <span class="code-keyword">return</span> u;
        <br />
        {'}'}
      </div>
      <div style="display:flex;align-items:center;gap:12px;margin-top:14px;flex-wrap:wrap;">
        <button class="run-btn" disabled={running} onClick={runSim}>
          <svg width="10" height="10" viewBox="0 0 10 10">
            <polygon points="2,1 9,5 2,9" fill="currentColor" />
          </svg>
          Run
        </button>
        <span style="font-family:'Space Mono',monospace;font-size:11px;color:var(--text-dim)">
          Attempts: {runCount}
        </span>
      </div>
      <div class="output-area" style="margin-top:14px;">
        {!output && !running && <span class="out-line">// Press Run to simulate a universe...</span>}
        {running && <span class="out-line">&gt; Initialising constants...</span>}
        {output && !running && (
          <>
            <span class="out-line">&gt; Run {output.run} complete</span>
            <br />
            <span class={output.kind === 'success' ? 'out-success' : 'out-fail'}>{output.msg}</span>
            {output.hint && (
              <>
                <br />
                <span class="out-accent">// Try once more...</span>
              </>
            )}
          </>
        )}
      </div>
      <canvas ref={canvasRef} id="universe-canvas" />
    </>
  );
}

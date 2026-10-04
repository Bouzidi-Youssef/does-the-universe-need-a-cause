import { chapters } from '../data/navigation.ts';

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}

function initDots() {
  document.querySelectorAll<HTMLDivElement>('.nav-dot[data-target]').forEach((dot) => {
    const target = dot.dataset.target;
    if (!target) return;
    const go = () => scrollToId(target);
    dot.addEventListener('click', go);
    dot.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        go();
      }
    });
  });
}

let currentChapter = 0;

function switchChapter(ci: number) {
  if (ci === currentChapter) return;
  currentChapter = ci;
  const ch = chapters[ci];
  if (!ch) return;

  const titleEl = document.getElementById('sidebar-title');
  const badgeEl = document.getElementById('chapter-badge');
  if (titleEl) titleEl.style.opacity = '0';
  if (badgeEl) badgeEl.style.opacity = '0';
  window.setTimeout(() => {
    if (titleEl) {
      titleEl.textContent = ch.title;
      titleEl.style.opacity = '1';
    }
    if (badgeEl) {
      badgeEl.textContent = ch.badge;
      badgeEl.style.opacity = '1';
    }
  }, 220);

  chapters.forEach((_c, i) => {
    const t = document.getElementById(`nav-track-${i + 1}`);
    if (!t) return;
    if (i === ci) t.classList.remove('hidden');
    else t.classList.add('hidden');
  });
}

function flatSections(): { id: string }[] {
  return chapters.flatMap((ch) => ch.sections);
}

function onScroll() {
  const scrolled = window.scrollY;
  const total = document.body.scrollHeight - window.innerHeight;
  const fill = document.getElementById('progress-fill');
  if (fill) {
    fill.style.width = `${Math.min(100, total > 0 ? (scrolled / total) * 100 : 0)}%`;
  }

  const flat = flatSections();
  let activeFlat = -1;
  flat.forEach((s, i) => {
    const el = document.getElementById(s.id);
    if (el && el.getBoundingClientRect().top < window.innerHeight * 0.5) activeFlat = i;
  });

  let counted = 0;
  chapters.forEach((ch, ci) => {
    const chStart = counted;
    const chEnd = counted + ch.sections.length - 1;
    if (activeFlat >= chStart && activeFlat <= chEnd) switchChapter(ci);
    counted += ch.sections.length;
  });

  let global = 0;
  chapters.forEach((ch, ci) => {
    ch.sections.forEach((_s, si) => {
      const dot = document.querySelector(`#nav-track-${ci + 1} .nav-dot[data-target="${ch.sections[si]?.id}"]`);
      if (!dot) {
        global += 1;
        return;
      }
      dot.classList.remove('active', 'visited');
      if (global === activeFlat) dot.classList.add('active');
      else if (global < activeFlat) dot.classList.add('visited');
      global += 1;
    });
  });
}

function initReveal() {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) e.target.classList.add('visible');
      });
    },
    { threshold: 0.05 },
  );
  document.querySelectorAll('.section-left,.section-right').forEach((el) => io.observe(el));
}

initDots();
initReveal();
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

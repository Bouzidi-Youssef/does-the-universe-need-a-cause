import { useState } from 'preact/hooks';
import { generateShareToken, buildShareUrl } from '../../utils/shareToken';

export default function ShareLink() {
  const [link, setLink] = useState('');
  const [copied, setCopied] = useState(false);

  const createLink = () => {
    const token = generateShareToken(16);
    const base = typeof window !== 'undefined' ? window.location.href.split('?')[0] : '';
    setLink(buildShareUrl(base, token));
    setCopied(false);
  };

  const copyLink = async () => {
    if (!link) return;
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div style="margin-top:18px;display:flex;gap:10px;align-items:center;flex-wrap:wrap;">
      <button
        class="begin-btn"
        onClick={createLink}
        style="font-size:0.85rem;"
      >
        Copy share link
      </button>
      {link && (
        <>
          <code style="font-family:'Space Mono',monospace;font-size:11px;color:var(--text-muted);max-width:320px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">
            {link}
          </code>
          <button class="ctrl-btn next" onClick={copyLink}>
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </>
      )}
    </div>
  );
}

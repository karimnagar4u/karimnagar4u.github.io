import { useState } from 'react';
import { X, Copy, Download, FileCode2, Check } from 'lucide-react';

interface MarkdownModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  markdownContent: string;
}

export function MarkdownModal({
  isOpen,
  onClose,
  title,
  markdownContent,
}: MarkdownModalProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard?.writeText(markdownContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const filename = `${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.md`;
    const element = document.createElement('a');
    const file = new Blob([markdownContent], { type: 'text/markdown' });
    element.href = URL.createObjectURL(file);
    element.download = filename;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div
      id="jekyll-markdown-modal"
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-neutral-900 text-neutral-100 w-full max-w-3xl rounded-2xl border border-neutral-700 shadow-2xl overflow-hidden flex flex-col max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-neutral-800 flex items-center justify-between bg-neutral-950">
          <div className="flex items-center gap-2">
            <FileCode2 className="w-5 h-5 text-amber-400" />
            <div>
              <h3 className="text-sm font-bold text-white font-mono">
                Jekyll Markdown Source (.md)
              </h3>
              <p className="text-xs text-neutral-400 truncate max-w-md">
                {title}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Code Content */}
        <div className="p-6 overflow-y-auto flex-1 bg-neutral-950/70 font-mono text-xs text-neutral-300">
          <pre className="whitespace-pre-wrap leading-relaxed">
            {markdownContent}
          </pre>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-3.5 border-t border-neutral-800 bg-neutral-950 flex items-center justify-between">
          <span className="text-xs text-neutral-400 font-mono">
            Host in <code className="text-amber-400">_events/</code> or <code className="text-emerald-400">_rentals/</code>
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-xs font-semibold text-white transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy Markdown'}</span>
            </button>

            <button
              onClick={handleDownload}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white text-neutral-900 hover:bg-neutral-100 text-xs font-bold transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download .md</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

import {
  useEffect,
  useId,
  useRef,
  useState,
  type ClipboardEvent,
  type DragEvent,
  type KeyboardEvent,
  type MouseEvent,
} from 'react';
import type { WorldId } from '../types/lesson';
import { PixelButton } from './PixelButton';
import { PixelCheckIcon, PixelPlayIcon, PixelResetIcon } from './PixelIcons';

interface CodeEditorProps {
  world: WorldId;
  code: string;
  onChange: (value: string) => void;
  onRun: () => void;
  onReset: () => void;
  onCheck: () => void;
  statusNote?: string;
}

export function CodeEditor({
  world,
  code,
  onChange,
  onRun,
  onReset,
  onCheck,
  statusNote,
}: CodeEditorProps) {
  const editorId = useId();
  const [clipboardNotice, setClipboardNotice] = useState('');
  const noticeTimerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (noticeTimerRef.current !== null) {
        window.clearTimeout(noticeTimerRef.current);
      }
    };
  }, []);

  const fileName = world === 'html' ? 'index.html' : 'style.css';
  const lines = code.split('\n');
  const lineCount = Math.max(8, lines.length);

  const insertIndent = () => {
    onChange(`${code}${code.endsWith('\n') || code.length === 0 ? '' : '\n'}  `);
  };

  const showBlockedFeedback = (message: string) => {
    setClipboardNotice(message);
    if (noticeTimerRef.current !== null) {
      window.clearTimeout(noticeTimerRef.current);
    }
    noticeTimerRef.current = window.setTimeout(() => {
      setClipboardNotice('');
    }, 2600);
  };

  const handleBlockedEvent = (
    message: string,
    e:
      | ClipboardEvent<HTMLTextAreaElement>
      | DragEvent<HTMLTextAreaElement>
      | MouseEvent<HTMLTextAreaElement>
      | KeyboardEvent<HTMLTextAreaElement>
  ) => {
    e.preventDefault();
    showBlockedFeedback(message);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    const isMod = e.ctrlKey || e.metaKey;
    const keyLower = e.key.toLowerCase();

    if (isMod && (keyLower === 'v' || keyLower === 'c' || keyLower === 'x')) {
      handleBlockedEvent('Salin dan tempel dinonaktifkan. Ketik manual ya!', e);
      return;
    }

    if (e.shiftKey && e.key === 'Insert') {
      handleBlockedEvent('Tempel dinonaktifkan. Ketik manual ya!', e);
    }
  };

  const activeNote = clipboardNotice || statusNote;

  return (
    <section
      aria-label="Editor kode retro"
      className="pixel-box overflow-hidden bg-navy-deep text-white"
    >
      {/* Retro editor header bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b-[3px] border-navy bg-navy px-3.5 py-2.5">
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-1.5" aria-hidden="true">
            <span className="h-3 w-3 border border-white/40 bg-pastel-pink" />
            <span className="h-3 w-3 border border-white/40 bg-sky-blue" />
            <span className="h-3 w-3 border border-white/40 bg-lavender" />
          </div>
          <label
            htmlFor={editorId}
            className="font-pixel text-[10px] text-sky-blue sm:text-xs"
          >
            {fileName}
          </label>
        </div>

        <div className="flex items-center gap-2">
          {activeNote && (
            <span
              role="status"
              aria-live="polite"
              className="font-mono text-xs text-pastel-pink"
            >
              {activeNote}
            </span>
          )}
          <button
            type="button"
            onClick={insertIndent}
            className="min-h-[44px] border-2 border-lavender/70 bg-navy-deep px-2.5 py-1 font-mono text-xs text-lavender hover:bg-navy"
            title="Tambah baris baru dengan 2 spasi indentasi"
          >
            +2 Spasi
          </button>
        </div>
      </div>

      {/* Line-numbered monospace textarea with copy/cut/paste blocked */}
      <div className="flex max-h-[340px] min-h-[210px] overflow-auto bg-navy-deep">
        <div
          aria-hidden="true"
          className="select-none border-r-2 border-navy bg-navy/60 px-2.5 py-3 text-right font-mono text-xs leading-6 text-lavender/85 sm:text-sm"
        >
          {Array.from({ length: lineCount }).map((_, idx) => (
            <div key={idx}>{idx + 1}</div>
          ))}
        </div>
        <textarea
          id={editorId}
          value={code}
          onChange={(e) => onChange(e.target.value)}
          onPaste={(e) =>
            handleBlockedEvent('Tempel dinonaktifkan. Ketik manual ya!', e)
          }
          onCopy={(e) =>
            handleBlockedEvent('Salin teks dinonaktifkan di editor.', e)
          }
          onCut={(e) =>
            handleBlockedEvent('Potong teks dinonaktifkan di editor.', e)
          }
          onDrop={(e) =>
            handleBlockedEvent('Seret teks dinonaktifkan. Ketik manual ya!', e)
          }
          onContextMenu={(e) =>
            handleBlockedEvent('Menu salin/tempel dinonaktifkan.', e)
          }
          onKeyDown={handleKeyDown}
          spellCheck={false}
          autoCapitalize="off"
          autoComplete="off"
          autoCorrect="off"
          rows={Math.max(9, lines.length + 1)}
          placeholder={
            world === 'html'
              ? 'Ketik kode HTML kamu secara manual di sini...'
              : 'Ketik kode CSS kamu secara manual di sini...'
          }
          className="w-full resize-y bg-transparent p-3 font-mono text-xs leading-6 text-white placeholder:text-lavender/80 focus:outline-none sm:text-sm"
        />
      </div>

      {/* Action toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-2.5 border-t-[3px] border-navy bg-navy px-3.5 py-3">
        <div className="flex flex-wrap items-center gap-2.5">
          <PixelButton
            variant="primary"
            size="sm"
            onClick={onRun}
            aria-label="Jalankan kode untuk melihat preview"
          >
            <PixelPlayIcon size={14} />
            <span>RUN CODE</span>
          </PixelButton>

          <PixelButton
            variant="secondary"
            size="sm"
            onClick={onReset}
            aria-label="Kembalikan kode ke awal"
          >
            <PixelResetIcon size={14} />
            <span>RESET</span>
          </PixelButton>
        </div>

        <PixelButton
          variant="accent"
          size="sm"
          onClick={onCheck}
          aria-label="Periksa jawaban misi"
        >
          <PixelCheckIcon size={14} />
          <span>CHECK ANSWER</span>
        </PixelButton>
      </div>
    </section>
  );
}

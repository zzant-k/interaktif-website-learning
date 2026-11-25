import type { ClipboardEvent, DragEvent, MouseEvent, ReactNode } from 'react';
import type { WorldId } from '../types/lesson';

interface CodeHighlighterProps {
  code: string;
  language: WorldId;
}

function highlightHtmlLine(line: string, lineIndex: number): ReactNode[] {
  const tokens = line.split(/(<\/?[a-zA-Z0-9!-]+|\s+[a-zA-Z-]+="[^"]*"|>|\/?>)/g);
  return tokens
    .filter((t) => t.length > 0)
    .map((token, idx) => {
      const key = `${lineIndex}-${idx}`;
      if (token.startsWith('<!--')) {
        return (
          <span key={key} className="text-lavender/80 italic">
            {token}
          </span>
        );
      }
      if (/^<\/?[a-zA-Z0-9!-]+$/.test(token) || token === '>' || token === '/>') {
        return (
          <span key={key} className="text-pastel-pink font-semibold">
            {token}
          </span>
        );
      }
      if (/^\s+[a-zA-Z-]+="[^"]*"$/.test(token)) {
        const eqIdx = token.indexOf('=');
        const attrName = token.slice(0, eqIdx);
        const attrVal = token.slice(eqIdx);
        return (
          <span key={key}>
            <span className="text-lavender">{attrName}</span>
            <span className="text-sky-blue">{attrVal}</span>
          </span>
        );
      }
      return (
        <span key={key} className="text-white">
          {token}
        </span>
      );
    });
}

function highlightCssLine(line: string, lineIndex: number): ReactNode[] {
  const trimmed = line.trim();
  if (trimmed.startsWith('/*')) {
    return [
      <span key={`${lineIndex}-c`} className="text-lavender/80 italic">
        {line}
      </span>,
    ];
  }
  if (trimmed.endsWith('{')) {
    return [
      <span key={`${lineIndex}-s`} className="text-pastel-pink font-semibold">
        {line}
      </span>,
    ];
  }
  if (trimmed === '}') {
    return [
      <span key={`${lineIndex}-e`} className="text-pastel-pink font-semibold">
        {line}
      </span>,
    ];
  }
  const colonIdx = line.indexOf(':');
  if (colonIdx !== -1) {
    const prop = line.slice(0, colonIdx);
    const rest = line.slice(colonIdx);
    return [
      <span key={`${lineIndex}-p`} className="text-sky-blue">
        {prop}
      </span>,
      <span key={`${lineIndex}-v`} className="text-white">
        {rest}
      </span>,
    ];
  }
  return [
    <span key={`${lineIndex}-t`} className="text-white">
      {line}
    </span>,
  ];
}

export function CodeHighlighter({ code, language }: CodeHighlighterProps) {
  const lines = code.split('\n');

  const preventInteraction = (
    e:
      | ClipboardEvent<HTMLPreElement>
      | DragEvent<HTMLPreElement>
      | MouseEvent<HTMLPreElement>
  ) => {
    e.preventDefault();
  };

  return (
    <pre
      onCopy={preventInteraction}
      onCut={preventInteraction}
      onDragStart={preventInteraction}
      onContextMenu={preventInteraction}
      className="select-none overflow-x-auto border-[3px] border-navy bg-navy-deep p-3.5 font-mono text-xs leading-6 text-white sm:text-sm"
    >
      <code className="select-none">
        {lines.map((line, i) => (
          <div key={i} className="flex gap-3">
            <span
              aria-hidden="true"
              className="w-5 shrink-0 select-none text-right text-lavender/80"
            >
              {i + 1}
            </span>
            <span className="min-w-0 whitespace-pre">
              {language === 'html'
                ? highlightHtmlLine(line, i)
                : highlightCssLine(line, i)}
            </span>
          </div>
        ))}
      </code>
    </pre>
  );
}

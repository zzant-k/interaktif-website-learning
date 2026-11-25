import type { WorldId } from '../types/lesson';

interface CodePreviewProps {
  world: WorldId;
  renderedCode: string;
  baseHtml?: string;
  runCount: number;
}

const KOKO_DATA_URI =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 16 16" shape-rendering="crispEdges"><rect width="16" height="16" fill="#A7D8FF"/><rect x="4" y="1" width="8" height="3" fill="#25245B"/><rect x="5" y="2" width="6" height="2" fill="#6D9DFF"/><rect x="3" y="4" width="10" height="1" fill="#FFF1FC"/><rect x="4" y="5" width="8" height="4" fill="#25245B"/><rect x="5" y="5" width="6" height="3" fill="#FFE2D6"/><rect x="6" y="6" width="1" height="1" fill="#25245B"/><rect x="9" y="6" width="1" height="1" fill="#25245B"/><rect x="4" y="9" width="8" height="4" fill="#25245B"/><rect x="5" y="9" width="6" height="3" fill="#6D9DFF"/><rect x="5" y="13" width="2" height="2" fill="#25245B"/><rect x="9" y="13" width="2" height="2" fill="#25245B"/></svg>`
  );

const KOTA_DATA_URI =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="140" height="80" viewBox="0 0 28 16" shape-rendering="crispEdges"><rect width="28" height="16" fill="#F6A8E8"/><rect x="0" y="12" width="28" height="4" fill="#25245B"/><rect x="2" y="6" width="5" height="6" fill="#6D9DFF"/><rect x="9" y="3" width="6" height="9" fill="#25245B"/><rect x="17" y="5" width="5" height="7" fill="#C7B6FF"/><rect x="23" y="7" width="4" height="5" fill="#A7D8FF"/><rect x="10" y="5" width="1" height="1" fill="#FFF1FC"/><rect x="12" y="5" width="1" height="1" fill="#FFF1FC"/></svg>`
  );

function resolveStarterImages(html: string): string {
  return html
    .replace(/src=(["'])(?:\/)?koko\.svg\1/gi, `src="${KOKO_DATA_URI}"`)
    .replace(/src=(["'])(?:\/)?kota\.svg\1/gi, `src="${KOTA_DATA_URI}"`);
}

function buildSrcDoc(world: WorldId, code: string, baseHtml?: string): string {
  if (world === 'html') {
    const safeHtml = resolveStarterImages(code);
    return `<!doctype html>
<html lang="id">
<head>
<meta charset="utf-8" />
<style>
  body {
    margin: 0;
    padding: 16px;
    font-family: system-ui, -apple-system, sans-serif;
    color: #25245B;
    background: #FFFFFF;
    line-height: 1.5;
  }
  img { max-width: 100%; height: auto; }
  a { color: #1E40AF; }
</style>
</head>
<body>${safeHtml}</body>
</html>`;
  }

  return `<!doctype html>
<html lang="id">
<head>
<meta charset="utf-8" />
<style>
  body {
    margin: 0;
    padding: 0;
    font-family: system-ui, -apple-system, sans-serif;
    background: #FFFFFF;
    color: #25245B;
  }
  ${code}
</style>
</head>
<body>${baseHtml ?? ''}</body>
</html>`;
}

export function CodePreview({
  world,
  renderedCode,
  baseHtml,
  runCount,
}: CodePreviewProps) {
  const isEmptyHtml = world === 'html' && renderedCode.trim().length === 0;
  const srcDoc = buildSrcDoc(world, renderedCode, baseHtml);

  return (
    <section
      aria-label="Preview hasil kode"
      className="pixel-box overflow-hidden bg-white text-navy"
    >
      <div className="flex flex-wrap items-center justify-between gap-2 border-b-[3px] border-navy bg-sky-blue px-3.5 py-2.5">
        <span className="font-pixel text-[10px] text-navy sm:text-xs">
          PREVIEW HASIL
        </span>
        <span className="font-mono text-xs font-semibold text-navy">
          {runCount === 0 ? 'Tampilan awal' : `Dijalankan (${runCount}x)`}
        </span>
      </div>

      {isEmptyHtml ? (
        <div className="flex min-h-[190px] flex-col items-center justify-center bg-light-bg p-6 text-center">
          <p className="font-pixel text-[11px] text-navy">
            CANVAS MASIH KOSONG
          </p>
          <p className="mt-2 max-w-sm text-sm text-navy/90">
            Tulis kode HTML kamu di editor, lalu klik RUN CODE untuk melihat
            hasilnya di layar ini.
          </p>
        </div>
      ) : (
        <iframe
          title="Preview Kode CODE QUEST"
          sandbox=""
          srcDoc={srcDoc}
          className="block min-h-[210px] w-full bg-white"
        />
      )}
    </section>
  );
}


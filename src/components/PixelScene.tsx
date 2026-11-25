export function PixelCitySkyline({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 640 96"
      preserveAspectRatio="none"
      shapeRendering="crispEdges"
      aria-hidden="true"
      className={`pointer-events-none w-full select-none ${className}`}
    >
      {/* Distant pastel city silhouettes */}
      <g fill="#C7B6FF" opacity="0.65">
        <rect x="16" y="42" width="38" height="54" />
        <rect x="64" y="28" width="44" height="68" />
        <rect x="122" y="48" width="32" height="48" />
        <rect x="176" y="20" width="48" height="76" />
        <rect x="240" y="50" width="40" height="46" />
        <rect x="348" y="34" width="46" height="62" />
        <rect x="412" y="18" width="42" height="78" />
        <rect x="470" y="44" width="38" height="52" />
        <rect x="526" y="26" width="52" height="70" />
        <rect x="590" y="40" width="36" height="56" />
      </g>
      {/* Foreground pixel towers with tiny windows */}
      <g fill="#A7D8FF" opacity="0.75">
        <rect x="40" y="54" width="32" height="42" />
        <rect x="148" y="46" width="36" height="50" />
        <rect x="292" y="52" width="38" height="44" />
        <rect x="444" y="48" width="36" height="48" />
        <rect x="562" y="54" width="32" height="42" />
      </g>
      <g fill="#FFF1FC" opacity="0.85">
        <rect x="74" y="38" width="6" height="6" />
        <rect x="88" y="38" width="6" height="6" />
        <rect x="74" y="52" width="6" height="6" />
        <rect x="188" y="32" width="6" height="6" />
        <rect x="202" y="32" width="6" height="6" />
        <rect x="422" y="30" width="6" height="6" />
        <rect x="434" y="30" width="6" height="6" />
        <rect x="538" y="40" width="6" height="6" />
        <rect x="552" y="40" width="6" height="6" />
      </g>
    </svg>
  );
}

export function PixelBrickPlatform({ className = '' }: { className?: string }) {
  return (
    <div className={`w-full select-none ${className}`} aria-hidden="true">
      <div className="h-2 w-full bg-navy" />
      <div className="pixel-brick-row h-7 w-full border-b-[3px] border-navy" />
      {/* Jagged overhanging pixel blocks inspired by the platformer reference */}
      <div className="grid grid-cols-12">
        <div className="col-span-2 h-3 bg-navy/85 border-r-2 border-navy" />
        <div className="col-span-1 h-5 bg-pixel-blue/80 border-2 border-t-0 border-navy" />
        <div className="col-span-2" />
        <div className="col-span-2 h-4 bg-navy/85 border-2 border-t-0 border-navy" />
        <div className="col-span-1" />
        <div className="col-span-2 h-5 bg-pixel-blue/75 border-2 border-t-0 border-navy" />
        <div className="col-span-2 h-3 bg-navy/85 border-l-2 border-navy" />
      </div>
    </div>
  );
}

export function PixelClouds() {
  return (
    <svg
      viewBox="0 0 640 80"
      preserveAspectRatio="none"
      shapeRendering="crispEdges"
      aria-hidden="true"
      className="pointer-events-none w-full select-none"
    >
      <g fill="#FFFFFF" opacity="0.75">
        <rect x="48" y="20" width="64" height="14" />
        <rect x="64" y="10" width="32" height="12" />
        <rect x="270" y="36" width="84" height="16" />
        <rect x="290" y="24" width="44" height="14" />
        <rect x="490" y="16" width="76" height="14" />
        <rect x="508" y="8" width="38" height="10" />
      </g>
    </svg>
  );
}

export function PixelTree({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 128"
      shapeRendering="crispEdges"
      aria-hidden="true"
      className={`pointer-events-none select-none ${className}`}
    >
      {/* Trunk */}
      <rect x="26" y="72" width="12" height="56" fill="#25245B" />
      <rect x="29" y="74" width="6" height="54" fill="#4B5596" />
      {/* Pixel foliage clusters */}
      <rect x="10" y="22" width="44" height="44" fill="#25245B" />
      <rect x="16" y="10" width="32" height="16" fill="#25245B" />
      <rect x="4" y="34" width="56" height="24" fill="#25245B" />
      <rect x="14" y="16" width="36" height="44" fill="#6D9DFF" />
      <rect x="8" y="36" width="48" height="20" fill="#6D9DFF" />
      <rect x="18" y="18" width="22" height="18" fill="#A7D8FF" />
      <rect x="34" y="42" width="16" height="12" fill="#A7D8FF" />
    </svg>
  );
}

export function PixelUtilityPole({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 180 140"
      shapeRendering="crispEdges"
      aria-hidden="true"
      className={`pointer-events-none select-none ${className}`}
    >
      {/* Power lines */}
      <path
        d="M0 24 Q90 42 180 28 M0 40 Q90 58 180 44"
        fill="none"
        stroke="#6D9DFF"
        strokeWidth="2"
        opacity="0.7"
      />
      {/* Pole */}
      <rect x="106" y="12" width="10" height="128" fill="#C7B6FF" />
      <rect x="108" y="12" width="4" height="128" fill="#FFFFFF" opacity="0.55" />
      <rect x="88" y="22" width="46" height="5" fill="#25245B" />
      <rect x="92" y="38" width="38" height="4" fill="#25245B" />
    </svg>
  );
}


import type { SVGProps } from 'react';

interface IconProps extends SVGProps<SVGSVGElement> {
  size?: number;
  filled?: boolean;
}

export function PixelHeartIcon({
  size = 20,
  filled = true,
  className = '',
  ...props
}: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      shapeRendering="crispEdges"
      aria-hidden="true"
      className={className}
      {...props}
    >
      <path
        d="M2 3h4v1h4V3h4v1h1v4h-1v2h-2v2h-2v2H6v-2H4v-2H2V8H1V4h1V3z"
        fill="#25245B"
      />
      <path
        d="M3 4h3v1h4V4h3v4h-1v2h-2v2H6v-2H4V8H3V4z"
        fill={filled ? '#F6A8E8' : '#FFF1FC'}
      />
      {filled && <rect x="4" y="5" width="2" height="2" fill="#FFFFFF" />}
    </svg>
  );
}

export function PixelStarIcon({
  size = 20,
  filled = true,
  className = '',
  ...props
}: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      shapeRendering="crispEdges"
      aria-hidden="true"
      className={className}
      {...props}
    >
      <path
        d="M7 1h2v3h4v2h-2v3h1v4H9v-2H7v2H4V9h1V6H3V4h4V1z"
        fill="#25245B"
      />
      <path
        d="M7 2h2v3h3v1h-2v3h1v3H9v-2H7v2H5V9h1V6H4V5h3V2z"
        fill={filled ? '#F6A8E8' : '#C7B6FF'}
      />
      <rect x="7" y="4" width="2" height="3" fill="#FFFFFF" />
    </svg>
  );
}

export function PixelTrophyIcon({
  size = 22,
  filled = true,
  className = '',
  ...props
}: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      shapeRendering="crispEdges"
      aria-hidden="true"
      className={className}
      {...props}
    >
      <rect x="3" y="2" width="10" height="6" fill="#25245B" />
      <rect x="1" y="3" width="2" height="3" fill="#25245B" />
      <rect x="13" y="3" width="2" height="3" fill="#25245B" />
      <rect x="6" y="8" width="4" height="3" fill="#25245B" />
      <rect x="4" y="11" width="8" height="3" fill="#25245B" />
      <rect
        x="4"
        y="3"
        width="8"
        height="4"
        fill={filled ? '#A7D8FF' : '#C7B6FF'}
      />
      <rect x="5" y="4" width="2" height="2" fill="#FFFFFF" />
      <rect
        x="5"
        y="12"
        width="6"
        height="1"
        fill={filled ? '#F6A8E8' : '#FFFFFF'}
      />
    </svg>
  );
}

export function PixelCheckIcon({
  size = 18,
  className = '',
  ...props
}: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      shapeRendering="crispEdges"
      aria-hidden="true"
      className={className}
      {...props}
    >
      <rect x="1" y="1" width="14" height="14" fill="#25245B" />
      <rect x="2" y="2" width="12" height="12" fill="#B8F5D4" />
      <path
        d="M4 8h2v2h2V8h2V6h2v2h-2v2H8v2H6v-2H4V8z"
        fill="#124D33"
      />
    </svg>
  );
}

export function PixelLockIcon({
  size = 18,
  className = '',
  ...props
}: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      shapeRendering="crispEdges"
      aria-hidden="true"
      className={className}
      {...props}
    >
      <path d="M5 2h6v4h2v8H3V6h2V2z" fill="#25245B" />
      <rect x="6" y="3" width="4" height="3" fill="#FFF1FC" />
      <rect x="4" y="7" width="8" height="6" fill="#C7B6FF" />
      <rect x="7" y="9" width="2" height="3" fill="#25245B" />
    </svg>
  );
}

export function PixelBulbIcon({
  size = 18,
  className = '',
  ...props
}: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      shapeRendering="crispEdges"
      aria-hidden="true"
      className={className}
      {...props}
    >
      <path d="M5 1h6v2h2v5h-2v3H5V8H3V3h2V1z" fill="#25245B" />
      <path d="M6 2h4v2h2v4h-2v2H6V8H4V4h2V2z" fill="#F6A8E8" />
      <rect x="6" y="4" width="2" height="2" fill="#FFFFFF" />
      <rect x="5" y="12" width="6" height="2" fill="#25245B" />
      <rect x="6" y="14" width="4" height="1" fill="#25245B" />
    </svg>
  );
}

export function PixelPlayIcon({
  size = 16,
  className = '',
  ...props
}: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      shapeRendering="crispEdges"
      aria-hidden="true"
      className={className}
      {...props}
    >
      <path
        d="M3 2h2v2h2v2h2v1h2v2H9v1H7v2H5v2H3V2z"
        fill="currentColor"
      />
    </svg>
  );
}

export function PixelResetIcon({
  size = 16,
  className = '',
  ...props
}: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      shapeRendering="crispEdges"
      aria-hidden="true"
      className={className}
      {...props}
    >
      <path
        d="M4 3h7v2H5v6h6V8h2v5H3V5h1V3z"
        fill="currentColor"
      />
      <path d="M2 3h4v4H4V5H2V3z" fill="currentColor" />
    </svg>
  );
}

export function PixelSoundIcon({
  size = 18,
  enabled = true,
  className = '',
}: IconProps & { enabled?: boolean }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      shapeRendering="crispEdges"
      aria-hidden="true"
      className={className}
    >
      <path d="M2 6h3l4-3v10L5 10H2V6z" fill="currentColor" />
      {enabled ? (
        <>
          <rect x="11" y="5" width="2" height="6" fill="currentColor" />
          <rect x="13" y="3" width="2" height="10" fill="currentColor" />
        </>
      ) : (
        <path
          d="M11 5h2v2h2v2h-2v2h-2V9h-1V7h1V5z"
          fill="#F6A8E8"
        />
      )}
    </svg>
  );
}

export function PixelCodeIcon({
  size = 18,
  className = '',
  ...props
}: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      shapeRendering="crispEdges"
      aria-hidden="true"
      className={className}
      {...props}
    >
      <path
        d="M5 4v2H3v4h2v2H3v-1H1V5h2V4h2zm6 0h2v1h2v6h-2v1h-2v-2h2V6h-2V4zM7 12V4h2v8H7z"
        fill="currentColor"
      />
    </svg>
  );
}


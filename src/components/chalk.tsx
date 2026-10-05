import { cn } from "cn"

// SVG filter behind the `chalk` utility: rough edges plus grainy gaps.
// Rendered once; never put `chalk` on an ancestor of a glass surface,
// a CSS filter breaks the descendants' backdrop blur.
export function ChalkFilter() {
  return (
    <svg aria-hidden className="absolute size-0">
      <filter id="chalk">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.8"
          numOctaves="2"
          seed="7"
          result="noise"
        />
        <feDisplacementMap
          in="SourceGraphic"
          in2="noise"
          scale="2.5"
          result="rough"
        />
        <feColorMatrix
          in="noise"
          type="matrix"
          values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  4 0 0 0 -1.1"
          result="grain"
        />
        <feComposite in="rough" in2="grain" operator="in" />
      </filter>
    </svg>
  )
}

export function ChalkUnderline({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 200 12"
      preserveAspectRatio="none"
      className={cn("h-3 overflow-visible chalk", className)}
    >
      <path
        d="M3 8 C 45 3, 85 11, 125 6 S 185 4, 197 7"
        pathLength={1}
        fill="none"
        stroke="currentColor"
        strokeWidth={3}
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  )
}

// Points right; rotate with classes for other directions.
export function ChalkArrow({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 80 40"
      className={cn("overflow-visible chalk", className)}
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 21 C 25 16, 50 25, 74 20" />
      <path d="M63 12 L75 20 L64 29" />
    </svg>
  )
}

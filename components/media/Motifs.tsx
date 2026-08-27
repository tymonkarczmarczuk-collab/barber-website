/**
 * Line-art motifs drawn faintly behind media placeholders so an empty
 * frame still reads as part of the design rather than as a gap.
 * Every motif inherits `currentColor` and stays extremely quiet.
 */

type MotifProps = { className?: string };

export function DialMotif({ className }: MotifProps) {
  const ticks = Array.from({ length: 12 }, (_, i) => i * 30);
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true" fill="none">
      <circle cx="100" cy="100" r="86" stroke="currentColor" strokeWidth="0.75" />
      <circle cx="100" cy="100" r="74" stroke="currentColor" strokeWidth="0.5" />
      {ticks.map((a) => (
        <line
          key={a}
          x1="100"
          y1="30"
          x2="100"
          y2="40"
          stroke="currentColor"
          strokeWidth="1"
          transform={`rotate(${a} 100 100)`}
        />
      ))}
      <line x1="100" y1="100" x2="66" y2="66" stroke="currentColor" strokeWidth="1" />
      <line x1="100" y1="100" x2="138" y2="82" stroke="currentColor" strokeWidth="1" />
      <circle cx="100" cy="100" r="2.5" fill="currentColor" />
    </svg>
  );
}

export function CasebackMotif({ className }: MotifProps) {
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true" fill="none">
      <circle cx="100" cy="100" r="88" stroke="currentColor" strokeWidth="0.75" />
      <circle cx="100" cy="100" r="78" stroke="currentColor" strokeWidth="0.5" />
      <circle cx="100" cy="82" r="28" stroke="currentColor" strokeWidth="0.75" strokeDasharray="3 4" />
      <line x1="72" y1="136" x2="128" y2="136" stroke="currentColor" strokeWidth="0.75" />
      <line x1="80" y1="150" x2="120" y2="150" stroke="currentColor" strokeWidth="0.5" />
    </svg>
  );
}

export function CaseMotif({ className }: MotifProps) {
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true" fill="none">
      <path d="M62 46 L62 22 Q62 14 74 14 L86 14 Q98 14 98 22 L98 46" stroke="currentColor" strokeWidth="0.75" />
      <path d="M62 154 L62 178 Q62 186 74 186 L86 186 Q98 186 98 178 L98 154" stroke="currentColor" strokeWidth="0.75" />
      <rect x="34" y="46" width="132" height="108" rx="14" stroke="currentColor" strokeWidth="0.75" />
      <rect x="46" y="58" width="108" height="84" rx="8" stroke="currentColor" strokeWidth="0.5" />
      <line x1="166" y1="90" x2="180" y2="90" stroke="currentColor" strokeWidth="0.75" />
      <line x1="166" y1="110" x2="180" y2="110" stroke="currentColor" strokeWidth="0.75" />
    </svg>
  );
}

export function StrapMotif({ className }: MotifProps) {
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true" fill="none">
      <path d="M70 8 L130 8 L136 100 L140 192 L60 192 L64 100 Z" stroke="currentColor" strokeWidth="0.75" />
      <path d="M78 14 L74 186" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 6" />
      <path d="M122 14 L126 186" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 6" />
      <rect x="76" y="86" width="48" height="28" rx="3" stroke="currentColor" strokeWidth="0.75" />
    </svg>
  );
}

export function MovementMotif({ className }: MotifProps) {
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true" fill="none">
      <circle cx="100" cy="100" r="80" stroke="currentColor" strokeWidth="0.75" />
      <circle cx="100" cy="100" r="24" stroke="currentColor" strokeWidth="0.5" />
      <circle cx="140" cy="70" r="16" stroke="currentColor" strokeWidth="0.5" />
      <circle cx="64" cy="130" r="20" stroke="currentColor" strokeWidth="0.5" />
      <rect x="46" y="52" width="34" height="52" rx="3" stroke="currentColor" strokeWidth="0.5" />
      <line x1="100" y1="20" x2="100" y2="180" stroke="currentColor" strokeWidth="0.35" />
      <line x1="20" y1="100" x2="180" y2="100" stroke="currentColor" strokeWidth="0.35" />
    </svg>
  );
}

export function HorizonMotif({ className }: MotifProps) {
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true" fill="none">
      <line x1="10" y1="118" x2="190" y2="118" stroke="currentColor" strokeWidth="0.75" />
      <path d="M10 118 Q60 92 108 108 Q150 122 190 100" stroke="currentColor" strokeWidth="0.5" />
      <circle cx="146" cy="72" r="16" stroke="currentColor" strokeWidth="0.75" />
      <line x1="10" y1="146" x2="190" y2="146" stroke="currentColor" strokeWidth="0.35" />
      <line x1="10" y1="164" x2="190" y2="164" stroke="currentColor" strokeWidth="0.35" />
    </svg>
  );
}

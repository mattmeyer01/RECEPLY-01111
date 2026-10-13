// Ikony spoza Lucide (Lucide nie ma już ikon marek). Ten sam kształt co
// glif Instagrama w hero, z propsami zgodnymi z ikonami Lucide.
export function InstagramIcon({
  size = 16,
  strokeWidth = 2,
  className = '',
}: {
  size?: number;
  strokeWidth?: number;
  className?: string;
}) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <rect x="2.5" y="2.5" width="19" height="19" rx="5" stroke="currentColor" strokeWidth={strokeWidth} />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth={strokeWidth} />
      <circle cx="17.5" cy="6.5" r="1.1" fill="currentColor" />
    </svg>
  );
}

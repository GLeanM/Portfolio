type SilhouetteProps = {
  className?: string;
};

export function MountainSilhouette({ className }: SilhouetteProps) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 1200 400"
      preserveAspectRatio="none"
      className={className}
    >
      <path
        fill="#000000"
        d="M0,400 L0,320 L100,260 L200,300 L320,180 L420,260 L520,90 L620,240 L740,190 L860,280 L980,200 L1080,260 L1200,300 L1200,400 Z"
      />
    </svg>
  );
}

export function ClimberSilhouette({ className }: SilhouetteProps) {
  return (
    <svg aria-hidden viewBox="0 0 100 100" className={className}>
      <circle cx="50" cy="15" r="8" fill="#000000" />
      <path
        d="M46,28 L65,5 M48,30 L30,35 L15,40 M50,23 L44,50 M44,50 L55,68 L48,88 M46,52 L25,60 L10,72"
        stroke="#000000"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

export function ClimbingHold({ className }: SilhouetteProps) {
  return (
    <svg aria-hidden viewBox="0 0 60 40" className={className}>
      <path
        fill="#000000"
        d="M5,20 C5,8 20,2 32,4 C46,6 55,14 54,24 C53,34 40,38 26,36 C14,34 5,30 5,20 Z"
      />
      <circle cx="28" cy="20" r="3" fill="var(--background)" />
    </svg>
  );
}

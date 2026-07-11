/*
  Every illustration in this file is intentionally imperfect — paths use slightly
  irregular control points instead of geometric primitives, so the site reads as
  "drawn" rather than "rendered." All strokes are pure ink-black; no color, ever.
*/

export function CupMark({ className = "", animate = true }) {
  return (
    <svg
      viewBox="0 0 220 220"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        className="ink-stroke"
        style={animate ? { "--len": 620, animationDelay: "0.1s" } : undefined}
        d="M46 78 C44 130 50 168 66 182 C86 200 138 201 158 182 C173 168 178 130 176 78"
      />
      <path
        className="ink-stroke"
        style={animate ? { "--len": 260, animationDelay: "0.5s" } : undefined}
        d="M42 76 C42 70 90 65 111 65 C132 65 180 70 180 76 C180 82 132 87 111 87 C90 87 42 82 42 76 Z"
      />
      <path
        className="ink-stroke"
        style={animate ? { "--len": 210, animationDelay: "0.9s" } : undefined}
        d="M176 88 C202 84 210 100 206 114 C202 129 182 136 166 130"
      />
      <g className={animate ? "animate-rise" : ""} style={{ transformOrigin: "95px 40px" }}>
        <path className="ink-stroke" d="M90 52 C82 44 96 34 90 24" />
      </g>
      <g
        className={animate ? "animate-rise" : ""}
        style={{ transformOrigin: "120px 40px", animationDelay: "0.8s" }}
      >
        <path className="ink-stroke" d="M120 50 C112 40 126 30 120 18" />
      </g>
    </svg>
  );
}

export function BeanIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 60 60" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        className="ink-stroke"
        d="M30 6 C14 8 6 22 8 36 C10 50 22 55 32 52 C46 48 54 32 50 20 C47 10 38 5 30 6 Z"
      />
      <path className="ink-stroke" d="M20 46 C26 34 30 24 40 12" />
    </svg>
  );
}

export function LeafIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 60 60" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        className="ink-stroke"
        d="M12 48 C10 26 24 8 48 8 C48 34 32 50 12 48 Z"
      />
      <path className="ink-stroke" d="M14 46 C24 34 34 24 46 10" />
    </svg>
  );
}

export function DropletIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 40 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        className="ink-stroke"
        d="M20 4 C28 18 34 26 34 33 C34 41 27 45 20 45 C13 45 6 41 6 33 C6 26 12 18 20 4 Z"
      />
    </svg>
  );
}

export function PushpinIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="9" r="5.5" className="ink-stroke" />
      <path className="ink-stroke" d="M12 14 L12 22" />
    </svg>
  );
}

export function Squiggle({ className = "" }) {
  return (
    <svg viewBox="0 0 220 16" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
      <path
        className="ink-stroke"
        d="M2 8 C 20 -2, 38 18, 56 8 S 92 -2, 110 8 S 146 18, 164 8 S 200 -2, 218 8"
        strokeWidth="1.4"
      />
    </svg>
  );
}

export function ScribbleUnderline({ className = "" }) {
  return (
    <svg viewBox="0 0 160 14" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
      <path
        className="ink-stroke"
        d="M3 9 C 40 2, 70 13, 110 6 C 128 3, 142 9, 157 5"
        strokeWidth="3"
      />
    </svg>
  );
}

export function CheckScribble({ className = "" }) {
  return (
    <svg viewBox="0 0 60 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        className="ink-stroke"
        style={{ "--len": 80 }}
        d="M6 26 C14 34 20 40 24 42 C32 32 44 14 54 6"
        strokeWidth="3.2"
      />
    </svg>
  );
}

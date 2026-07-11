import { useMemo, useState } from "react";
import { Check, Sparkles } from "lucide-react";
import { useOrder } from "../context/OrderContext.jsx";

const BASES = [
  { id: "espresso", label: "Espresso", price: 3.5, pattern: "dots" },
  { id: "matcha", label: "Matcha", price: 4.5, pattern: "waves" },
  { id: "coldbrew", label: "Cold Brew", price: 4, pattern: "hatch" },
];

const MILKS = [
  { id: "none", label: "No milk", opacity: 1, price: 0 },
  { id: "whole", label: "Whole", opacity: 0.85, price: 0 },
  { id: "oat", label: "Oat", opacity: 0.6, price: 0.6 },
  { id: "almond", label: "Almond", opacity: 0.45, price: 0.6 },
];

const SYRUPS = [
  { id: "none", label: "None", price: 0 },
  { id: "vanilla", label: "Vanilla", price: 0.5 },
  { id: "caramel", label: "Caramel", price: 0.5 },
  { id: "hazelnut", label: "Hazelnut", price: 0.5 },
];

const TOPPINGS = [
  { id: "cinnamon", label: "Cinnamon dust", price: 0.4 },
  { id: "cocoa", label: "Cocoa dust", price: 0.4 },
  { id: "cream", label: "Whipped cream", price: 0.7 },
  { id: "shot", label: "Extra shot", price: 0.9 },
];

const SIZES = [
  { id: "s", label: "S", fill: 52, mult: 0.85 },
  { id: "m", label: "M", fill: 70, mult: 1 },
  { id: "l", label: "L", fill: 88, mult: 1.2 },
];

function OptionGroup({ title, children }) {
  return (
    <div className="mb-7">
      <h3 className="text-xs font-semibold tracking-widest uppercase text-ink-faint mb-3">
        {title}
      </h3>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
}

function Chip({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-full text-sm font-medium border transition-all duration-150 ${
        active
          ? "bg-ink text-paper border-ink"
          : "bg-transparent text-ink-soft border-line hover:border-ink"
      }`}
    >
      {children}
    </button>
  );
}

const PATTERN_ID = { dots: "pat-dots", waves: "pat-waves", hatch: "pat-hatch" };

export default function DrinkBuilder() {
  const { lockIn } = useOrder();
  const [base, setBase] = useState(BASES[0]);
  const [milk, setMilk] = useState(MILKS[0]);
  const [syrup, setSyrup] = useState(SYRUPS[0]);
  const [toppings, setToppings] = useState([]);
  const [size, setSize] = useState(SIZES[1]);
  const [cupName, setCupName] = useState("");
  const [justLocked, setJustLocked] = useState(false);

  const toggleTopping = (t) => {
    setToppings((prev) =>
      prev.includes(t.id) ? prev.filter((id) => id !== t.id) : [...prev, t.id]
    );
  };

  const price = useMemo(() => {
    const toppingTotal = toppings.reduce(
      (sum, id) => sum + (TOPPINGS.find((t) => t.id === id)?.price || 0),
      0
    );
    return (
      (base.price + milk.price + syrup.price + toppingTotal) * size.mult
    ).toFixed(2);
  }, [base, milk, syrup, toppings, size]);

  const handleLockIn = () => {
    lockIn({
      base: base.label,
      milk: milk.label,
      syrup: syrup.label,
      toppings: toppings.map((id) => TOPPINGS.find((t) => t.id === id)?.label),
      size: size.label,
      name: cupName || "Untitled cup",
      price,
    });
    setJustLocked(true);
    setTimeout(() => setJustLocked(false), 1800);
  };

  const fillTop = 100 - size.fill; // % from top of cup interior where liquid starts

  return (
    <section id="builder" className="mx-auto max-w-6xl px-5 sm:px-8 py-16 sm:py-24">
      <div className="mb-12 max-w-xl">
        <p className="font-hand text-2xl text-ink-soft -mb-1">the mixologist —</p>
        <h2 className="font-display font-semibold text-3xl sm:text-4xl tracking-tightest2">
          Build your own cup
        </h2>
        <p className="text-ink-faint mt-3 text-sm sm:text-base leading-relaxed">
          Every choice redraws the cup on the right. Lock it in when it looks
          right, then pick a pickup time.
        </p>
      </div>

      <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 items-start">
        <div>
          <OptionGroup title="Base">
            {BASES.map((b) => (
              <Chip key={b.id} active={base.id === b.id} onClick={() => setBase(b)}>
                {b.label}
              </Chip>
            ))}
          </OptionGroup>

          <OptionGroup title="Milk">
            {MILKS.map((m) => (
              <Chip key={m.id} active={milk.id === m.id} onClick={() => setMilk(m)}>
                {m.label}
              </Chip>
            ))}
          </OptionGroup>

          <OptionGroup title="Syrup">
            {SYRUPS.map((s) => (
              <Chip key={s.id} active={syrup.id === s.id} onClick={() => setSyrup(s)}>
                {s.label}
              </Chip>
            ))}
          </OptionGroup>

          <OptionGroup title="Toppings">
            {TOPPINGS.map((t) => (
              <Chip
                key={t.id}
                active={toppings.includes(t.id)}
                onClick={() => toggleTopping(t)}
              >
                {t.label}
              </Chip>
            ))}
          </OptionGroup>

          <OptionGroup title="Size">
            {SIZES.map((s) => (
              <Chip key={s.id} active={size.id === s.id} onClick={() => setSize(s)}>
                {s.label}
              </Chip>
            ))}
          </OptionGroup>

          <div className="mb-7">
            <h3 className="text-xs font-semibold tracking-widest uppercase text-ink-faint mb-3">
              Name this cup <span className="normal-case text-ink-faint/70">(optional)</span>
            </h3>
            <input
              value={cupName}
              onChange={(e) => setCupName(e.target.value)}
              placeholder="e.g. Tuesday Rescue"
              maxLength={30}
              className="w-full sm:w-72 border border-line rounded-xl px-4 py-2.5 text-sm bg-paper focus:border-ink outline-none transition-colors"
            />
          </div>
        </div>

        {/* live preview */}
        <div className="lg:sticky lg:top-24">
          <div className="border border-line rounded-3xl bg-paper-dim p-8 flex flex-col items-center">
            <div className="relative w-48 h-56">
              <svg viewBox="0 0 220 260" className="w-full h-full overflow-visible">
                <defs>
                  <pattern id="pat-dots" width="10" height="10" patternUnits="userSpaceOnUse">
                    <circle cx="2" cy="2" r="1.3" fill="#121212" />
                  </pattern>
                  <pattern id="pat-waves" width="18" height="10" patternUnits="userSpaceOnUse">
                    <path d="M0 5 Q4.5 0 9 5 T18 5" stroke="#121212" strokeWidth="1.1" fill="none" />
                  </pattern>
                  <pattern
                    id="pat-hatch"
                    width="8"
                    height="8"
                    patternUnits="userSpaceOnUse"
                    patternTransform="rotate(45)"
                  >
                    <line x1="0" y1="0" x2="0" y2="8" stroke="#121212" strokeWidth="1.2" />
                  </pattern>
                  <clipPath id="cup-clip">
                    <path d="M50 82 C48 128 54 162 68 174 C86 190 134 191 152 174 C166 162 172 128 170 82 Z" />
                  </clipPath>
                </defs>

                {/* liquid, clipped to the cup body, animates height on every change */}
                <g clipPath="url(#cup-clip)">
                  <rect
                    x="40"
                    y={82 + (108 * fillTop) / 100}
                    width="140"
                    height="130"
                    fill={`url(#${PATTERN_ID[base.pattern]})`}
                    opacity={milk.opacity}
                    style={{ transition: "y 0.6s cubic-bezier(.3,1,.4,1), opacity 0.4s ease" }}
                  />
                  {syrup.id !== "none" && (
                    <path
                      d={`M55 ${86 + (108 * fillTop) / 100} Q90 ${96 + (108 * fillTop) / 100} 110 ${86 + (108 * fillTop) / 100} T165 ${86 + (108 * fillTop) / 100}`}
                      stroke="#121212"
                      strokeWidth="1.5"
                      fill="none"
                      opacity="0.55"
                      style={{ transition: "d 0.6s ease" }}
                    />
                  )}
                </g>

                {/* cup outline, always on top */}
                <path
                  className="ink-stroke"
                  strokeWidth="2"
                  d="M50 82 C48 128 54 162 68 174 C86 190 134 191 152 174 C166 162 172 128 170 82"
                />
                <path
                  className="ink-stroke"
                  strokeWidth="2"
                  d="M46 80 C46 74 90 70 110 70 C130 70 174 74 174 80 C174 86 130 90 110 90 C90 90 46 86 46 80 Z"
                />
                <path
                  className="ink-stroke"
                  strokeWidth="2"
                  d="M170 92 C194 88 202 102 198 114 C194 127 176 133 162 128"
                />

                {/* toppings, stacked above the rim */}
                {toppings.includes("cream") && (
                  <path
                    className="ink-stroke"
                    strokeWidth="1.8"
                    d="M62 68 C60 56 74 50 82 56 C86 46 104 46 108 56 C116 48 132 52 130 64 C138 62 142 70 136 74 C114 80 78 80 62 74 C58 72 58 70 62 68 Z"
                  />
                )}
                {toppings.includes("cinnamon") &&
                  [0, 1, 2, 3, 4].map((i) => (
                    <circle
                      key={i}
                      cx={65 + i * 22}
                      cy={75 + (i % 2) * 4}
                      r="1.6"
                      fill="#121212"
                      opacity="0.75"
                    />
                  ))}
                {toppings.includes("cocoa") &&
                  [0, 1, 2, 3, 4, 5].map((i) => (
                    <rect
                      key={i}
                      x={60 + i * 19}
                      y={72 + ((i * 7) % 6)}
                      width="2"
                      height="2"
                      fill="#121212"
                      opacity="0.6"
                    />
                  ))}
                {toppings.includes("shot") && (
                  <g transform="translate(178,150)">
                    <circle r="16" className="ink-stroke" strokeWidth="1.6" fill="#faf9f5" />
                    <text x="0" y="5" textAnchor="middle" fontSize="14" fontWeight="700" fill="#121212">
                      +1
                    </text>
                  </g>
                )}
              </svg>
            </div>

            <p className="font-hand text-2xl mt-2 text-center">
              {cupName || "Untitled cup"}
            </p>
            <p className="text-ink-faint text-sm text-center mt-1">
              {size.label} · {base.label} · {milk.label} milk
              {syrup.id !== "none" ? ` · ${syrup.label}` : ""}
            </p>

            <div className="w-full flex items-center justify-between mt-6 pt-6 border-t border-line">
              <span className="font-display text-2xl font-semibold">R{price}</span>
              <button
                onClick={handleLockIn}
                className="inline-flex items-center gap-2 bg-ink text-paper text-sm font-medium rounded-full px-5 py-2.5 hover:-translate-y-0.5 transition-transform duration-150"
              >
                {justLocked ? (
                  <>
                    <Check size={16} /> Locked in
                  </>
                ) : (
                  <>
                    <Sparkles size={16} /> Lock it in
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

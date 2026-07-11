import { useRef, useState } from "react";
import { ArrowDown } from "lucide-react";
import { CupMark, ScribbleUnderline } from "./LineArt.jsx";

export default function Hero() {
  const wrapRef = useRef(null);
  const [pos, setPos] = useState({ x: 50, y: 50 });
  const [hovering, setHovering] = useState(false);

  const onMove = (e) => {
    const rect = wrapRef.current.getBoundingClientRect();
    setPos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  return (
    <section id="top" className="relative overflow-hidden">
      <div className="paper-grain absolute inset-0 pointer-events-none opacity-70" />

      <div className="mx-auto max-w-6xl px-5 sm:px-8 pt-16 pb-20 sm:pt-24 sm:pb-28 grid md:grid-cols-2 gap-12 items-center relative">
        <div>
          <p className="font-hand text-2xl text-ink-soft -mb-1">est. this morning, in ink —</p>
          <h1 className="font-display font-semibold text-[2.6rem] leading-[1.05] sm:text-[3.6rem] sm:leading-[1.02] tracking-tightest2 text-ink">
            Coffee,
            <br />
            drawn by hand.
          </h1>
          <div className="mt-3 w-40">
            <ScribbleUnderline />
          </div>
          <p className="mt-6 text-base sm:text-lg text-ink-soft max-w-md leading-relaxed">
            No syrups pretending to be flavors, no menus you need a translator
            for. Build your own cup, reserve a table, or pin a wild idea to
            the wall — everything here is sketched, not stocked.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#builder"
              className="inline-flex items-center gap-2 bg-ink text-paper text-sm font-medium rounded-full px-6 py-3 hover:-translate-y-0.5 hover:shadow-[0_10px_24px_-8px_rgba(18,18,18,0.5)] transition-all duration-200"
            >
              Build your drink
            </a>
            <a
              href="#book"
              className="inline-flex items-center gap-2 border border-ink text-ink text-sm font-medium rounded-full px-6 py-3 hover:bg-ink hover:text-paper transition-colors duration-200"
            >
              Book a table
            </a>
          </div>

          <div className="mt-10 flex items-center gap-2 text-ink-faint text-sm">
            <ArrowDown size={14} className="animate-bounce" />
            <span>hover the cup — go on</span>
          </div>
        </div>

        <div
          ref={wrapRef}
          onMouseMove={onMove}
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
          className="relative aspect-square max-w-sm mx-auto w-full cursor-none select-none"
        >
          {/* filled silhouette, revealed only near the cursor via a radial mask */}
          <div
            className="absolute inset-0 transition-opacity duration-200"
            style={{
              opacity: hovering ? 1 : 0,
              WebkitMaskImage: `radial-gradient(circle 90px at ${pos.x}% ${pos.y}%, black 0%, black 55%, transparent 100%)`,
              maskImage: `radial-gradient(circle 90px at ${pos.x}% ${pos.y}%, black 0%, black 55%, transparent 100%)`,
            }}
          >
            <svg viewBox="0 0 220 220" className="w-full h-full">
              <path
                d="M46 78 C44 130 50 168 66 182 C86 200 138 201 158 182 C173 168 178 130 176 78 C176 78 180 90 111 90 C42 90 46 78 46 78 Z"
                fill="#121212"
              />
              <path
                d="M176 88 C202 84 210 100 206 114 C202 129 182 136 166 130 C166 130 178 118 178 100 C178 92 176 88 176 88 Z"
                fill="#121212"
              />
            </svg>
          </div>

          <CupMark className="absolute inset-0 w-full h-full animate-wobble" />
        </div>
      </div>
    </section>
  );
}

import { useEffect, useState } from "react";
import { Menu, X, ShoppingBag } from "lucide-react";
import { useOrder } from "../context/OrderContext.jsx";

const LINKS = [
  { href: "#builder", label: "Build a Drink" },
  { href: "#menu", label: "Menu" },
  { href: "#book", label: "Book a Table" },
  { href: "#board", label: "Community Board" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { order, setCartOpen } = useOrder();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled ? "bg-paper/90 backdrop-blur border-b border-line" : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8 h-16 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2 group">
          <svg width="26" height="26" viewBox="0 0 26 26" className="shrink-0">
            <circle cx="13" cy="13" r="10.5" className="ink-stroke" strokeWidth="1.8" />
            <path d="M13 6 L13 13 L18 16" className="ink-stroke" strokeWidth="1.8" />
          </svg>
          <span className="font-display font-semibold text-lg tracking-tight text-ink">
            Inkwell
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-ink-soft hover:text-ink transition-colors relative group"
            >
              {l.label}
              <span className="absolute left-0 -bottom-1 h-px w-0 bg-ink transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setCartOpen(true)}
            className="relative inline-flex items-center gap-2 border border-ink rounded-full pl-3 pr-4 py-1.5 text-sm font-medium hover:bg-ink hover:text-paper transition-colors duration-200"
            aria-label="Open your order"
          >
            <ShoppingBag size={15} />
            <span className="hidden sm:inline">Your cup{order.length !== 1 ? "s" : ""}</span>
            {order.length > 0 && (
              <span className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-ink text-paper text-[11px] flex items-center justify-center font-semibold">
                {order.length}
              </span>
            )}
          </button>

          <button
            className="md:hidden p-2 -mr-2"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-line bg-paper px-5 py-4 flex flex-col gap-4">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-base font-medium text-ink-soft"
            >
              {l.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}

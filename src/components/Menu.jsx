import { BeanIcon, LeafIcon, DropletIcon } from "./LineArt.jsx";

const ITEMS = [
  {
    icon: BeanIcon,
    name: "Standing Order",
    note: "double espresso, no water, no apologies",
    price: "R68",
  },
  {
    icon: LeafIcon,
    name: "Field Notes",
    note: "ceremonial matcha, oat milk, thin ice",
    price: "R93.50",
  },
  {
    icon: DropletIcon,
    name: "Slow Drip",
    note: "18-hour cold brew, cracked pepper edge",
    price: "R85",
  },
  {
    icon: BeanIcon,
    name: "Margin Notes",
    note: "cortado, two sugars, short glass",
    price: "R76.50",
  },
];

export default function Menu() {
  return (
    <section id="menu" className="border-y border-line bg-paper-dim">
      <div className="mx-auto max-w-6xl px-5 sm:px-8 py-16 sm:py-20">
        <div className="flex items-end justify-between flex-wrap gap-3 mb-10">
          <h2 className="font-display font-semibold text-3xl sm:text-4xl tracking-tightest2">
            The house sketches
          </h2>
          <p className="text-ink-faint text-sm max-w-xs">
            A few standing favorites — or skip straight to the builder and
            draw your own.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {ITEMS.map((item) => (
            <div
              key={item.name}
              className="group border border-line rounded-2xl bg-paper p-6 hover:border-ink transition-colors duration-200 hover:-translate-y-1 transform-gpu"
              style={{ transitionProperty: "border-color, transform" }}
            >
              <item.icon className="w-10 h-10 mb-5 group-hover:scale-110 transition-transform duration-200" />
              <h3 className="font-display font-semibold text-lg">{item.name}</h3>
              <p className="text-ink-faint text-sm mt-1.5 leading-relaxed">{item.note}</p>
              <p className="font-hand text-2xl mt-3">{item.price}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

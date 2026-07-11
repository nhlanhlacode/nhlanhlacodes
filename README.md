# Inkwell — Coffee, Drawn by Hand

A single-page coffee shop site: hand-drawn, black-and-white, and interactive.
Built with React + Vite + Tailwind CSS + Framer-Motion-style micro-interactions
(pure CSS/Tailwind transitions, no runtime animation library required) and
Lucide icons.

## Run it locally (VS Code / terminal)

```bash
npm install
npm run dev
```

Then open the printed local URL (usually `http://localhost:5173`).

To build a production bundle:

```bash
npm run build
npm run preview
```

## What's inside

```
src/
  App.jsx                    → composes the page, wraps everything in OrderProvider
  index.css                  → tailwind directives + paper grain, ink-stroke, torn-edge helpers
  context/
    OrderContext.jsx         → shared cart/order state (locked-in drinks, pickup time)
  components/
    LineArt.jsx               → reusable hand-drawn SVG icons (cup, bean, leaf, pin, scribbles)
    Nav.jsx                    → sticky nav bar + cart indicator
    Hero.jsx                   → headline + cursor-reveal ink effect on the cup mark
    Menu.jsx                   → static "house sketches" menu grid
    DrinkBuilder.jsx           → the Mixologist: live SVG drink preview that updates as you pick
                                  base / milk / syrup / toppings / size, then "locks in" to the cart
    PickupCart.jsx              → slide-over drawer: review locked-in cups, pick a pickup time, confirm
    Booking.jsx                 → table / tasting-event reservation form
    ThoughtBoard.jsx            → community sticky-note wall with add + upvote
    Footer.jsx
tailwind.config.js            → the monochrome ink/paper token system (colors, type, custom keyframes)
```

## Design notes

- **Strictly black-and-white.** No accent color anywhere — every "color" decision
  is expressed through ink opacity, pattern density, or paper tone instead.
- **Fonts:** Fraunces (display), Inter (body/UI), Caveat (hand marks — prices,
  section eyebrows, sticky-note signatures).
- **Signature interaction:** the hero cup reveals a solid-ink fill under your
  cursor via a radial CSS mask — a nod to shader-style cursor reveals, done
  without a WebGL dependency so it stays light.
- All interactive state (drink builder, cart, booking, board) is local React
  state — no backend. Swap in real endpoints in `OrderContext.jsx` and the
  `submit`/`addNote` handlers when you're ready to wire it up.
# nhlanhla-s-coffe-shop

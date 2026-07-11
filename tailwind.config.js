/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#121212",
        "ink-soft": "#3a3a38",
        "ink-faint": "#6b6a64",
        paper: "#faf9f5",
        "paper-dim": "#f0efe8",
        "paper-deep": "#e7e4d9",
        line: "#d9d5c8",
        "line-strong": "#121212",
      },
      fontFamily: {
        display: ["'Fraunces'", "serif"],
        body: ["'Inter'", "sans-serif"],
        hand: ["'Caveat'", "cursive"],
      },
      letterSpacing: {
        tightest2: "-0.04em",
      },
      keyframes: {
        draw: {
          to: { strokeDashoffset: "0" },
        },
        wobble: {
          "0%, 100%": { transform: "translateY(0) rotate(0deg)" },
          "50%": { transform: "translateY(-4px) rotate(-1deg)" },
        },
        rise: {
          "0%": { transform: "translateY(0) scaleY(1)", opacity: "0.5" },
          "100%": { transform: "translateY(-14px) scaleY(1.4)", opacity: "0" },
        },
        pinDrop: {
          "0%": { transform: "translateY(-12px) rotate(-6deg)", opacity: "0" },
          "100%": { transform: "translateY(0) rotate(var(--rot, -2deg))", opacity: "1" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        draw: "draw 1.8s ease forwards",
        wobble: "wobble 4s ease-in-out infinite",
        rise: "rise 2.4s ease-in-out infinite",
        pinDrop: "pinDrop 0.4s cubic-bezier(.2,1.4,.4,1) forwards",
        marquee: "marquee 24s linear infinite",
      },
    },
  },
  plugins: [],
};

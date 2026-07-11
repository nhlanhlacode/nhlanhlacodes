import { useState } from "react";
import { CalendarDays, Users } from "lucide-react";
import { CheckScribble } from "./LineArt.jsx";

const TYPES = [
  { id: "table", label: "Table for later" },
  { id: "tasting", label: "Coffee tasting event" },
];

const TIMES = ["9:00 AM", "10:30 AM", "12:00 PM", "2:00 PM", "4:30 PM", "6:00 PM"];

export default function Booking() {
  const [type, setType] = useState(TYPES[0]);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [party, setParty] = useState(2);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  const valid = date && time && name && email;

  const submit = (e) => {
    e.preventDefault();
    if (!valid) return;
    setDone(true);
  };

  if (done) {
    return (
      <section id="book" className="border-y border-line">
        <div className="mx-auto max-w-2xl px-5 sm:px-8 py-20 text-center">
          <CheckScribble className="w-16 h-14 mx-auto mb-4" />
          <h2 className="font-display font-semibold text-3xl">You're booked</h2>
          <p className="text-ink-faint mt-3">
            {type.label} for {party} on {date} at {time}. A confirmation note is on its way to{" "}
            {email}.
          </p>
          <button
            onClick={() => setDone(false)}
            className="mt-8 border border-ink rounded-full px-5 py-2.5 text-sm font-medium hover:bg-ink hover:text-paper transition-colors"
          >
            Book another
          </button>
        </div>
      </section>
    );
  }

  return (
    <section id="book" className="border-y border-line">
      <div className="mx-auto max-w-6xl px-5 sm:px-8 py-16 sm:py-24 grid lg:grid-cols-2 gap-12">
        <div>
          <p className="font-hand text-2xl text-ink-soft -mb-1">pull up a chair —</p>
          <h2 className="font-display font-semibold text-3xl sm:text-4xl tracking-tightest2">
            Book a table or a tasting
          </h2>
          <p className="text-ink-faint mt-4 text-sm sm:text-base leading-relaxed max-w-md">
            Reserve a table for an afternoon, or grab a seat at our monthly
            in-house tasting — six cups, one notebook, no two flights alike.
          </p>

          <div className="mt-8 flex flex-col gap-3 max-w-xs">
            {TYPES.map((t) => (
              <button
                key={t.id}
                onClick={() => setType(t)}
                className={`text-left rounded-2xl border px-5 py-4 transition-colors ${
                  type.id === t.id
                    ? "border-ink bg-paper-dim"
                    : "border-line hover:border-ink"
                }`}
              >
                <span className="font-medium text-sm">{t.label}</span>
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={submit} className="border border-line rounded-3xl bg-paper-dim p-6 sm:p-8">
          <div className="grid sm:grid-cols-2 gap-4">
            <label className="text-sm">
              <span className="text-xs font-semibold tracking-widest uppercase text-ink-faint">
                Date
              </span>
              <div className="mt-2 relative">
                <CalendarDays
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-faint pointer-events-none"
                />
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                  className="w-full border border-line rounded-xl pl-9 pr-3 py-2.5 text-sm bg-paper focus:border-ink outline-none"
                />
              </div>
            </label>

            <label className="text-sm">
              <span className="text-xs font-semibold tracking-widest uppercase text-ink-faint">
                Party size
              </span>
              <div className="mt-2 relative">
                <Users
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-faint pointer-events-none"
                />
                <input
                  type="number"
                  min="1"
                  max="12"
                  value={party}
                  onChange={(e) => setParty(e.target.value)}
                  className="w-full border border-line rounded-xl pl-9 pr-3 py-2.5 text-sm bg-paper focus:border-ink outline-none"
                />
              </div>
            </label>
          </div>

          <div className="mt-4">
            <span className="text-xs font-semibold tracking-widest uppercase text-ink-faint">
              Time
            </span>
            <div className="mt-2 grid grid-cols-3 gap-2">
              {TIMES.map((t) => (
                <button
                  type="button"
                  key={t}
                  onClick={() => setTime(t)}
                  className={`text-sm rounded-xl border px-3 py-2.5 font-medium transition-colors ${
                    time === t
                      ? "bg-ink text-paper border-ink"
                      : "border-line text-ink-soft hover:border-ink"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 mt-4">
            <label className="text-sm">
              <span className="text-xs font-semibold tracking-widest uppercase text-ink-faint">
                Name
              </span>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="mt-2 w-full border border-line rounded-xl px-3 py-2.5 text-sm bg-paper focus:border-ink outline-none"
              />
            </label>
            <label className="text-sm">
              <span className="text-xs font-semibold tracking-widest uppercase text-ink-faint">
                Email
              </span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-2 w-full border border-line rounded-xl px-3 py-2.5 text-sm bg-paper focus:border-ink outline-none"
              />
            </label>
          </div>

          <button
            type="submit"
            disabled={!valid}
            className="mt-6 w-full bg-ink text-paper rounded-full py-3 text-sm font-medium disabled:opacity-35 disabled:cursor-not-allowed hover:-translate-y-0.5 transition-transform"
          >
            Confirm reservation
          </button>
        </form>
      </div>
    </section>
  );
}

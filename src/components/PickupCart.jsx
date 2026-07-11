import { useState } from "react";
import { X, Trash2 } from "lucide-react";
import { useOrder } from "../context/OrderContext.jsx";
import { CheckScribble } from "./LineArt.jsx";

const SLOTS = ["ASAP (12 min)", "1:00 PM", "1:15 PM", "1:30 PM", "1:45 PM", "2:00 PM", "2:30 PM"];

export default function PickupCart() {
  const { order, removeDrink, cartOpen, setCartOpen, pickupTime, setPickupTime, clearOrder } =
    useOrder();
  const [confirmed, setConfirmed] = useState(false);

  const total = order.reduce((sum, d) => sum + parseFloat(d.price), 0).toFixed(2);

  const close = () => setCartOpen(false);

  const confirm = () => {
    if (!pickupTime) return;
    setConfirmed(true);
  };

  const startOver = () => {
    setConfirmed(false);
    clearOrder();
    close();
  };

  if (!cartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div
        className="absolute inset-0 bg-ink/40 backdrop-blur-[2px]"
        onClick={close}
        aria-hidden="true"
      />
      <div className="relative w-full max-w-md h-full bg-paper border-l border-line flex flex-col animate-[slideIn_0.3s_ease]">
        <style>{`@keyframes slideIn { from { transform: translateX(100%);} to { transform: translateX(0);} }`}</style>

        <div className="flex items-center justify-between px-6 h-16 border-b border-line shrink-0">
          <h3 className="font-display font-semibold text-lg">
            {confirmed ? "Pickup confirmed" : "Your cups"}
          </h3>
          <button onClick={close} aria-label="Close cart" className="p-1.5 hover:opacity-60">
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-6">
          {confirmed ? (
            <div className="flex flex-col items-center text-center pt-8">
              <CheckScribble className="w-16 h-14 mb-4" />
              <p className="font-hand text-3xl">See you at {pickupTime}</p>
              <p className="text-ink-faint text-sm mt-2 max-w-xs">
                {order.length} cup{order.length !== 1 ? "s" : ""}, R{total} total. We'll have it
                sketched out and ready at the counter.
              </p>
              <button
                onClick={startOver}
                className="mt-8 border border-ink rounded-full px-5 py-2.5 text-sm font-medium hover:bg-ink hover:text-paper transition-colors"
              >
                Start a new order
              </button>
            </div>
          ) : order.length === 0 ? (
            <div className="text-center pt-16 text-ink-faint">
              <p className="text-sm">No cups yet.</p>
              <p className="text-sm mt-1">Head to the builder and draw one up.</p>
            </div>
          ) : (
            <>
              <ul className="space-y-3">
                {order.map((d) => (
                  <li
                    key={d.id}
                    className="border border-line rounded-2xl p-4 flex items-start justify-between gap-3"
                  >
                    <div>
                      <p className="font-medium text-sm">{d.name}</p>
                      <p className="text-ink-faint text-xs mt-1 leading-relaxed">
                        {d.size} · {d.base} · {d.milk} milk
                        {d.syrup !== "None" ? ` · ${d.syrup}` : ""}
                        {d.toppings?.length ? ` · ${d.toppings.join(", ")}` : ""}
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-2 shrink-0">
                      <span className="text-sm font-semibold">R{d.price}</span>
                      <button
                        onClick={() => removeDrink(d.id)}
                        aria-label={`Remove ${d.name}`}
                        className="text-ink-faint hover:text-ink"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                <h4 className="text-xs font-semibold tracking-widest uppercase text-ink-faint mb-3">
                  Pickup time
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  {SLOTS.map((slot) => (
                    <button
                      key={slot}
                      onClick={() => setPickupTime(slot)}
                      className={`text-sm rounded-xl border px-3 py-2.5 font-medium transition-colors ${
                        pickupTime === slot
                          ? "bg-ink text-paper border-ink"
                          : "border-line text-ink-soft hover:border-ink"
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        {!confirmed && order.length > 0 && (
          <div className="px-6 py-5 border-t border-line shrink-0">
            <div className="flex items-center justify-between mb-4">
              <span className="text-ink-faint text-sm">Total</span>
              <span className="font-display text-xl font-semibold">R{total}</span>
            </div>
            <button
              onClick={confirm}
              disabled={!pickupTime}
              className="w-full bg-ink text-paper rounded-full py-3 text-sm font-medium disabled:opacity-35 disabled:cursor-not-allowed hover:-translate-y-0.5 transition-transform"
            >
              {pickupTime ? `Confirm pickup at ${pickupTime}` : "Pick a time to confirm"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

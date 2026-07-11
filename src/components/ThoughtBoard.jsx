import { useState, useEffect } from "react";
import { ArrowUp, Plus, Loader } from "lucide-react";
import { PushpinIcon } from "./LineArt.jsx";
import { addSuggestion, getSuggestions, updateVotes } from "../config/firebase.js";

const SEED = [
  { id: "seed-1", text: "Espresso with a single drop of olive oil. Trust me.", author: "R.", votes: 14, rot: -3 },
  { id: "seed-2", text: "A 'decaf hour' after 6pm so I stop lying to the barista.", author: "M.", votes: 9, rot: 2 },
  { id: "seed-3", text: "Cold brew + black pepper + orange peel. Do it once.", author: "J.", votes: 21, rot: -1 },
  { id: "seed-4", text: "Bring back the mismatched mugs. The white ones feel like a hotel.", author: "A.", votes: 6, rot: 4 },
  { id: "seed-5", text: "Matcha with brown butter. I dreamed this. Someone make it real.", author: "T.", votes: 17, rot: -2 },
  { id: "seed-6", text: "A 'quiet corner' with no music, just the grinder. Ambient chaos.", author: "S.", votes: 11, rot: 3 },
];

export default function ThoughtBoard() {
  const [notes, setNotes] = useState(SEED);
  const [voted, setVoted] = useState(new Set());
  const [text, setText] = useState("");
  const [author, setAuthor] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Load suggestions from Firebase on mount
  useEffect(() => {
    const loadSuggestions = async () => {
      try {
        setLoading(true);
        const suggestions = await getSuggestions();
        // Merge seed data with fetched suggestions
        const merged = [...SEED, ...suggestions];
        setNotes(merged);
      } catch (error) {
        console.error("Failed to load suggestions:", error);
        // Fallback to seed data if Firebase fails
        setNotes(SEED);
      } finally {
        setLoading(false);
      }
    };
    loadSuggestions();
  }, []);

  const addNote = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    setSubmitting(true);
    try {
      const newNote = await addSuggestion(text, author);
      setNotes((prev) => [newNote, ...prev]);
      setText("");
      setAuthor("");
    } catch (error) {
      console.error("Failed to add suggestion:", error);
      alert("Failed to save suggestion. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const upvote = async (id) => {
    if (voted.has(id)) return;

    try {
      const note = notes.find((n) => n.id === id);
      const newVoteCount = note.votes + 1;

      await updateVotes(id, newVoteCount);
      setNotes((prev) => prev.map((n) => (n.id === id ? { ...n, votes: newVoteCount } : n)));
      setVoted((prev) => new Set(prev).add(id));
    } catch (error) {
      console.error("Failed to update vote:", error);
      alert("Failed to vote. Please try again.");
    }
  };

  return (
    <section id="board" className="bg-paper-dim border-t border-line">
      <div className="mx-auto max-w-6xl px-5 sm:px-8 py-16 sm:py-24">
        <div className="mb-10 max-w-xl">
          <p className="font-hand text-2xl text-ink-soft -mb-1">the corkboard —</p>
          <h2 className="font-display font-semibold text-3xl sm:text-4xl tracking-tightest2">
            Pin your wildest idea
          </h2>
          <p className="text-ink-faint mt-3 text-sm sm:text-base leading-relaxed">
            Flavor pitches, complaints, love notes to the espresso machine —
            it all goes up. Upvote the ones you'd actually order.
          </p>
        </div>

        <form
          onSubmit={addNote}
          className="border border-line rounded-2xl bg-paper p-5 mb-10 flex flex-col sm:flex-row gap-3 items-stretch"
        >
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="A drink idea, a thought, a rant..."
            maxLength={140}
            disabled={submitting}
            className="flex-1 border border-line rounded-xl px-4 py-2.5 text-sm bg-paper focus:border-ink outline-none disabled:opacity-50"
          />
          <input
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Initials"
            maxLength={16}
            disabled={submitting}
            className="sm:w-32 border border-line rounded-xl px-4 py-2.5 text-sm bg-paper focus:border-ink outline-none disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={submitting}
            className="inline-flex items-center justify-center gap-2 bg-ink text-paper rounded-xl px-5 py-2.5 text-sm font-medium hover:-translate-y-0.5 transition-transform shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? <Loader size={16} className="animate-spin" /> : <Plus size={16} />}
            {submitting ? "Saving..." : "Pin it"}
          </button>
        </form>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            <div className="col-span-full text-center py-12">
              <Loader size={24} className="animate-spin mx-auto text-ink-faint" />
              <p className="text-ink-faint mt-2">Loading community ideas...</p>
            </div>
          ) : (
            notes.map((n) => (
              <div
                key={n.id}
                className={`relative torn-edge bg-paper border border-line px-5 pt-7 pb-5 ${
                  n.fresh ? "animate-pinDrop" : ""
                }`}
                style={{ "--rot": `${n.rot}deg`, transform: `rotate(${n.rot}deg)` }}
              >
                <PushpinIcon className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-5 h-5" />
                <p className="text-sm leading-relaxed text-ink">{n.text}</p>
                <div className="flex items-center justify-between mt-4 pt-3 border-t border-line">
                  <span className="font-hand text-lg text-ink-soft">— {n.author}</span>
                  <button
                    onClick={() => upvote(n.id)}
                    disabled={voted.has(n.id)}
                    className={`inline-flex items-center gap-1 text-xs font-semibold rounded-full px-2.5 py-1 border transition-colors ${
                      voted.has(n.id)
                        ? "border-ink bg-ink text-paper"
                        : "border-line text-ink-soft hover:border-ink"
                    }`}
                  >
                    <ArrowUp size={12} /> {n.votes}
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}

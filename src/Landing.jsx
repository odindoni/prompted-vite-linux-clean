import { useState } from "react";
import { useNavigate } from "react-router-dom";

const decks = {
  "C1 Mixed Conditionals": ["If you had studied more, would your grades be better?"],
  "B2 Passive Voice": ["Is English used in your workplace?"],
};

export default function Landing() {
  const [selectedDeck, setSelectedDeck] = useState("C1 Mixed Conditionals");
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-slate-50 text-slate-800">
      <section className="w-full px-6 py-20 bg-blue-800 text-white text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-5xl font-extrabold tracking-tight mb-4">Prompted</h1>
          <p className="text-xl text-slate-200">Engaging ESL Conversation Cards</p>
          <button
            onClick={() => document.getElementById("deck-section").scrollIntoView({ behavior: "smooth" })}
            className="mt-8 bg-white text-blue-800 font-semibold px-6 py-3 rounded-xl shadow-md hover:bg-slate-100 transition"
          >
            🎯 Explore Decks
          </button>
        </div>
      </section>

      <section id="deck-section" className="w-full px-6 py-16 bg-white text-center">
        <h2 className="text-3xl font-bold mb-8">Start Your Session</h2>
        <div className="max-w-xl mx-auto space-y-4">
          <select
            value={selectedDeck}
            onChange={(e) => setSelectedDeck(e.target.value)}
            className="w-full border border-slate-300 rounded-lg p-3 shadow-sm"
          >
            {Object.keys(decks).map((deck) => (
              <option key={deck} value={deck}>{deck}</option>
            ))}
          </select>

          <button
            onClick={() => navigate(`/session?deck=${encodeURIComponent(selectedDeck)}`)}
            className="w-full mt-4 inline-block bg-blue-600 text-white font-semibold px-6 py-3 rounded-xl shadow-md hover:bg-blue-700 transition"
          >
            🚀 Start Session
          </button>
        </div>
      </section>

      <footer className="text-center py-6 text-slate-400 text-sm">
        Prompted © {new Date().getFullYear()} | Built for ESL Educators
      </footer>
    </div>
  );
}

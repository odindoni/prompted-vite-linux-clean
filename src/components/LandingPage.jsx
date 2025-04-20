import { useState } from "react";
import { useNavigate } from "react-router-dom";
import a1ConversationData from "../data/a1_conversation_deck.json";
import a2ConversationData from "../data/a2_conversation_deck.json";

const getAllDecks = () => {
  const decks = [];

  const allData = {
    ...a1ConversationData,
    ...a2ConversationData,
  };

  Object.entries(allData).forEach(([level, grammarObject]) => {
    Object.entries(grammarObject).forEach(([grammar, topics]) => {
      Object.entries(topics).forEach(([topic, questions]) => {
        decks.push({ level, grammar, topic, questions });
      });
    });
  });

  return decks;
};
const allDecks = getAllDecks();

const normalize = (str) =>
  str
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9\s]/g, "")
    .replace(/\s+/g, " ")
    .trim();

export default function Landing() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const filteredDecks = allDecks.filter((deck) => {
    const searchTerms = normalize(search).split(" ").filter(Boolean);
    const deckString = normalize(`${deck.level} ${deck.grammar} ${deck.topic}`);
    return searchTerms.every((term) => deckString.includes(term));
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-slate-50 text-slate-800">
      {/* Hero Section */}
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

      {/* Deck Display Section */}
      <section id="deck-section" className="w-full px-6 py-16 bg-white text-center">
        <h2 className="text-3xl font-bold mb-8">Search Conversation Decks</h2>

        <div className="max-w-xl mx-auto mb-10">
          <input
            type="text"
            placeholder="Search topic, grammar, or level..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border border-slate-300 rounded-lg p-3 shadow-sm"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDecks.map((deck, index) => (
            <div
              key={index}
              className="bg-blue-100 p-4 rounded shadow hover:shadow-lg cursor-pointer"
              onClick={() =>
                navigate(`/session?deck=${encodeURIComponent(`${deck.level} - ${deck.grammar} - ${deck.topic}`)}`)
              }
            >
              <h3 className="text-lg font-bold mb-1">{deck.topic}</h3>
              <p className="text-sm text-gray-700">Level: {deck.level}</p>
              <p className="text-sm text-gray-700">Grammar: {deck.grammar}</p>
              <p className="text-sm text-gray-600 mt-2">{deck.questions.length} Questions</p>
            </div>
          ))}
        </div>

        {filteredDecks.length === 0 && (
          <p className="text-center text-gray-500 mt-6">No decks found. Try a different keyword.</p>
        )}
      </section>

      <footer className="text-center py-6 text-slate-400 text-sm">
        Prompted © {new Date().getFullYear()} | Built for ESL Educators
      </footer>
    </div>
  );
}

import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import conversationData from "../data/a1_conversation_deck.json";

const DeckViewer = () => {
  const [searchParams] = useSearchParams();
  const deckParam = searchParams.get("deck"); // format: "Topic - Grammar"

  const [selectedLevel, setSelectedLevel] = useState("");
  const [selectedGrammar, setSelectedGrammar] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("");

  useEffect(() => {
    if (!deckParam) return;

    const [topicFromURL, grammarFromURL] = deckParam.split(" - ");

    // Try to auto-detect the level
    let found = false;
    for (const level of Object.keys(conversationData)) {
      for (const grammar of Object.keys(conversationData[level])) {
        if (grammar === grammarFromURL) {
          for (const topic of Object.keys(conversationData[level][grammar])) {
            if (topic === topicFromURL) {
              setSelectedLevel(level);
              setSelectedGrammar(grammar);
              setSelectedTopic(topic);
              found = true;
              break;
            }
          }
        }
        if (found) break;
      }
      if (found) break;
    }
  }, [deckParam]);

  const levels = Object.keys(conversationData);
  const grammars = selectedLevel ? Object.keys(conversationData[selectedLevel]) : [];
  const topics = selectedGrammar ? Object.keys(conversationData[selectedLevel][selectedGrammar]) : [];
  const questions = selectedTopic
    ? conversationData[selectedLevel][selectedGrammar][selectedTopic]
    : [];

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-xl font-bold mb-4">🗂️ ESL Conversation Deck</h1>

      <div className="space-y-4">
        <select value={selectedLevel} onChange={e => setSelectedLevel(e.target.value)} className="w-full p-2 border rounded">
          <option value="">Select Level</option>
          {levels.map(level => (
            <option key={level} value={level}>{level}</option>
          ))}
        </select>

        <select value={selectedGrammar} onChange={e => setSelectedGrammar(e.target.value)} className="w-full p-2 border rounded">
          <option value="">Select Grammar</option>
          {grammars.map(g => (
            <option key={g} value={g}>{g}</option>
          ))}
        </select>

        <select value={selectedTopic} onChange={e => setSelectedTopic(e.target.value)} className="w-full p-2 border rounded">
          <option value="">Select Topic</option>
          {topics.map(t => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </div>

      {questions.length > 0 && (
        <div className="mt-6">
          <h2 className="font-semibold mb-2">Conversation Prompts:</h2>
          <ul className="space-y-2">
            {questions.map((q, index) => (
              <li key={index} className="bg-white p-3 border rounded shadow">{q}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DeckViewer;

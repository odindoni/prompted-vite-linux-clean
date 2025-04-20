import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import a1ConversationData from "../data/a1_conversation_deck.json";
import a2ConversationData from "../data/a2_conversation_deck.json";
import QRCode from "react-qr-code";

// Merge both A1 and A2 data into one object by level
const conversationData = {
  ...a1ConversationData,
  ...a2ConversationData,
};

const DeckViewer = () => {
  const [searchParams] = useSearchParams();
  const deckParam = searchParams.get("deck"); // format: "A1 - Grammar - Topic"

  const [selectedLevel, setSelectedLevel] = useState("");
  const [selectedGrammar, setSelectedGrammar] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("");

  useEffect(() => {
    if (!deckParam) return;

    const [levelFromURL, grammarFromURL, topicFromURL] = deckParam.split(" - ");
    setSelectedLevel(levelFromURL);
    setSelectedGrammar(grammarFromURL);
    setSelectedTopic(topicFromURL);
  }, [deckParam]);

  const levels = Object.keys(conversationData);
  const grammars = selectedLevel ? Object.keys(conversationData[selectedLevel]) : [];
  const topics =
    selectedLevel && selectedGrammar
      ? Object.keys(conversationData[selectedLevel][selectedGrammar])
      : [];
  const questions =
    selectedLevel && selectedGrammar && selectedTopic
      ? conversationData[selectedLevel][selectedGrammar][selectedTopic]
      : [];

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-xl font-bold mb-4">🗂️ ESL Conversation Deck</h1>

      <div className="space-y-4">
        <select
          value={selectedLevel}
          onChange={(e) => {
            setSelectedLevel(e.target.value);
            setSelectedGrammar("");
            setSelectedTopic("");
          }}
          className="w-full p-2 border rounded"
        >
          <option value="">Select Level</option>
          {levels.map((level) => (
            <option key={level} value={level}>
              {level}
            </option>
          ))}
        </select>

        <select
          value={selectedGrammar}
          onChange={(e) => {
            setSelectedGrammar(e.target.value);
            setSelectedTopic("");
          }}
          className="w-full p-2 border rounded"
          disabled={!selectedLevel}
        >
          <option value="">Select Grammar</option>
          {grammars.map((grammar) => (
            <option key={grammar} value={grammar}>
              {grammar}
            </option>
          ))}
        </select>

        <select
          value={selectedTopic}
          onChange={(e) => setSelectedTopic(e.target.value)}
          className="w-full p-2 border rounded"
          disabled={!selectedGrammar}
        >
          <option value="">Select Topic</option>
          {topics.map((topic) => (
            <option key={topic} value={topic}>
              {topic}
            </option>
          ))}
        </select>
      </div>

      {questions.length > 0 && (
        <div className="mt-6">
          <h2 className="font-semibold mb-2">Conversation Prompts:</h2>
          <ul className="space-y-2">
            {questions.map((q, index) => (
              <li key={index} className="bg-white p-3 border rounded shadow">
                {q}
              </li>
            ))}
          </ul>

          <div className="mt-10 text-center">
            <h3 className="font-semibold mb-2">📱 Share with Students</h3>
            <p className="text-sm text-gray-600 mb-2">Scan to open on mobile</p>
            <div className="flex justify-center">
              <QRCode
                value={`${window.location.origin}/mobile?deck=${encodeURIComponent(`${selectedLevel} - ${selectedGrammar} - ${selectedTopic}`)}`}
                size={128}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeckViewer;

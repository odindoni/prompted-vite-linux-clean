
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import a1ConversationData from "../data/a1_conversation_deck.json";
import a2ConversationData from "../data/a2_conversation_deck.json";

const conversationData = {
  A1: a1ConversationData,
  A2: a2ConversationData,
};

const MobileViewer = () => {
  const [searchParams] = useSearchParams();
  const deckParam = searchParams.get("deck");
  const [selectedLevel, setSelectedLevel] = useState("");
  const [selectedGrammar, setSelectedGrammar] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("");
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!deckParam) return;
    const [levelFromURL, grammarFromURL, topicFromURL] = deckParam.split(" - ");
    if (
      conversationData[levelFromURL] &&
      conversationData[levelFromURL][grammarFromURL] &&
      conversationData[levelFromURL][grammarFromURL][topicFromURL]
    ) {
      setSelectedLevel(levelFromURL);
      setSelectedGrammar(grammarFromURL);
      setSelectedTopic(topicFromURL);
      setQuestions(conversationData[levelFromURL][grammarFromURL][topicFromURL]);
      setCurrentIndex(0);
    }
  }, [deckParam]);

  const goNext = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, questions.length - 1));
  };

  const goPrev = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-white">
      <h1 className="text-3xl font-bold text-blue-800 mb-6">Prompted</h1>
      <div className="text-lg font-semibold text-center border-b pb-2 w-full">
        {questions[currentIndex]}
      </div>
      <div className="flex justify-between w-full mt-6">
        <button
          onClick={goPrev}
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
          disabled={currentIndex === 0}
        >
          ← Previous
        </button>
        <button
          onClick={goNext}
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
          disabled={currentIndex === questions.length - 1}
        >
          Next →
        </button>
      </div>
    </div>
  );
};

export default MobileViewer;

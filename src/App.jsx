import { Routes, Route } from "react-router-dom";
import Landing from "./components/LandingPage.jsx";
import DeckViewer from "./components/DeckViewer";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/session" element={<DeckViewer />} />
    </Routes>
  );
}

export default App;

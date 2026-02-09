import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "remixicon/fonts/remixicon.css";
import "./App.scss";
import { LandingPage } from "./pages/LandingPage";
import { EditorWorkspace } from "./pages/EditorWorkspace";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/editor" element={<EditorWorkspace />} />
      </Routes>
    </Router>
  );
}

export default App;

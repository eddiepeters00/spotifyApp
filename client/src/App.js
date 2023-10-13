import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import PlayListView from "./pages/PlayListView";

function App() {
  return (
    <>
      <main>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/playlist" element={<PlayListView />} />
          </Routes>
        </Router>
      </main>
    </>
  );
}

export default App;

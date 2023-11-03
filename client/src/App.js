import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import SelectedPlayList from "./pages/SelectedPlayList";

function App() {
  return (
    <>
      <main>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<Home />}></Route>
            <Route path="/selected/:id" element={<SelectedPlayList />}></Route>
          </Routes>
        </Router>
      </main>
    </>
  );
}

export default App;

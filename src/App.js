import "./App.css";

import Login from "./pages/auth/Login";
import Home from "./pages/tracker/Home";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" exact element={<Login />} />
          <Route path="/expense-tracker" element={<Home />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

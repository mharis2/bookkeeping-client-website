import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home.js";
import NavBar from "./components/Navbar.js";
import ContactUs from "./components/Contact.js";
import Team from "./components/Team.js";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/team" element={<Team />} />
        {/* other routes will go here */}
      </Routes>
    </Router>
  );
}

export default App;

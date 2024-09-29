import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";
import Trade from "./pages/Trade/Trade";
import AuthModal from "./components/AuthModal/AuthModal";
import "./styles/global.scss";

const App: React.FC = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const openAuthModal = () => {
    setIsAuthModalOpen(true);
  };
  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  return (
    <Router>
      <Header openAuthModal={openAuthModal} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/trade" element={<Trade />} />
      </Routes>
      {isAuthModalOpen && <AuthModal closeModal={closeAuthModal} />}
    </Router>
  );
};

export default App;

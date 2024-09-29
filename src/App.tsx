import React, { useState, useCallback } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";
import Trade from "./pages/Trade/Trade";
import AuthModal from "./components/AuthModal/AuthModal";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import "./styles/global.scss";

const App: React.FC = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const toggleAuthModal = useCallback(() => {
    setIsAuthModalOpen((prev) => !prev);
  }, []);

  return (
    <Router>
      <Header openAuthModal={toggleAuthModal} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/trade"
          element={
            <PrivateRoute>
              <Trade />
            </PrivateRoute>
          }
        />
      </Routes>
      {isAuthModalOpen && <AuthModal closeModal={toggleAuthModal} />}
    </Router>
  );
};

export default App;

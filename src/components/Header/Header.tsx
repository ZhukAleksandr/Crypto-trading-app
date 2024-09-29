import React from "react";
import { useNavigate } from "react-router-dom";
import useStore from "../../store";
import styles from "./Header.module.scss";

interface HeaderProps {
  openAuthModal: () => void;
}

const Header: React.FC<HeaderProps> = ({ openAuthModal }) => {
  const { isLogged, logout } = useStore();
  const navigate = useNavigate();

  const handleTradeClick = () => {
    if (isLogged) {
      navigate("/trade");
    } else {
      openAuthModal();
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <a onClick={() => navigate("/")} className={styles.link}>
          Home
        </a>
        <a onClick={handleTradeClick} className={styles.link}>
          Trade
        </a>
      </nav>
      <div className={styles.userInfo}>
        {isLogged ? (
          <button className={styles.logoutButton} onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <button className={styles.loginButton} onClick={handleTradeClick}>
            Login
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;

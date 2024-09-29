import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import useStore from "../../store";
import styles from "./Header.module.scss";
import { HeaderProps } from "../../interfaces/HeaderProps";

const Header: React.FC<HeaderProps> = ({ openAuthModal }) => {
  const { isLogged, logout } = useStore();
  const navigate = useNavigate();

  const handleTradeClick = () => {
    isLogged ? navigate("/trade") : openAuthModal();
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            isActive ? `${styles.link} ${styles.activeLink}` : styles.link
          }
        >
          Home
        </NavLink>
        {isLogged ? (
          <NavLink
            to="/trade"
            className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.activeLink}` : styles.link
            }
          >
            Trade
          </NavLink>
        ) : (
          <button className={styles.link} onClick={handleTradeClick}>
            Trade
          </button>
        )}
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

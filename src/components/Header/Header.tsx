import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import useStore from "../../store";
import styles from "./Header.module.scss";
import { HeaderProps } from "../../interfaces/HeaderProps";

const Header: React.FC<HeaderProps> = ({ openAuthModal }) => {
  const { isLogged, user, logout } = useStore();
  const navigate = useNavigate();

  const handleTradeClick = () => {
    if (isLogged) {
      navigate("/trade");
    } else {
      useStore.setState({ redirectPath: "/trade" });
      openAuthModal();
    }
  };

  const handleLoginClick = () => {
    openAuthModal();
  }

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const getEmailUsername = (email: string) => {
    return email.split("@")[0];
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
        {isLogged && user?.email && (
          <span className={styles.userEmail}>
            {getEmailUsername(user.email)}
          </span>
        )}

        {isLogged ? (
          <button className={styles.logoutButton} onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <button className={styles.loginButton} onClick={handleLoginClick}>
            Login
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
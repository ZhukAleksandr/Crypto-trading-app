import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.scss";
import AuthModal from "../AuthModal/AuthModal";

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <header className={styles.header}>
        <nav className={styles.nav}>
          <Link to="/" className={styles.link}>
            Home
          </Link>
          <Link to="/trade" className={styles.link}>
            Trade
          </Link>
        </nav>
        <div className={styles.userInfo}>
          <button className={styles.loginButton} onClick={openModal}>
            Login
          </button>
        </div>
      </header>
      {isModalOpen && <AuthModal closeModal={closeModal} />}
    </>
  );
};

export default Header;

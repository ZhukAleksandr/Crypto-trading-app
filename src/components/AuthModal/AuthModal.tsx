import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useStore from "../../store";
import styles from "./AuthModal.module.scss";
import { AuthModalProps } from "../../interfaces/AuthModalProps";

const AuthModal: React.FC<AuthModalProps> = ({ closeModal }) => {
  const { isLogged, login, setEmail, setPassword } = useStore();
  const navigate = useNavigate();

  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  useEffect(() => {
    if (isLogged) {
      closeModal();
      navigate("/trade");
    }
  }, [isLogged, navigate, closeModal]);

  const validateInputs = () => {
    let valid = true;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput)) {
      setEmailError("Please enter a valid email.");
      valid = false;
    } else {
      setEmailError("");
    }

    if (passwordInput.length < 8) {
      setPasswordError("Password must be at least 8 characters long.");
      valid = false;
    } else {
      setPasswordError("");
    }

    return valid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateInputs()) {
      return;
    }

    setEmail(emailInput);
    setPassword(passwordInput);

    const fakeUser = { id: "1", name: "Admin", email: emailInput };
    login(fakeUser);
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={closeModal}>
          &#x2715;
        </button>
        <h2 className={styles.title}>Login</h2>
        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            type="email"
            value={emailInput}
            onChange={(e) => setEmailInput(e.target.value)}
            placeholder="Email"
            className={styles.input}
            required
          />
          {emailError && <p className={styles.error}>{emailError}</p>}

          <input
            type="password"
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
            placeholder="Password"
            className={styles.input}
            required
          />
          {passwordError && <p className={styles.error}>{passwordError}</p>}

          <button type="submit" className={styles.submitButton}>
            Log In
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuthModal;

import React from "react";
import styles from "./ErrorMessage.module.scss";
import { ErrorMessageProps } from "../../interfaces/ErrorMessageProps";

const ErrorMessage: React.FC<ErrorMessageProps> = ({
  message = "Error loading data",
  onRetry,
}) => {
  return (
    <div className={styles.errorContainer}>
      <h2 className={styles.errorTitle}>Oops!</h2>
      <p className={styles.errorMessage}>{message}</p>
      {onRetry && (
        <button className={styles.retryButton} onClick={onRetry}>
          Try Again
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;

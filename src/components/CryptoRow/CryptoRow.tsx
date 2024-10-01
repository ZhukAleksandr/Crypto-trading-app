import React from "react";
import styles from "./CryptoRow.module.scss";
import { CryptoRowProps } from "../../interfaces/CryptoRow";

const CryptoRow: React.FC<CryptoRowProps> = ({
  crypto,
  buyPrice,
  sellPrice,
  actionType,
  onActionChange,
}) => {
  return (
    <React.Fragment key={crypto.id}>
      <div className={styles.gridCell}>
        <img
          src={crypto.icon}
          alt={`${crypto.name} icon`}
          className={styles.icon}
        />
        {crypto.name}
      </div>
      <div className={styles.gridCell}>
        {actionType === "sell"
          ? `$${sellPrice.toFixed(2)}`
          : `$${buyPrice.toFixed(2)}`}
      </div>
      <div className={styles.gridCell}>
        <select
          value={actionType || "buy"}
          onChange={(e) => onActionChange(e, crypto.id)}
          className={`${styles.actionSelect} ${
            actionType === "sell" ? styles.sellSelect : styles.buySelect
          }`}
        >
          <option value="buy">Buy</option>
          <option value="sell">Sell</option>
        </select>
      </div>
    </React.Fragment>
  );
};

export default CryptoRow;

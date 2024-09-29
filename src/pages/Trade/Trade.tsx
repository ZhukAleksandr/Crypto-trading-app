import TradeForm from "../../components/TradeForm/TradeForm";
import styles from "./Trade.module.scss";

const Trade = () => {
  return (
    <div className={styles.tradePage}>
      <TradeForm />
    </div>
  );
};

export default Trade;

import CryptoTable from "../../components/CryptoTable/CryptoTable";
import styles from "./Home.module.scss";

const Home = () => {
  return (
    <div className={styles.homeContainer}>
      <div className={styles.tableWrapper}>
        <h1 className={styles.pageTitle}>Crypto Assets</h1>
        <CryptoTable />
      </div>
    </div>
  );
};

export default Home;

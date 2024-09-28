import React, { useState } from "react";
import styles from "./CryptoTable.module.scss";

const dummyData = [
  {
    id: "1",
    name: "Bitcoin",
    symbol: "BTC",
    buyPrice: 55000,
    sellPrice: 54000,
    iconUrl: "https://cryptologos.cc/logos/bitcoin-btc-logo.png",
  },
  {
    id: "2",
    name: "Ethereum",
    symbol: "ETH",
    buyPrice: 3500,
    sellPrice: 3400,
    iconUrl: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
  },
  {
    id: "3",
    name: "Ripple",
    symbol: "XRP",
    buyPrice: 1.05,
    sellPrice: 1.0,
    iconUrl: "https://cryptologos.cc/logos/xrp-xrp-logo.png",
  },
  {
    id: "4",
    name: "Cardano",
    symbol: "ADA",
    buyPrice: 2.2,
    sellPrice: 2.1,
    iconUrl: "https://cryptologos.cc/logos/cardano-ada-logo.png",
  },
  {
    id: "5",
    name: "Polkadot",
    symbol: "DOT",
    buyPrice: 30,
    sellPrice: 29,
    iconUrl: "https://cryptologos.cc/logos/polkadot-new-dot-logo.png",
  },
  {
    id: "6",
    name: "Chainlink",
    symbol: "LINK",
    buyPrice: 25,
    sellPrice: 24,
    iconUrl: "https://cryptologos.cc/logos/chainlink-link-logo.png",
  },
  {
    id: "7",
    name: "Litecoin",
    symbol: "LTC",
    buyPrice: 180,
    sellPrice: 175,
    iconUrl: "https://cryptologos.cc/logos/litecoin-ltc-logo.png",
  },
  {
    id: "8",
    name: "Stellar",
    symbol: "XLM",
    buyPrice: 0.4,
    sellPrice: 0.39,
    iconUrl: "https://cryptologos.cc/logos/stellar-xlm-logo.png",
  },
  {
    id: "9",
    name: "Dogecoin",
    symbol: "DOGE",
    buyPrice: 0.25,
    sellPrice: 0.24,
    iconUrl: "https://cryptologos.cc/logos/dogecoin-doge-logo.png",
  },
  {
    id: "10",
    name: "Solana",
    symbol: "SOL",
    buyPrice: 150,
    sellPrice: 145,
    iconUrl: "https://cryptologos.cc/logos/solana-sol-logo.png",
  },
  {
    id: "11",
    name: "Bitcoin Cash",
    symbol: "BCH",
    buyPrice: 600,
    sellPrice: 590,
    iconUrl: "https://cryptologos.cc/logos/bitcoin-cash-bch-logo.png",
  },
  {
    id: "12",
    name: "EOS",
    symbol: "EOS",
    buyPrice: 5,
    sellPrice: 4.8,
    iconUrl: "https://cryptologos.cc/logos/eos-eos-logo.png",
  },
  {
    id: "13",
    name: "Tron",
    symbol: "TRX",
    buyPrice: 0.1,
    sellPrice: 0.095,
    iconUrl: "https://cryptologos.cc/logos/tron-trx-logo.png",
  },
  {
    id: "14",
    name: "VeChain",
    symbol: "VET",
    buyPrice: 0.05,
    sellPrice: 0.045,
    iconUrl: "https://cryptologos.cc/logos/vechain-vet-logo.png",
  },
  {
    id: "15",
    name: "Tezos",
    symbol: "XTZ",
    buyPrice: 4,
    sellPrice: 3.9,
    iconUrl: "https://cryptologos.cc/logos/tezos-xtz-logo.png",
  },
  {
    id: "16",
    name: "Monero",
    symbol: "XMR",
    buyPrice: 240,
    sellPrice: 230,
    iconUrl: "https://cryptologos.cc/logos/monero-xmr-logo.png",
  },
  {
    id: "17",
    name: "Dash",
    symbol: "DASH",
    buyPrice: 200,
    sellPrice: 190,
    iconUrl: "https://cryptologos.cc/logos/dash-dash-logo.png",
  },
  {
    id: "18",
    name: "Zcash",
    symbol: "ZEC",
    buyPrice: 130,
    sellPrice: 125,
    iconUrl: "https://cryptologos.cc/logos/zcash-zec-logo.png",
  },
  {
    id: "19",
    name: "Binance Coin",
    symbol: "BNB",
    buyPrice: 400,
    sellPrice: 390,
    iconUrl: "https://cryptologos.cc/logos/binance-coin-bnb-logo.png",
  },
  {
    id: "20",
    name: "Neo",
    symbol: "NEO",
    buyPrice: 50,
    sellPrice: 48,
    iconUrl: "https://cryptologos.cc/logos/neo-neo-logo.png",
  },
];

const CryptoTable = () => {
  const [displayedData, setDisplayedData] = useState(dummyData.slice(0, 10));
  const [itemsToShow, setItemsToShow] = useState(10);
  const [sortConfig, setSortConfig] = useState<{
    key: keyof (typeof dummyData)[0];
    direction: "asc" | "desc";
  } | null>(null);
  const [actionTypes, setActionTypes] = useState<{
    [id: string]: "buy" | "sell";
  }>({});

  const sortedData = [...displayedData].sort((a, b) => {
    if (!sortConfig) return 0;
    const order = sortConfig.direction === "asc" ? 1 : -1;
    const key = sortConfig.key;

    if (a[key] < b[key]) return -1 * order;
    if (a[key] > b[key]) return 1 * order;
    return 0;
  });

  const loadMore = () => {
    setItemsToShow((prev) => prev + 10);
    setDisplayedData(dummyData.slice(0, itemsToShow + 10));
  };

  const requestSort = (key: keyof (typeof dummyData)[0]) => {
    let direction: "asc" | "desc" = "asc";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "asc"
    ) {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const handleActionChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
    id: string
  ) => {
    setActionTypes((prev) => ({
      ...prev,
      [id]: e.target.value as "buy" | "sell",
    }));
  };

  return (
    <div className={styles.tableContainer}>
      <div className={styles.gridTable}>
        <div className={styles.gridHeader} onClick={() => requestSort("name")}>
          <span>Coin Name</span>
          <span
            className={`${styles.sortIcon} ${
              sortConfig?.key === "name"
                ? sortConfig.direction === "asc"
                  ? styles.sortAsc
                  : styles.sortDesc
                : ""
            }`}
          >
            ▲
          </span>
        </div>
        <div
          className={styles.gridHeader}
          onClick={() => requestSort("buyPrice")}
        >
          <span>Price</span>
          <span
            className={`${styles.sortIcon} ${
              sortConfig?.key === "buyPrice"
                ? sortConfig.direction === "asc"
                  ? styles.sortAsc
                  : styles.sortDesc
                : ""
            }`}
          >
            ▲
          </span>
        </div>
        <div className={styles.gridHeaderAction}>Action</div>

        {sortedData.map((crypto) => (
          <React.Fragment key={crypto.id}>
            <div className={styles.gridCell}>
              <img
                src={crypto.iconUrl}
                alt={`${crypto.name} icon`}
                className={styles.icon}
              />
              {crypto.name}
            </div>
            <div className={styles.gridCell}>
              {actionTypes[crypto.id] === "sell"
                ? `$${crypto.sellPrice.toFixed(2)}`
                : `$${crypto.buyPrice.toFixed(2)}`}
            </div>
            <div className={styles.gridCell}>
              <select
                value={actionTypes[crypto.id] || "buy"}
                onChange={(e) => handleActionChange(e, crypto.id)}
                className={`${styles.actionSelect} ${
                  actionTypes[crypto.id] === "sell"
                    ? styles.sellSelect
                    : styles.buySelect
                }`}
              >
                <option value="buy">Buy</option>
                <option value="sell">Sell</option>
              </select>
            </div>
          </React.Fragment>
        ))}
      </div>

      {itemsToShow < dummyData.length && (
        <div className={styles.loadMoreContainer}>
          <button onClick={loadMore} className={styles.loadMoreButton}>
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default CryptoTable;

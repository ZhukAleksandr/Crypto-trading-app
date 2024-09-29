import React, { useState, useEffect, useCallback } from "react";
import styles from "./TradeForm.module.scss";

const assets = [
  { symbol: "BTC", name: "Bitcoin", price: 55000 },
  { symbol: "ETH", name: "Ethereum", price: 3500 },
  { symbol: "XRP", name: "Ripple", price: 1.05 },
];

const convertCryptoToFiat = (cryptoAmount: number, price: number) =>
  (cryptoAmount * price).toFixed(2);

const convertFiatToCrypto = (fiatAmount: number, price: number) =>
  (fiatAmount / price).toFixed(6);

const TradeForm: React.FC = () => {
  const [inputAmount, setInputAmount] = useState<string>("");
  const [outputAmount, setOutputAmount] = useState<string>("");
  const [selectedAsset, setSelectedAsset] = useState<string>("BTC");
  const [isCryptoToFiat, setIsCryptoToFiat] = useState<boolean>(true);

  const selectedAssetData = assets.find(
    (asset) => asset.symbol === selectedAsset
  );

  useEffect(() => {
    if (!inputAmount || !selectedAssetData) return;

    const inputValue = parseFloat(inputAmount);

    const result = isCryptoToFiat
      ? convertCryptoToFiat(inputValue, selectedAssetData.price)
      : convertFiatToCrypto(inputValue, selectedAssetData.price);

    setOutputAmount(result);
  }, [inputAmount, isCryptoToFiat, selectedAssetData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputAmount(e.target.value);
  };

  const handleAssetChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedAsset(e.target.value);
  };

  const handleSwap = useCallback(() => {
    setIsCryptoToFiat((prev) => !prev);
  }, []);

  return (
    <div className={styles.tradeContainer}>
      <h2 className={styles.title}>Trade Form</h2>
      <form className={styles.form}>
        {isCryptoToFiat ? (
          <>
            <div className={styles.inputGroup}>
              <input
                type="number"
                value={inputAmount}
                onChange={handleInputChange}
                className={styles.input}
                placeholder="0"
              />
              <select
                value={selectedAsset}
                onChange={handleAssetChange}
                className={styles.select}
              >
                {assets.map((asset) => (
                  <option key={asset.symbol} value={asset.symbol}>
                    {asset.symbol}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="button"
              className={styles.swapButton}
              onClick={handleSwap}
            >
              &#8646;
            </button>

            <div className={styles.inputGroup}>
              <input
                type="number"
                value={outputAmount}
                className={styles.input}
                placeholder="$ 0"
                disabled
              />
              <span className={styles.currency}>USD</span>
            </div>
          </>
        ) : (
          <>
            <div className={styles.inputGroup}>
              <input
                type="number"
                value={inputAmount}
                onChange={handleInputChange}
                className={styles.input}
                placeholder="$ 0"
              />
              <span className={styles.currency}>USD</span>
            </div>

            <button
              type="button"
              className={styles.swapButton}
              onClick={handleSwap}
            >
              &#8646;
            </button>
            <div className={styles.inputGroup}>
              <input
                type="number"
                value={outputAmount}
                className={styles.input}
                placeholder="0"
                disabled
              />
              <select
                value={selectedAsset}
                onChange={handleAssetChange}
                className={styles.select}
              >
                {assets.map((asset) => (
                  <option key={asset.symbol} value={asset.symbol}>
                    {asset.symbol}
                  </option>
                ))}
              </select>
            </div>
          </>
        )}
      </form>
    </div>
  );
};

export default TradeForm;

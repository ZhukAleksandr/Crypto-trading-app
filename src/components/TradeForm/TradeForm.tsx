import React, { useEffect, useState, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { getCryptoAssets } from "../../services/api";
import styles from "./TradeForm.module.scss";
import { CryptoAsset } from "../../interfaces/CryptoAsset";

const convertCryptoToFiat = (cryptoAmount: number, price: number) =>
  (cryptoAmount * price).toFixed(2);

const convertFiatToCrypto = (fiatAmount: number, price: number) =>
  (fiatAmount / price).toFixed(6);

const TradeForm: React.FC = () => {
  const [inputAmount, setInputAmount] = useState<string>("0");
  const [outputAmount, setOutputAmount] = useState<string>("0");
  const [selectedAsset, setSelectedAsset] = useState<string>("");
  const [isCryptoToFiat, setIsCryptoToFiat] = useState<boolean>(true);

  const {
    data: assets,
    isLoading,
    error,
  } = useQuery<CryptoAsset[]>({
    queryKey: ["cryptoAssets"],
    queryFn: getCryptoAssets,
  });

  useEffect(() => {
    if (assets && assets.length > 0 && !selectedAsset) {
      setSelectedAsset(assets[0].symbol);
    }
  }, [assets, selectedAsset]);

  const selectedAssetData = assets?.find(
    (asset) => asset.symbol === selectedAsset
  );

  useEffect(() => {
    if (!selectedAssetData) return;

    const inputValue = parseFloat(inputAmount) || 0;
    const result = isCryptoToFiat
      ? convertCryptoToFiat(inputValue, selectedAssetData.price)
      : convertFiatToCrypto(inputValue, selectedAssetData.price);

    setOutputAmount(result);
  }, [inputAmount, isCryptoToFiat, selectedAssetData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;

    if (value.startsWith("0") && !value.startsWith("0.")) {
      value = value.slice(1);
    }

    setInputAmount(value);
  };

  const handleAssetChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedAsset(e.target.value);
  };

  const handleSwap = useCallback(() => {
    setIsCryptoToFiat(!isCryptoToFiat);
  }, [isCryptoToFiat]);

  if (isLoading) return <div>Loading assets...</div>;
  if (error) return <div>Error loading assets: {`${error}`}</div>;

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
                min="0"
              />
              <select
                value={selectedAsset}
                onChange={handleAssetChange}
                className={styles.select}
              >
                {(assets ?? []).map((asset) => (
                  <option key={asset.id} value={asset.symbol}>
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
                min="0"
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
                {(assets ?? []).map((asset) => (
                  <option key={asset.id} value={asset.symbol}>
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

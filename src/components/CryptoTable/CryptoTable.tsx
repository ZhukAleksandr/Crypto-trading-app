import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getCryptoAssets } from "../../services/api";
import useStore from "../../store";
import styles from "./CryptoTable.module.scss";
import { CryptoAsset } from "../../interfaces/CryptoAsset";
import SortableHeader from "../SortableHeader/SortableHeader";

const CryptoTable: React.FC = () => {
  const itemsToShow = useStore((state) => state.itemsToShow);
  const setItemsToShow = useStore((state) => state.setItemsToShow);
  const actionTypes = useStore((state) => state.actionTypes);
  const setActionType = useStore((state) => state.setActionType);

  const [sortConfig, setSortConfig] = useState<{
    key: keyof CryptoAsset;
    direction: "asc" | "desc";
  } | null>(null);

  const [searchParams, setSearchParams] = useSearchParams();
  const isSorted = searchParams.get("isSorted") === "true";

  const { data, error, isLoading } = useQuery<CryptoAsset[]>({
    queryKey: ["cryptoAssets"],
    queryFn: getCryptoAssets,
  });

  useEffect(() => {
    // Если isSorted равен false, мы не применяем сортировку
    if (!isSorted) {
      setSortConfig(null);
    }
  }, [isSorted]);

  if (isLoading) return <div>Loading data...</div>;
  if (error) return <div>Error loading data: {`${error}`}</div>;

  const sortedData = [...(data ?? [])].sort((a, b) => {
    if (!sortConfig) return 0;
    const order = sortConfig.direction === "asc" ? 1 : -1;
    const key = sortConfig.key;

    if (a[key] < b[key]) return -1 * order;
    if (a[key] > b[key]) return 1 * order;
    return 0;
  });

  const requestSort = (key: keyof CryptoAsset) => {
    let direction: "asc" | "desc" = "asc";

    if (sortConfig?.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }

    setSortConfig({ key, direction });

    setSearchParams({ isSorted: "true" });
  };

  const loadMore = () => {
    setItemsToShow(itemsToShow + 10);
  };

  const handleActionChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
    id: string
  ) => {
    setActionType(id, e.target.value as "buy" | "sell");
  };

  return (
    <div className={styles.tableContainer}>
      <div className={styles.gridTable}>
        <SortableHeader
          label="Coin Name"
          sortKey="name"
          sortConfig={sortConfig}
          requestSort={requestSort}
        />
        <SortableHeader
          label="Price"
          sortKey="price"
          sortConfig={sortConfig}
          requestSort={requestSort}
        />
        <div className={styles.gridHeaderAction}>Action</div>

        {sortedData.slice(0, itemsToShow).map((crypto) => {
          const buyPrice = crypto.price;
          const sellPrice = buyPrice * 0.95;

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
                {actionTypes[crypto.id] === "sell"
                  ? `$${sellPrice.toFixed(2)}`
                  : `$${buyPrice.toFixed(2)}`}
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
          );
        })}
      </div>

      {itemsToShow < sortedData.length && (
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

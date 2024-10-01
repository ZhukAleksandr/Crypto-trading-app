import React, { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getCryptoAssets } from "../../services/api";
import useStore from "../../store";
import styles from "./CryptoTable.module.scss";
import { CryptoAsset } from "../../interfaces/CryptoAsset";
import { SortDirection, Params } from "../../interfaces/CryptoTableInterfaces";
import SortableHeader from "../SortableHeader/SortableHeader";
import CryptoRow from "../CryptoRow/CryptoRow";

const CryptoTable: React.FC = () => {
  const itemsToShow = useStore((state) => state.itemsToShow);
  const setItemsToShow = useStore((state) => state.setItemsToShow);
  const actionTypes = useStore((state) => state.actionTypes);
  const setActionType = useStore((state) => state.setActionType);
  const [searchParams, setSearchParams] = useSearchParams();

  const [sortConfig, setSortConfig] = useState<Params>({
    key: (searchParams.get("sortKey") as keyof CryptoAsset) || undefined,
    direction: (searchParams.get("sortDirection") as SortDirection) || undefined,
  });

  const { data, error, isLoading } = useQuery<CryptoAsset[]>({
    queryKey: ["cryptoAssets"],
    queryFn: () => getCryptoAssets({ 
      vs_currency: "usd", 
      order: "market_cap_desc", 
      per_page: 100, 
      page: 1, 
      sparkline: false 
    }),
  });

  const sortedData = useMemo(() => {
    if (!data || !sortConfig.key) return data ?? [];

    const order = sortConfig.direction === SortDirection.ASC ? 1 : -1;
    const key = sortConfig.key;

    return [...data].sort((a, b) => {
      if (a[key] < b[key]) return -1 * order;
      if (a[key] > b[key]) return 1 * order;
      return 0;
    });
  }, [data, sortConfig]);

  const requestSort = (key: keyof CryptoAsset) => {
    let direction: SortDirection = SortDirection.ASC;

    if (sortConfig?.key === key && sortConfig.direction === SortDirection.ASC) {
      direction = SortDirection.DESC;
    }

    setSortConfig({ key, direction });

    searchParams.set("sortKey", key);
    searchParams.set("sortDirection", direction);
    setSearchParams(searchParams);
  };

  const loadMore = () => {
    setItemsToShow(itemsToShow + 10);
  };

  const handleActionChange = (e: React.ChangeEvent<HTMLSelectElement>, id: string) => {
    setActionType(id, e.target.value as "buy" | "sell");
  };

  if (isLoading) return <div>Loading data...</div>;
  if (error) return <div>Error loading data: {`${error}`}</div>;

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
            <CryptoRow
              key={crypto.id}
              crypto={crypto}
              buyPrice={buyPrice}
              sellPrice={sellPrice}
              actionType={actionTypes[crypto.id]}
              onActionChange={handleActionChange}
            />
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

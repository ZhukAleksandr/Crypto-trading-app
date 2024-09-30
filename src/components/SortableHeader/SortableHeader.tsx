import React from "react";
import styles from "./SortableHeader.module.scss";
import { SortableHeaderProps } from "../../interfaces/SortableHeaderProps";

const SortableHeader: React.FC<SortableHeaderProps> = ({
  label,
  sortKey,
  sortConfig,
  requestSort,
}) => {
  const isActive = sortConfig?.key === sortKey;
  const isAscending = sortConfig?.direction === "asc";

  return (
    <div
      className={`${styles.sortableHeader} ${
        isActive ? styles.activeSort : ""
      }`}
      onClick={() => requestSort(sortKey)}
    >
      <span>{label}</span>
      <span
        className={`${styles.sortIcon} ${
          isActive ? (isAscending ? styles.sortAsc : styles.sortDesc) : ""
        }`}
      >
        ▲
      </span>
    </div>
  );
};

export default SortableHeader;

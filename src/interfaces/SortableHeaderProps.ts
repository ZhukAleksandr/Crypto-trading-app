import { CryptoAsset } from "./CryptoAsset";

export interface SortableHeaderProps {
  label: string;
  sortKey: keyof CryptoAsset;
  sortConfig: { key: keyof CryptoAsset; direction: "asc" | "desc" } | null;
  requestSort: (key: keyof CryptoAsset) => void;
}

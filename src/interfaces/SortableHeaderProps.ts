import { CryptoAsset } from "./CryptoAsset";
import { SortDirection } from "./CryptoTableInterfaces";

export interface SortableHeaderProps {
  label: string;
  sortKey: keyof CryptoAsset;
  sortConfig: { key?: keyof CryptoAsset; direction?: SortDirection } | null;
  requestSort: (key: keyof CryptoAsset) => void;
}


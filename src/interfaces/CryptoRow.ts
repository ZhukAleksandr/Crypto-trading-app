import { CryptoAsset } from "./CryptoAsset";

export interface CryptoRowProps {
  crypto: CryptoAsset;
  buyPrice: number;
  sellPrice: number;
  actionType: string;
  onActionChange: (e: React.ChangeEvent<HTMLSelectElement>, id: string) => void;
}

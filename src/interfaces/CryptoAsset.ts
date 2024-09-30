export interface CryptoAsset {
  id: string;
  name: string;
  price: number;
  icon: string;
  symbol: string;
  price_change_24h: number;
  circulating_marketcap: number;
}

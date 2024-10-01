export interface CryptoAsset {
  id: string;
  name: string;
  symbol: string;
  price: number;
  price_change_24h: number;
  circulating_marketcap: number;
  icon: string;
}

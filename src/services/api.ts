import axios from "axios";
import { ApiParams } from "../interfaces/CryptoApiInterfaces";

const API_URL = import.meta.env.VITE_API_URL as string;

export const getCryptoAssets = async ({
  vs_currency = "usd",
  order = "market_cap_desc",
  per_page = 100,
  page = 1,
  sparkline = false,
}: ApiParams) => {
  try {
    const searchParams = new URLSearchParams({
      vs_currency,
      order,
      per_page: per_page.toString(),
      page: page.toString(),
      sparkline: sparkline.toString(),
    });
    const API = API_URL + "?" + searchParams.toString();
    const response = await axios.get(API);

    return response.data.map((item: any) => ({
      id: item.id,
      name: item.name,
      symbol: item.symbol,
      price: item.current_price,
      price_change_24h: item.price_change_percentage_24h,
      circulating_marketcap: item.market_cap,
      icon: item.image,
    }));
  } catch (error) {
    console.error("Error fetching crypto data:", error);
  }
};

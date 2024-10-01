import { CryptoAsset } from "./CryptoAsset";

export enum SortDirection {
  ASC = "asc",
  DESC = "desc",
}

export interface Params {
  key?: keyof CryptoAsset;
  direction?: SortDirection;
}
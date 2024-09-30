export interface UIState {
  itemsToShow: number;
  actionTypes: { [id: string]: "buy" | "sell" };
  setItemsToShow: (count: number) => void;
  setActionType: (id: string, action: "buy" | "sell") => void;
}

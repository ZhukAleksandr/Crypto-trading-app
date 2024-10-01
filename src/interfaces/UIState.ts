export enum ActionType {
  BUY = "buy",
  SELL = "sell",
}

export interface UIState {
  itemsToShow: number;
  actionTypes: { [id: string]: ActionType };
  setItemsToShow: (count: number) => void;
  setActionType: (id: string, action: ActionType) => void;
}

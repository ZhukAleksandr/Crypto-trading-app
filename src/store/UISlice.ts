import { StateCreator } from "zustand";
import { UIState } from "../interfaces/UIState";

const createUISlice: StateCreator<UIState> = (set) => ({
  itemsToShow: 10,
  actionTypes: {},
  setItemsToShow: (count) => set({ itemsToShow: count }),
  setActionType: (id, action) =>
    set((state) => ({
      actionTypes: { ...state.actionTypes, [id]: action },
    })),
});

export default createUISlice;

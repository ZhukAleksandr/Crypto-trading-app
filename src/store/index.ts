import { create } from "zustand";
import createAuthSlice from "./authSlice";
import createUISlice from "./UISlice";
import { AuthState } from "../interfaces/AuthState";
import { UIState } from "../interfaces/UIState";


const useStore = create<AuthState & UIState>(
  (set, get, store) => ({
    ...createAuthSlice(set, get, store),
    ...createUISlice(set, get, store),
  })
);

export default useStore;

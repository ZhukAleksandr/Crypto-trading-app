import { create } from "zustand";
import createAuthSlice from "./authSlice";
import { AuthState } from "../interfaces/AuthState";

const useStore = create<AuthState>((set, get, store) => ({
  ...createAuthSlice(set, get, store),
}));

useStore.getState().checkAuth();

export default useStore;

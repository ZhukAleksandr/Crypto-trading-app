import { create } from "zustand";
import createAuthSlice from "./authSlice";
import { AuthState } from "../interfaces/AuthState";

const useStore = create<AuthState>((set, get, store) => ({
  ...createAuthSlice(set, get, store),
}));

export default useStore;
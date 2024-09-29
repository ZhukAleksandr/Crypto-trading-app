import { StateCreator } from "zustand";
import { AuthState } from "../interfaces/AuthState";

const createAuthSlice: StateCreator<AuthState> = (set, get, store) => ({
  isLogged: false,
  user: null,
  email: "",
  password: "",

  setEmail: (email: string) => set({ email }),

  setPassword: (password: string) => set({ password }),

  login: (user) => set({ isLogged: true, user }),

  logout: () =>
    set({
      isLogged: false,
      user: null,
      email: "",
      password: "",
    }),
});

export default createAuthSlice;

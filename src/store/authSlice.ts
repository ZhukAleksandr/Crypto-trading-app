import { StateCreator } from "zustand";
import { AuthState } from "../interfaces/AuthState";

const generateFakeJWT = () => {
  return "fake-jwt-token-" + Math.random().toString(36).substr(2);
};

const createAuthSlice: StateCreator<AuthState> = (set, get) => ({
  isLogged: false,
  user: null,
  email: "",
  password: "",

  setEmail: (email: string) => set({ email }),

  setPassword: (password: string) => set({ password }),

  login: (user) => {
    const token = generateFakeJWT();
    localStorage.setItem("authToken", token);
    set({ isLogged: true, user });
  },

  logout: () => {
    localStorage.removeItem("authToken");
    set({
      isLogged: false,
      user: null,
      email: "",
      password: "",
    });
  },

  checkAuth: () => {
    const token = localStorage.getItem("authToken");
    if (token) {
      set({
        isLogged: true,
        user: { id: "1", name: "Admin", email: get().email },
      });
    }
  },
});

export default createAuthSlice;

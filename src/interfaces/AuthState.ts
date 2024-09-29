export interface AuthState {
  isLogged: boolean;
  user: { id: string; name: string; email: string } | null;
  email: string;
  password: string;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  login: (user: { id: string; name: string; email: string }) => void;
  logout: () => void;
}
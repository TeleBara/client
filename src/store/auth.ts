import { createContext, useContext } from "solid-js";
import { LazyStore } from "@tauri-apps/plugin-store";
import { createStore } from "solid-js/store";
import { useNavigate } from "@solidjs/router";
import { loginRequest, registerRequest, refreshTokenRequest } from "../api/auth";

const AuthTokenNames = {
  ACCESS_TOKEN_KEY: "access_token",
  REFRESH_TOKEN_KEY: "refresh_token",
} as const;

type AuthContextType = {
  isAuthenticated: () => boolean;
  loading: () => boolean;
  checkAuth: () => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  refreshToken: () => Promise<string | void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>();


export function AuthProvider(props: { children: any }) {
  const navigate = useNavigate();
  const store = new LazyStore(".auth.json");

  const [state, setState] = createStore({
    isAuthenticated: false,
    loading: true,
  });

  async function checkAuth() {
    const accessToken = await store.get<string>(AuthTokenNames.ACCESS_TOKEN_KEY);
    setState("isAuthenticated", !!accessToken);
    setState("loading", false);
  }

  async function login(email: string, password: string) {
    try {
      const { access_token, refresh_token } = await loginRequest(email, password);
      await store.set(AuthTokenNames.ACCESS_TOKEN_KEY, access_token);
      await store.set(AuthTokenNames.REFRESH_TOKEN_KEY, refresh_token);
      await store.save();
      setState("isAuthenticated", true);
      navigate("/");
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  }

  async function register(username: string, email: string, password: string) {
    try {
      await registerRequest(username, email, password);
      await login(email, password);
    } catch (error) {
      console.error("Registration failed:", error);
      throw error;
    }
  }

  async function refreshToken() {
    try {
      const refresh_token = await store.get<string>(AuthTokenNames.REFRESH_TOKEN_KEY);
      if (!refresh_token) throw new Error("No refresh token");

      const { access_token, refresh_token: new_refresh_token } = await refreshTokenRequest(refresh_token);
      await store.set(AuthTokenNames.ACCESS_TOKEN_KEY, access_token);
      await store.set(AuthTokenNames.REFRESH_TOKEN_KEY, new_refresh_token);
      await store.save();
      return access_token;
    } catch (error) {
      console.error("Token refresh failed:", error);
      logout();
    }
  }

  async function logout() {
    await store.delete(AuthTokenNames.ACCESS_TOKEN_KEY);
    await store.delete(AuthTokenNames.REFRESH_TOKEN_KEY);
    await store.save();
    setState("isAuthenticated", false);
    navigate("/login");
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: () => state.isAuthenticated,
        loading: () => state.loading,
        checkAuth,
        login,
        register,
        refreshToken,
        logout,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
}

// import { invoke } from '@tauri-apps/api/tauri';
import { userStore } from './userStore';

interface LoginData {
  email: string;
  password: string;
}

interface RegisterData extends LoginData {
  username: string;
}

export const auth = {
  async login({ email, password }: LoginData) {
    await userStore.setUser({
      email,
      isAuthenticated: true
    });
    return { success: true };
  },

  async register({ email, password, username }: RegisterData) {
    await userStore.setUser({
      email,
      username,
      isAuthenticated: true
    });
    return { success: true };
  },

  async logout() {
    await userStore.clearUser();
    return { success: true };
  }
};

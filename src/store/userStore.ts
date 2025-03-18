import { Store } from '@tauri-apps/plugin-store';
import { authApi } from '../api/auth';

interface User {
  email: string;
  username?: string;
  isAuthenticated: boolean;
}

class UserStore {
  private store: Store | null = null;

  private async getStore() {
    if (!this.store) {
      this.store = await Store.load('.settings.dat');
    }
    return this.store;
  }

  async getUser(): Promise<User | null> {
    const store = await this.getStore();
    return await store.get('user') || null;
  }

  private async setUser(user: User) {
    try {
      const store = await this.getStore();
      await store.set('user', user);
      await store.save();
    } catch (error) {
      console.error('Failed to set user:', error);
      throw error;
    }
  }

  async login(email: string, password: string) {
    const response = await authApi.login({ email, password });
    if (response.success) {
      await this.setUser(response.data);
      return true;
    }
    return false;
  }

  async register(email: string, password: string, username: string) {
    const response = await authApi.register({ email, password, username });
    if (response.success) {
      await this.setUser(response.data);
      return true;
    }
    return false;
  }

  async logout() {
    try {
      const store = await this.getStore();
      await store.set('user', { isAuthenticated: false });
      await store.save();
      return true;
    } catch (error) {
      console.error('Failed to logout:', error);
      return false;
    }
  }
}

export const userStore = new UserStore(); 
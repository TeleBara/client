import { authApi } from '../api/auth';
import { userApi } from '../api/user';
import { UserDTO } from './userStore';

interface AuthToken {
  accessToken: string;
  refreshToken: string;
}

export class AuthStore {
  private tokens: AuthToken | null = null;
  private userData: UserDTO | null = null;

  private async refreshTokenAndUser(): Promise<boolean> {
    if (!this.tokens?.refreshToken) return false;

    try {
      const tokens = await authApi.refresh(this.tokens.refreshToken);
      if (!tokens) return false;

      this.tokens = tokens;
      await this.fetchAndUpdateUser();
      return true;
    } catch {
      this.tokens = null;
      this.userData = null;
      return false;
    }
  }

  private async fetchAndUpdateUser(): Promise<boolean> {
    if (!this.tokens?.accessToken) return false;

    try {
      const userData = await userApi.getCurrentUser(this.tokens.accessToken);
      if (!userData) return false;

      this.userData = userData;
      return true;
    } catch (error) {
      if (error.response?.status === 401) {
        return this.refreshTokenAndUser();
      }
      return false;
    }
  }

  async login(email: string, password: string): Promise<boolean> {
    try {
      const tokens = await authApi.login({ email, password });
      if (!tokens) return false;

      this.tokens = tokens;
      return this.fetchAndUpdateUser();
    } catch {
      return false;
    }
  }

  async register(email: string, password: string, username: string): Promise<boolean> {
    try {
      const tokens = await authApi.register({ email, password, username });
      if (!tokens) return false;

      this.tokens = tokens;
      return this.fetchAndUpdateUser();
    } catch {
      return false;
    }
  }

  async logout(): Promise<void> {
    this.tokens = null;
    this.userData = null;
  }

  async isAuthenticated(): Promise<boolean> {
    if (!this.tokens || !this.userData) return false;
    return true;
  }

  getUserData(): UserDTO | null {
    return this.userData;
  }

  getAccessToken(): string | null {
    return this.tokens?.accessToken || null;
  }
}

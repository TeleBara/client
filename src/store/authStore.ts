import { authApi } from '../api/auth';
import { StoreDAO } from './dao/StoreDAO';

interface AuthToken {
  accessToken: string;
  refreshToken: string;
}

export class AuthStore {
  private tokens: AuthToken | null = null;
  private _storageDAO: StoreDAO;
  private _isAuthenticated: boolean = false;

  constructor(storageDAO: StoreDAO) {
    this._storageDAO = storageDAO;
    this.init();
  }

  private async init() {
    this.tokens = await this._storageDAO.get<AuthToken>('tokens');
    this._isAuthenticated = await this._storageDAO.get<boolean>('isAuthenticated') || false;
  }

  async isAuthenticated(): Promise<boolean> {
    return this._isAuthenticated;
  }

  async login(email: string, password: string): Promise<boolean> {
    const response = await authApi.login({ email, password });
    
    if (response.access && response.refresh) {
      this.tokens = {
        accessToken: response.access,
        refreshToken: response.refresh
      };
      await this._storageDAO.set('tokens', this.tokens);
      this._isAuthenticated = true;
      return true;
    }
    return false;
  }

  async register(email: string, password: string, username: string): Promise<boolean> {
    const response = await authApi.register({ email, password, username });
    
    if (response.access && response.refresh) {
        this.tokens = {
            accessToken: response.access,
            refreshToken: response.refresh
        };
        await this._storageDAO.set('tokens', this.tokens);
        this._isAuthenticated = true;
        return true;
    }
    return false;
  }

  async logout(): Promise<boolean> {
    try {
      this.tokens = null;
      await this._storageDAO.delete('tokens');
      await this._storageDAO.delete('isAuthenticated');
      return true;
    } catch (error) {
      console.error('Failed to logout:', error);
      return false;
    }
  }

  async verify(): Promise<boolean> {
    if (!this.tokens) return false;
    
    try {
      const isValid = await authApi.verify(this.tokens.accessToken);
      this._isAuthenticated = isValid;
      return isValid;
    } catch {
      return false;
    }
  }

  getAccessToken(): string | null {
    return this.tokens?.accessToken || null;
  }
}

import { AuthStore } from './authStore';

class GlobalStore {
  private static instance: GlobalStore;
  private _auth: AuthStore;

  private constructor() {
    this._auth = new AuthStore();
  }

  public static getInstance(): GlobalStore {
    if (!GlobalStore.instance) {
      GlobalStore.instance = new GlobalStore();
    }
    return GlobalStore.instance;
  }

  get auth() {
    return this._auth;
  }
}

export const globalStore = GlobalStore.getInstance(); 
import { Store } from '@tauri-apps/plugin-store';

export class StoreDAO {
  private store: Store | null = null;
  private initialized: boolean = false;

  async init() {
    if (!this.initialized) {
      this.store = await Store.load('.settings.dat');
      this.initialized = true;
    }
  }

  async get<T>(key: string): Promise<T | null> {
    await this.init();
    return await this.store?.get(key) || null;
  }

  async set<T>(key: string, value: T): Promise<void> {
    await this.init();
    await this.store?.set(key, value);
    await this.store?.save();
  }

  async delete(key: string): Promise<void> {
    await this.init();
    await this.store?.delete(key);
    await this.store?.save();
  }
} 
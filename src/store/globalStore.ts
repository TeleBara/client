import { AuthStore } from './authStore';
import { StoreDAO } from './dao/StoreDAO';
import { UserStore } from './userStore';

class GlobalStore {
    private _authStore: AuthStore;
    private _userStore: UserStore;

    constructor(
        authStore: AuthStore,
        userStore: UserStore
    ) {
        this._authStore = authStore;
        this._userStore = userStore;
    }

  get auth() {
    return this._authStore;
  }

  get user() {
    return this._userStore;
  }
}

export const globalStore = new GlobalStore(
    new AuthStore(new StoreDAO()),
    new UserStore(new StoreDAO()),
); 
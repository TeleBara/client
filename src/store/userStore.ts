import { StoreDAO } from './_storageDAO/StoreDAO';

export interface UserDTO {
  id: number;
  email: string;
  username: string;
  created_at: Date;
}

export class UserStore {
  private userInfo: UserDTO | null = null;
  private _storageDAO: StoreDAO;

  constructor(storageDAO: StoreDAO) {
    this._storageDAO = storageDAO;
    this.initUserInfo();
  }

  private async initUserInfo() {
    this.userInfo = await this._storageDAO.get<UserDTO>('userInfo');
  }

  async getUserDTO(): Promise<UserDTO | null> {
    return this.userInfo;
  }

  async setUserInfo(userInfo: UserDTO): Promise<void> {
    this.userInfo = userInfo;
    await this._storageDAO.set('userInfo', userInfo);
  }

  async clearUserInfo(): Promise<void> {
    this.userInfo = null;
    await this._storageDAO.delete('userInfo');
  }
}

interface LoginData {
  email: string;
  password: string;
}

interface RegisterData extends LoginData {
  username: string;
}

interface AuthToken {
  accessToken: string;
  refreshToken: string;
}

export const authApi = {
  async login({ email, password }: LoginData): Promise<AuthToken> {
    await new Promise(resolve => setTimeout(resolve, 500));
    return { 
      accessToken: 'mock_access_token',
      refreshToken: 'mock_refresh_token'
    };
  },

  async register({ email, password, username }: RegisterData): Promise<AuthToken> {
    await new Promise(resolve => setTimeout(resolve, 500));
    return { 
      accessToken: 'mock_access_token',
      refreshToken: 'mock_refresh_token'
    };
  },

  async refresh(refreshToken: string): Promise<AuthToken> {
    await new Promise(resolve => setTimeout(resolve, 500));
    return { 
      accessToken: 'new_mock_access_token',
      refreshToken: 'new_mock_refresh_token'
    };
  }
}; 
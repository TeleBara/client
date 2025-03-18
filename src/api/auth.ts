interface LoginData {
  email: string;
  password: string;
}

interface RegisterData extends LoginData {
  username: string;
}

interface AuthResponseDTO {
  access: string;
  refresh: string;
}

export const authApi = {
  async login({ email, password }: LoginData): Promise<AuthResponseDTO> {
    await new Promise<AuthResponseDTO>(resolve => setTimeout(resolve, 500));
    return { 
      access: 'asdasdas',
      refresh: 'asdas'
    };
  },

  async register({ email, password, username }: RegisterData): Promise<AuthResponseDTO> {
    await new Promise(resolve => setTimeout(resolve, 500));
    return { 
      access: 'asdasdas',
      refresh: 'asdas'
    };
  },

  async verify(accessToken: string): Promise<boolean> {
    await new Promise(resolve => setTimeout(resolve, 500));
    return true;
  }
}; 
interface LoginData {
  email: string;
  password: string;
}

interface RegisterData extends LoginData {
  username: string;
}

// Здесь будут реальные API-вызовы в будущем
export const authApi = {
  async login({ email, password }: LoginData) {
    // Имитация API-запроса
    await new Promise(resolve => setTimeout(resolve, 500));
    return { 
      success: true, 
      data: { email, isAuthenticated: true } 
    };
  },

  async register({ email, password, username }: RegisterData) {
    // Имитация API-запроса
    await new Promise(resolve => setTimeout(resolve, 500));
    return { 
      success: true, 
      data: { email, username, isAuthenticated: true } 
    };
  }
}; 
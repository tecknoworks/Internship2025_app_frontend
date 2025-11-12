import axiosInstance from '../config/axios';
import type { LoginRequest, RegisterRequest, AuthResponse } from '../../types/api';

class AuthService {
  private readonly BASE_PATH = '/auth';

  async login(credentials: LoginRequest): Promise<AuthResponse> {
    const { data } = await axiosInstance.post<AuthResponse>(
      `${this.BASE_PATH}/login`,
      credentials
    );
    
    if (data.token) {
      localStorage.setItem('authToken', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
    }
    
    return data;
  }

  async register(userData: RegisterRequest): Promise<AuthResponse> {
    const { data } = await axiosInstance.post<AuthResponse>(
      `${this.BASE_PATH}/register`,
      userData
    );
    
    if (data.token) {
      localStorage.setItem('authToken', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
    }
    
    return data;
  }

  async logout(): Promise<void> {
    try {
      await axiosInstance.post(`${this.BASE_PATH}/logout`);
    } finally {
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
    }
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('authToken');
  }

  getCurrentUser(): AuthResponse['user'] | null {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        return JSON.parse(userStr);
      } catch {
        return null;
      }
    }
    return null;
  }
}

export default new AuthService();

import { apiClient } from '../apiClient';
import { AuthResponse, LoginPayload, RefreshTokenResponse } from '../ServicesTypes';

export const loginService = async (email: string, password: string): Promise<AuthResponse> => {
  try {
    const payload: LoginPayload = { email, password };
    const response = await apiClient.post<AuthResponse>('/login', payload);
    return response.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || 'Login failed. Please try again.');
  }
};




export const refreshAccessTokenService = async (): Promise<RefreshTokenResponse> => {
  try {
    const response = await apiClient.post<RefreshTokenResponse>('/refresh-token', null);
    return response.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || 'Unable to refresh session.');
  }
};

export const logoutService = async (): Promise<void> => {
  try {
    await apiClient.post('/logout', {});
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || 'Logout failed. Please try again.');
  }
};

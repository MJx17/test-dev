import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import Cookies from 'js-cookie';
import {
  loginService,
  refreshAccessTokenService,
  logoutService,
} from '../services/authService';

interface User {
  _id: string;
  name: string;
  email: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  role: string | null;
  loading: boolean;
  error: string | null;
  success: string | null;
  roles: string[];

  initialize: () => void;
  login: (email: string, password: string) => Promise<void>;
  refreshAccessToken: () => Promise<void>;
  logout: () => Promise<void>;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      role: null,
      loading: false,
      error: null,
      success: null,
      roles: [],

      // Initialize state based on tokens
      initialize: () => {
        const accessToken = Cookies.get('accessToken');
        const refreshToken = Cookies.get('refreshToken');
        if (accessToken && refreshToken) {
          set({ isAuthenticated: true });
        }
      },

      // Login function
      login: async (email, password) => {
        set({ loading: true, error: null, success: null });
        try {
          const data =  await  loginService(email, password);
          Cookies.set('accessToken', data.accessToken, { expires: 1 / 24, path: '/' });
          Cookies.set('refreshToken', data.refreshToken, { expires: 7, path: '/' });
          set({
            isAuthenticated: true,
            user: data.user,
            role: data.role,
            success: 'Login successful!',
          });
        } catch (error: any) {
          set({ error: error.message || 'Login failed. Please try again.' });
        } finally {
          set({ loading: false });
        }
      },

   
      // Refresh access token
      refreshAccessToken: async () => {
        try {
          const data = await refreshAccessTokenService();
          Cookies.set('accessToken', data.accessToken, { expires: 1 / 24, path: '/' });
          set({ isAuthenticated: true });
        } catch (error: any) {
          set({ error: error.message || 'Unable to refresh session.' });
        }
      },

      // Logout function
      logout: async () => {
        try {
          await logoutService();
          Cookies.remove('accessToken', { path: '/' });
          Cookies.remove('refreshToken', { path: '/' });
          useAuthStore.persist.clearStorage();
          set({
            isAuthenticated: false,
            user: null,
            role: null,
            success: 'Logged out successfully!',
            error: null,
          });
        } catch (error: any) {
          set({ error: error.message || 'Logout failed. Please try again.' });
        }
      },
    }),
    {
      name: 'authStore',
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        user: state.user,
        role: state.role,
      }), // Persist only the essential authentication-related state
    }
  )
);

export default useAuthStore;

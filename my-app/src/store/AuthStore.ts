import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { loginService, logoutService } from '../services/authService';

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

  login: (email: string, password: string) => Promise<void>;
  checkAuth: () => Promise<void>;
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

      // Login function
      login: async (email, password) => {
        set({ loading: true, error: null, success: null });
        try {
          const data = await loginService(email, password); // Login via backend
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

      // Check authentication (e.g., on app load)
      checkAuth: async () => {
        try {
          const data = await fetch('/api/auth/check', { credentials: 'include' }); // Backend validates tokens
          if (data.ok) {
            const user = await data.json();
            set({ isAuthenticated: true, user });
          } else {
            set({ isAuthenticated: false, user: null });
          }
        } catch {
          set({ isAuthenticated: false, user: null });
        }
      },

      // Logout function
      logout: async () => {
        set({ loading: true, error: null, success: null });
        try {
          await logoutService(); // Backend handles token deletion
          set({ isAuthenticated: false, user: null, role: null, success: 'Logged out successfully!' });
        } catch (error: any) {
          set({ error: error.message || 'Logout failed. Please try again.' });
        } finally {
          set({ loading: false });
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
      }), // Persist essential user state
    }
  )
);

export default useAuthStore;

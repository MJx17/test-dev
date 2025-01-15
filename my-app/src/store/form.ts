import { create } from 'zustand';
import { fetchRoles, createUser } from '../services/service';

interface AdminSignupStore {
  role: string;
  email: string;
  password: string;
  name: string;
  error: string;
  roles: any[];
  loading: boolean;
  setRole: (role: string) => void;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  setName: (name: string) => void;
  setError: (error: string) => void;
  setRoles: (roles: any[]) => void;
  resetForm: () => void;
  fetchRolesData: () => Promise<void>;
  signupAdmin: () => Promise<void>;
}

const useAdminSignupStore = create<AdminSignupStore>((set, get) => ({
  role: '',
  email: '',
  password: '',
  name: '',
  error: '',
  roles: [],
  loading: false,
  setRole: (role) => set({ role }),
  setEmail: (email) => set({ email }),
  setPassword: (password) => set({ password }),
  setName: (name) => set({ name }),
  setError: (error) => set({ error }),
  setRoles: (roles) => set({ roles }),
  resetForm: () =>
    set({
      role: '',
      email: '',
      password: '',
      name: '',
      error: '',
    }),

  // Fetch roles data
  fetchRolesData: async () => {
    set({ loading: true });
    try {
      const rolesData = await fetchRoles();
      set({ roles: rolesData });
    } catch (err: any) {
      set({ error: 'Failed to load roles.' });
    } finally {
      set({ loading: false });
    }
  },

  // Create admin user
  signupAdmin: async () => {
    const { name, email, password, role, resetForm, setError } = get();
    set({ loading: true, error: '' });

    try {
      if (!email || !/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email)) {
        throw new Error('Invalid email address.');
      }

      if (!role) {
        throw new Error('Role is required.');
      }

      await createUser(name, email, password, role);
      resetForm();
    } catch (err: any) {
      setError(err.message || 'Failed to create the account. Please try again.');
    } finally {
      set({ loading: false });
    }
  },
}));

export default useAdminSignupStore;

import { create } from 'zustand';
import { createRole, getRoles, updateRole, deleteRole, getAllRoles } from '../services/roleService';
import { fetchRoles } from '../services/service';
import { toast } from 'react-toastify';
import { Role } from '../ServicesTypes';

interface RoleStore {
  roles: Role[]; // Array to store the fetched roles
  loading: boolean; // State for loading status
  error: string | null; // State for error messages
  fetchRoles: () => Promise<void>; // Function to fetch roles from the API
  addRole: (roleData: Omit<Role, '_id'>) => Promise<void>; // Function to create a new role
  updateRoleById: (roleId: string, roleData: Partial<Role>) => Promise<void>; // Function to update role by ID
  removeRole: (roleId: string) => Promise<void>; // Function to delete a role
  roleName: string;
  setRoleName: (title: string) => void;
  resetRoleName: () => void;
  getAllRoles: () => Promise<void>;
}

export const useRoleStore = create<RoleStore>((set) => ({
  roles: [],
  loading: false,
  error: null,
  roleName: '',

  setRoleName: (name: string) => set({ roleName: name }),
  resetRoleName: () => set({ roleName: '' }),

  fetchRoles: async () => {
    set({ loading: true, error: null });
    try {
      const roles = await fetchRoles();
      set({ roles, loading: false });
      toast.success('Roles fetched successfully!'); // Toast on success
    } catch (error) {
      set({ error: 'Failed to fetch roles', loading: false });
      toast.error('Failed to fetch roles');
    }
  },

  getAllRoles: async () => {
    set({ loading: true, error: null });
    try {
      const roles = await getRoles();
      set({ roles, loading: false });
      toast.success('Roles fetched successfully!'); // Toast on success
    } catch (error) {
      set({ error: 'Failed to fetch roles', loading: false });
      toast.error('Failed to fetch roles');
    }
  },

  addRole: async (roleData: Omit<Role, '_id'>) => {
    set({ loading: true, error: null });
    try {
      // Assume createRole is a function to send the API request
      const createdRole = await createRole({
        ...roleData,
        permissions: roleData.permissions || [] // Ensure permissions is always an array
      });
  
      set((state) => ({
        roles: [...state.roles, createdRole],
        loading: false,
      }));
  
      set({ roleName: '' }); // Reset the roleName in the state
      toast.success('Role added successfully!');
    } catch (error) {
      set({ error: 'Failed to create role', loading: false });
      toast.error('Failed to create role');
    }
  },
  

  updateRoleById: async (roleId: string, roleData: Partial<Role>) => {
    set({ loading: true, error: null });
    try {
      // Ensure required fields are provided before calling updateRole
      if (!roleData.name) {
        throw new Error('Role name is required.');
      }
  
      // Call the updateRole service with complete Role data
      await updateRole(roleId, roleData as Role);
  
      // Update the state
      set((state) => ({
        roles: state.roles.map((role) =>
          role._id === roleId ? { ...role, ...roleData } : role
        ),
        loading: false,
      }));
      toast.success('Role updated successfully!');
    } catch (error: any) {
      set({ error: error.message || 'Failed to update role', loading: false });
      toast.error(error.message || 'Failed to update role');
    }
  },
  

  removeRole: async (roleId: string) => {
    set({ loading: true, error: null });
    try {
      await deleteRole(roleId);
      set((state) => ({
        roles: state.roles.filter((role) => role._id !== roleId),
        loading: false,
      }));
      toast.success('Role deleted successfully!');
    } catch (error) {
      set({ error: 'Failed to delete role', loading: false });
      toast.error('Failed to delete role');
    }
  },
}));

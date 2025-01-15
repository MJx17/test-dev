import { create } from 'zustand';
import * as PermissionService from '../services/permissionService'; // Import the service functions
import { Permission } from '../ServicesTypes';
import { toast } from 'react-toastify'; // Import toast

// Define the Zustand store
export interface PermissionStore {
  permissions: Permission[];
  loading: boolean;
  error: string | null;
  fetchPermissions: () => Promise<void>;
  createPermission: (permissionData: Permission) => Promise<void>;
  updatePermission: (permissionId: string, updatedData: Permission) => Promise<void>;
  deletePermission: (permissionId: string) => Promise<void>;
}

export const usePermissionStore = create<PermissionStore>((set) => ({
  permissions: [],
  loading: false,
  error: null,

  // Fetch all permissions
  fetchPermissions: async () => {
    set({ loading: true, error: null });
    try {
      const permissions = await PermissionService.getPermissions(); // Use service function
      set({ permissions, loading: false });
      toast.success('Permissions fetched successfully!'); // Toast on success
    } catch (error) {
      set({ error: 'Error fetching permissions', loading: false });
      toast.error('Error fetching permissions'); // Toast on error
      console.error(error);
    }
  },

  // Create a new permission
  createPermission: async (permissionData: Permission) => {
    set({ loading: true, error: null });
    try {
      const newPermission = await PermissionService.createPermission(permissionData); // Use service function
      set((state) => ({
        permissions: [...state.permissions, newPermission],
        loading: false,
      }));
      toast.success('Permission created successfully!'); // Toast on success
    } catch (error) {
      set({ error: 'Error creating permission', loading: false });
      toast.error('Error creating permission'); // Toast on error
      console.error(error);
    }
  },

  // Update an existing permission
  updatePermission: async (permissionId: string, updatedData: Permission) => {
    set({ loading: true, error: null });
    try {
      const updatedPermission = await PermissionService.updatePermission(permissionId, updatedData); // Use service function
      set((state) => ({
        permissions: state.permissions.map((perm) =>
          perm._id === permissionId ? updatedPermission : perm
        ),
        loading: false,
      }));
      toast.success('Permission updated successfully!'); // Toast on success
    } catch (error) {
      set({ error: 'Error updating permission', loading: false });
      toast.error('Error updating permission'); // Toast on error
      console.error(error);
    }
  },

  // Delete a permission
  deletePermission: async (permissionId: string) => {
    set({ loading: true, error: null });
    try {
      await PermissionService.deletePermission(permissionId); // Use service function
      set((state) => ({
        permissions: state.permissions.filter((perm) => perm._id !== permissionId),
        loading: false,
      }));
      toast.success('Permission deleted successfully!'); // Toast on success
    } catch (error) {
      set({ error: 'Error deleting permission', loading: false });
      toast.error('Error deleting permission'); // Toast on error
      console.error(error);
    }
  },
}));

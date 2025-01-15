import { create } from "zustand";
import { addPermissionsToRole, removePermissionsFromRole } from "../services/roleService";
import { fetchRoles } from "../services/service"; // Adjust the import based on your file structure
import { getPermissions } from "../services/permissionService"; // Adjust the import based on your file structure

// Interface Imports
import { Role, Permission } from '../ServicesTypes';
import { toast } from "react-toastify";

interface RolePermissionStore {
  roles: Role[];
  allPermissions: Permission[];
  selectedRole: string;
  rolePermissions: string[];
  loading: boolean;
  error: string | null;
  rolesLoading: boolean;
  permissionsLoading: boolean;
  setRoles: (roles: Role[]) => void;
  setAllPermissions: (permissions: Permission[]) => void;
  setSelectedRole: (roleId: string) => void;
  setRolePermissions: (permissions: string[]) => void;
  loadRolesAndPermissions: () => Promise<void>;
  savePermissions: () => Promise<void>;
  setError: (message: string | null) => void;
}

export const useRolePermissionStore = create<RolePermissionStore>((set, get) => ({
  roles: [],
  allPermissions: [],
  selectedRole: "",
  rolePermissions: [],
  loading: false,
  error: null,
  rolesLoading: false,
  permissionsLoading: false,

  setRoles: (roles) => set({ roles }),
  setAllPermissions: (permissions) => set({ allPermissions: permissions }),
  setSelectedRole: (roleId) => set({ selectedRole: roleId }),
  setRolePermissions: (permissions) => set({ rolePermissions: permissions }),

  loadRolesAndPermissions: async () => {
    set({ rolesLoading: true, permissionsLoading: true });
    try {
      const fetchedRoles: Role[] = await fetchRoles(); // Specify the fetched roles type
      const fetchedPermissions: Permission[] = await getPermissions(); // Specify the fetched permissions type
      set({ roles: fetchedRoles, allPermissions: fetchedPermissions });
    } catch (error) {
      set({ error: "Failed to load data" });
      toast.error("Failed to load roles and permissions"); // Show error toast
    } finally {
      set({ rolesLoading: false, permissionsLoading: false });
    }
  },

  savePermissions: async () => {
    const { selectedRole, rolePermissions, roles, setError } = get();
    
    // Ensure a role is selected
    if (!selectedRole) {
      setError("No role selected");
      toast.error("No role selected"); // Show error toast
      return;
    }
  
    set({ loading: true });
    
    try {
      const currentPermissions = rolePermissions;
  
      // Find the selected role and safely access permissions
      const role = roles.find((r) => r._id === selectedRole);
      const roleExistingPermissions = role?.permissions
        ?.map((perm: Permission) => perm._id)
        .filter((id): id is string => !!id) || []; // Explicit type guard to filter undefined
  
      // Identify permissions to add and remove
      const permissionsToAdd = currentPermissions.filter(
        (permId) => !roleExistingPermissions.includes(permId)
      );
      const permissionsToRemove = roleExistingPermissions.filter(
        (permId) => !currentPermissions.includes(permId)
      );
  
      // Add new permissions
      if (permissionsToAdd.length > 0) {
        await addPermissionsToRole(selectedRole, permissionsToAdd);
      }
  
      // Remove unwanted permissions
      if (permissionsToRemove.length > 0) {
        await removePermissionsFromRole(selectedRole, permissionsToRemove);
      }
  
      setError(null);
      toast.success("Permissions updated successfully"); // Show success toast
    } catch (error) {
      setError("Failed to update permissions");
      toast.error("Failed to update permissions"); // Show error toast
    } finally {
      set({ loading: false });
    }
  },

  setError: (message) => set({ error: message }),
}));

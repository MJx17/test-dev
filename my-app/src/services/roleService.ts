
import { apiClient } from '../apiClient';
import { Role } from '../ServicesTypes';

// Define the Role interface directly in the service file

// Function to create a new role
export const createRole = async (roleData: Role): Promise<Role> => {
  try {
    const response = await apiClient.post('/create-roles', roleData); // Use apiClient here
    return response.data;
  } catch (error: any) {
    console.error('Error creating role:', error.response?.data || error.message);
    throw error;
  }
};

// Function to get all roles
export const getRoles = async (): Promise<Role[]> => {
  try {
    const response = await apiClient.get('/roles'); // Use apiClient here
    return response.data;
  } catch (error: any) {
    console.error('Error fetching roles:', error.response?.data || error.message);
    throw error;
  }
};


export const getAllRoles = async (): Promise<Role[]> => {
  try {
    const response = await apiClient.get('/roles/signup'); // Use apiClient here
    return response.data;
  } catch (error: any) {
    console.error('Error fetching roles:', error.response?.data || error.message);
    throw error;
  }
};


// Function to get a specific role by ID
export const getRoleById = async (roleId: string): Promise<Role | null> => {
  try {
    const response = await apiClient.get(`/roles/${roleId}`); // Use apiClient here
    return response.data;
  } catch (error: any) {
    console.error('Error fetching role by ID:', error.response?.data || error.message);
    throw error;
  }
};

// Function to update a role by ID
export const updateRole = async (roleId: string, roleData: Role): Promise<Role> => {
  try {
    const response = await apiClient.put(`/roles/${roleId}`, roleData); // Use apiClient here
    return response.data;
  } catch (error: any) {
    console.error('Error updating role:', error.response?.data || error.message);
    throw error;
  }
};

// Function to delete a role by ID
export const deleteRole = async (roleId: string): Promise<void> => {
  try {
    const response = await apiClient.delete(`/roles/${roleId}`); // Use apiClient here
    return response.data;
  } catch (error: any) {
    console.error('Error deleting role:', error.response?.data || error.message);
    throw error;
  }
};

// Function to add permissions to a role
export const addPermissionsToRole = async (roleId: string, permissions: string[]): Promise<any> => {
  try {
    const response = await apiClient.put(`/roles/${roleId}/permissions`, { permissions });
    return response.data;
  } catch (error: any) {
    console.error('Error adding permissions to role:', error.response?.data || error.message);
    throw error;
  }
};

// Function to remove permissions from a role
export const removePermissionsFromRole = async (roleId: string, permissions: string[]): Promise<any> => {
  try {
    const response = await apiClient.delete(`/roles/${roleId}/permissions`, { data: { permissions } });
    return response.data;
  } catch (error: any) {
    console.error('Error removing permissions from role:', error.response?.data || error.message);
    throw error;
  }
};

export const getUserRoleAndPermissions = async (userId: string): Promise<any> => {
  try {
    const response = await apiClient.get(`/users/${userId}/role-permissions`);
    return response.data;
  } catch (error: any) {
    console.error('Error fetching user role and permissions:', error.response?.data || error.message);
    throw error;
  }
};

// Function to assign a role to a user
export const assignRoleToUser = async (userId: string, roleId: string): Promise<any> => {
  try {
    const response = await apiClient.put(`/users/${userId}/role`, { roleId });
    return response.data;
  } catch (error: any) {
    console.error('Error assigning role to user:', error.response?.data || error.message);
    throw error;
  }
};

// Function to get user role and permissions


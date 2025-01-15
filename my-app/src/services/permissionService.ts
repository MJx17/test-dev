import { apiClient } from "../apiClient";
import { Permission } from '../ServicesTypes';
// Define the data type for a permission


// Function to create a permission
export const createPermission = async (permissionData: Permission) => {
  try {
    const response = await apiClient.post('/permissions', permissionData);
    return response.data; // { message, data }
  } catch (error) {
    console.error('Error creating permission:', error);
    throw new Error('Error creating permission');
  }
};

// Function to get all permissions
export const getPermissions = async (): Promise<Permission[]> => {
  try {
    const response = await apiClient.get('/permissions');
    return response.data; // Array of permissions
  } catch (error) {
    console.error('Error fetching permissions:', error);
    throw new Error('Error fetching permissions');
  }
};

// Function to get a specific permission by ID
export const getPermissionById = async (permissionId: string): Promise<Permission> => {
  try {
    const response = await apiClient.get(`/permissions/${permissionId}`);
    return response.data; // Single permission object
  } catch (error) {
    console.error('Error fetching permission by ID:', error);
    throw new Error('Error fetching permission');
  }
};

// Function to update a permission
export const updatePermission = async (permissionId: string, updatedData: Permission): Promise<Permission> => {
  try {
    const response = await apiClient.put(`/permissions/${permissionId}`, updatedData);
    return response.data; // { message, data }
  } catch (error) {
    console.error('Error updating permission:', error);
    throw new Error('Error updating permission');
  }
};

// Function to patch (partially update) a permission
export const patchPermission = async (permissionId: string, updatedData: Partial<Permission>): Promise<Permission> => {
  try {
    const response = await apiClient.patch(`/permissions/${permissionId}`, updatedData);
    return response.data; // { message, data }
  } catch (error) {
    console.error('Error patching permission:', error);
    throw new Error('Error patching permission');
  }
};

// Function to delete a permission
export const deletePermission = async (permissionId: string): Promise<{ message: string }> => {
  try {
    const response = await apiClient.delete(`/permissions/${permissionId}`);
    return response.data; // { message }
  } catch (error) {
    console.error('Error deleting permission:', error);
    throw new Error('Error deleting permission');
  }
};

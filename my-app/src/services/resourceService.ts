import { apiClient } from '../apiClient';
import { Resource } from '../ServicesTypes';

// Function to get all resources
export const getAllResources = async (): Promise<Resource[]> => {
  try {
    const response = await apiClient.get('/resources');
    return response.data;
  } catch (error: any) {
    console.error('Error fetching resources:', error.response?.data || error.message);
    throw error;
  }
};

// Function to create a new resource
export const createResource = async (resourceData: Omit<Resource, '_id' | 'createdAt' | 'updatedAt'>): Promise<Resource> => {
  try {
    const response = await apiClient.post('/resource', resourceData);
    return response.data;
  } catch (error: any) {
    console.error('Error creating resource:', error.response?.data || error.message);
    throw error;
  }
};

// Function to update a resource
export const updateResource = async (resourceId: string, resourceData: Omit<Resource, '_id' | 'createdAt' | 'updatedAt'>): Promise<Resource> => {
  try {
    const response = await apiClient.put(`/resources/${resourceId}`, resourceData);
    return response.data;
  } catch (error: any) {
    console.error('Error updating resource:', error.response?.data || error.message);
    throw error;
  }
};

// Function to delete a resource
export const deleteResource = async (resourceId: string): Promise<void> => {
  try {
    await apiClient.delete(`/resources/${resourceId}`);
  } catch (error: any) {
    console.error('Error deleting resource:', error.response?.data || error.message);
    throw error;
  }
};

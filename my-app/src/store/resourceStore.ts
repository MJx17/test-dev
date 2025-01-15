import {create} from 'zustand';
import { getAllResources, createResource, updateResource, deleteResource } from '../services/resourceService';
import { Resource } from '../ServicesTypes';

// Define the store interface
interface ResourceStore {
  resources: Resource[]; // List of resources
  loading: boolean; // Loading state for API requests
  error: string | null; // Error state for API requests

  // Action methods
  fetchResources: () => Promise<void>;
  addResource: (resourceData: Omit<Resource, '_id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  modifyResource: (resourceId: string, resourceData: Omit<Resource, '_id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  removeResource: (resourceId: string) => Promise<void>;
}

// Create the Zustand store
export const useResourceStore = create<ResourceStore>((set) => ({
  resources: [],
  loading: false,
  error: null,

  // Fetch all resources
  fetchResources: async () => {
    set({ loading: true, error: null });
    try {
      const resources = await getAllResources();
      set({ resources, loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  // Add a new resource
  addResource: async (resourceData) => {
    set({ loading: true, error: null });
    try {
      const newResource = await createResource(resourceData);
      set((state) => ({
        resources: [...state.resources, newResource],
        loading: false,
      }));
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  // Modify an existing resource
  modifyResource: async (resourceId, resourceData) => {
    set({ loading: true, error: null });
    try {
      const updatedResource = await updateResource(resourceId, resourceData);
      set((state) => ({
        resources: state.resources.map((resource) =>
          resource._id === resourceId ? updatedResource : resource
        ),
        loading: false,
      }));
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  // Remove a resource
  removeResource: async (resourceId) => {
    set({ loading: true, error: null });
    try {
      await deleteResource(resourceId);
      set((state) => ({
        resources: state.resources.filter((resource) => resource._id !== resourceId),
        loading: false,
      }));
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },
}));

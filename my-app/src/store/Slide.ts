import { create } from 'zustand';
import {
  createCarouselService,
  updateCarouselService,
  restoreCarouselService,
  softDeleteCarouselService,
  hardDeleteCarouselService,
  getActiveCarouselByIdService,
  getCarouselsService,
  getAllCarouselsService,
  getSoftDeletedCarouselByIdService,
  softDeleteAllCarouselsService,
  hardDeleteAllCarouselsService
} from '../services/slideService'; // Import API services
import { Carousel } from '../ServicesTypes';

interface CarouselState {
  title: string;
  description: string;
  imageUrl: string | File | null;
  carousels: Carousel[]; // Now using the Carousel type
  softDeletedCarousels: Carousel[]; // Now using the Carousel type
  activeCarousel: Carousel | null; // Now using the Carousel type
  loading: boolean; // New loading state to track requests

  setTitle: (title: string) => void;
  setDescription: (description: string) => void;
  setImageUrl: (imageUrl: string | File | null) => void;
  resetForm: () => void;
  submitCarouselForm: (image: File) => Promise<void>;
  updateCarousel: (id: string, data: any, image?: File) => Promise<void>;
  restoreCarousel: (id: string) => Promise<void>;
  softDeleteCarousel: (id: string) => Promise<void>;
  hardDeleteCarousel: (id: string) => Promise<void>;
  hardDeleteAllCarousels: () => Promise<void>;
  softDeleteAllCarousel: () => Promise<void>;
  getActiveCarouselById: (id: string) => Promise<void>;
  getCarousels: () => Promise<void>;
  getAllCarousels: () => Promise<void>;
  getSoftDeletedCarouselById: (id: string) => Promise<void>;
}

// Define your Zustand store with Carousel types
const useCarouselStore = create<CarouselState>((set) => ({
  title: '',
  description: '',
  imageUrl: '',
  carousels: [], // Now using the Carousel type
  softDeletedCarousels: [], // Now using the Carousel type
  activeCarousel: null, // Now using the Carousel type
  loading: false, // Initial loading state

  setImageUrl: (imageUrl: string | File | null) => set({ imageUrl }),
  setTitle: (title: string) => set({ title }),
  setDescription: (description: string) => set({ description }),

  resetForm: () => set({
    title: '',
    description: '',
    imageUrl: null,
  }),

  submitCarouselForm: async (image: File) => {
    const { title, description, resetForm, getAllCarousels, getCarousels } = useCarouselStore.getState();

    if (!title || !description || !image) {
      alert('Title, description, and image are required.');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('imageUrl', image);

    set({ loading: true }); // Set loading to true before making the request

    try {
      const response = await createCarouselService(formData);
      if (response.imageUrl) {
        set({ imageUrl: response.imageUrl });
        resetForm();
        getCarousels();
        getAllCarousels();
      }
    } catch (error) {
      console.error('Failed to create carousel:', error);
    } finally {
      set({ loading: false }); // Set loading to false after the request is complete
    }
  },

  updateCarousel: async (id: string, data: any, image?: File) => {
    set({ loading: true }); // Set loading to true before making the request
    try {
      const formData = new FormData();

      // Only append data if it has been updated
      if (data.title !== undefined && data.title !== '') {
        formData.append('title', data.title);
      }

      if (data.description !== undefined && data.description !== '') {
        formData.append('description', data.description);
      }

      // Append image if provided or use existing imageUrl
      if (image) {
        formData.append('imageUrl', image);
      } else if (data.imageUrl) {
        formData.append('imageUrl', data.imageUrl);
      }

      const response = await updateCarouselService(id, formData);
      console.log('Carousel updated:', response);
    } catch (error) {
      console.error('Failed to update carousel:', error);
    } finally {
      set({ loading: false }); // Set loading to false after the request is complete
    }
  },

  restoreCarousel: async (id) => {
    set({ loading: true });
    try {
      const response = await restoreCarouselService(id);
      console.log('Carousel restored:', response);
    } catch (error) {
      console.error('Failed to restore carousel:', error);
    } finally {
      set({ loading: false });
    }
  },

  softDeleteCarousel: async (id) => {
    set({ loading: true });
    try {
      const response = await softDeleteCarouselService(id);
      console.log('Carousel soft deleted:', response);
    } catch (error) {
      console.error('Failed to soft delete carousel:', error);
    } finally {
      set({ loading: false });
    }
  },

  hardDeleteCarousel: async (id) => {
    set({ loading: true });
    try {
      const response = await hardDeleteCarouselService(id);
      console.log('Carousel hard deleted:', response);
    } catch (error) {
      console.error('Failed to hard delete carousel:', error);
    } finally {
      set({ loading: false });
    }
  },

  getActiveCarouselById: async (id) => {
    set({ loading: true });
    try {
      const response = await getActiveCarouselByIdService(id);
      set({ activeCarousel: response });
      console.log('Fetched active carousel by ID:', response);
    } catch (error) {
      console.error('Failed to fetch active carousel by ID:', error);
    } finally {
      set({ loading: false });
    }
  },

  getCarousels: async () => {
    set({ loading: true });
    try {
      const response = await getCarouselsService();
      set({ carousels: response });
      console.log('Fetched carousels:', response);
    } catch (error) {
      console.error('Failed to fetch carousels:', error);
    } finally {
      set({ loading: false });
    }
  },

  getAllCarousels: async () => {
    set({ loading: true });
    try {
      const response = await getAllCarouselsService();
      set({ carousels: response });
      console.log('Fetched all carousels (including soft deleted):', response);
    } catch (error) {
      console.error('Failed to fetch all carousels:', error);
    } finally {
      set({ loading: false });
    }
  },

  getSoftDeletedCarouselById: async (id) => {
    set({ loading: true });
    try {
      const response = await getSoftDeletedCarouselByIdService(id);
      console.log('Fetched soft-deleted carousel by ID:', response);
    } catch (error) {
      console.error('Failed to fetch soft-deleted carousel by ID:', error);
    } finally {
      set({ loading: false });
    }
  },

  softDeleteAllCarousel: async (): Promise<void> => {
    set({ loading: true });
    try {
      await softDeleteAllCarouselsService();
      console.log('Successfully soft-deleted all carousels');
    } catch (error) {
      console.error('Failed to soft delete all carousels:', error);
    } finally {
      set({ loading: false });
    }
  },

  hardDeleteAllCarousels: async (): Promise<void> => {
    set({ loading: true });
    try {
      await hardDeleteAllCarouselsService();
      console.log('Successfully hard-deleted all carousels');
    } catch (error) {
      console.error('Failed to hard delete all carousels:', error);
    } finally {
      set({ loading: false });
    }
  },
}));

export default useCarouselStore;

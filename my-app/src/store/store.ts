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
} from '../services/slideService'; // Import API services
import {Carousel} from '../ServicesTypes';

interface CarouselState {
  title: string;
  description: string;
  imageUrl: string | File | null;
  carousels: Carousel[]; // Now using the Carousel type
  softDeletedCarousels: Carousel[]; // Now using the Carousel type
  activeCarousel: Carousel | null; // Now using the Carousel type

  setTitle: (title: string) => void;
  setDescription: (description: string) => void;
  setImageUrl: (imageUrl: string | File | null) => void;
  resetForm: () => void;
  submitCarouselForm: (image: File) => Promise<void>;
  updateCarousel: (id: string, data: any, image?: File) => Promise<void>;
  restoreCarousel: (id: string) => Promise<void>;
  softDeleteCarousel: (id: string) => Promise<void>;
  hardDeleteCarousel: (id: string) => Promise<void>;
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
  setImageUrl: (imageUrl: string | File | null) => set({ imageUrl }),
  setTitle: (title: string) => set({ title }),
  setDescription: (description: string) => set({ description }),

  resetForm: () => set({
    title: '',
    description: '',
    imageUrl: null,
  }),

  submitCarouselForm: async (image: File) => {
    const { title, description, resetForm, getAllCarousels, getCarousels, } = useCarouselStore.getState();

    if (!title || !description || !image) {
      alert('Title, description, and image are required.');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('imageUrl', image);

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
    }
  },

  updateCarousel: async (id: string, data: any, image?: File) => {
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
    }
  },
  

  restoreCarousel: async (id) => {
    try {
      const response = await restoreCarouselService(id);
      console.log('Carousel restored:', response);
    } catch (error) {
      console.error('Failed to restore carousel:', error);
    }
  },

  softDeleteCarousel: async (id) => {
    try {
      const response = await softDeleteCarouselService(id);
      console.log('Carousel soft deleted:', response);
    } catch (error) {
      console.error('Failed to soft delete carousel:', error);
    }
  },

  hardDeleteCarousel: async (id) => {
    try {
      const response = await hardDeleteCarouselService(id);
      console.log('Carousel hard deleted:', response);
    } catch (error) {
      console.error('Failed to hard delete carousel:', error);
    }
  },

  getActiveCarouselById: async (id) => {
    try {
      const response = await getActiveCarouselByIdService(id);
      set({ activeCarousel: response });
      console.log('Fetched active carousel by ID:', response);
    } catch (error) {
      console.error('Failed to fetch active carousel by ID:', error);
    }
  },

  getCarousels: async () => {
    try {
      const response = await getCarouselsService();
      set({ carousels: response });
      console.log('Fetched carousels:', response);
    } catch (error) {
      console.error('Failed to fetch carousels:', error);
    }
  },

  getAllCarousels: async () => {
    try {
      const response = await getAllCarouselsService();
      set({ carousels: response });
      console.log('Fetched all carousels (including soft deleted):', response);
    } catch (error) {
      console.error('Failed to fetch all carousels:', error);
    }
  },

  getSoftDeletedCarouselById: async (id) => {
    try {
      const response = await getSoftDeletedCarouselByIdService(id);
      console.log('Fetched soft-deleted carousel by ID:', response);
    } catch (error) {
      console.error('Failed to fetch soft-deleted carousel by ID:', error);
    }
  },
}));

export default useCarouselStore;

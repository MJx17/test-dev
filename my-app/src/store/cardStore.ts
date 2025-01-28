import { create } from 'zustand';
import {
  createNoticeCardService,
  updateNoticeCardService,
  restoreNoticeCardService,
  softDeleteNoticeCardService,
  hardDeleteNoticeCardService,
  getActiveNoticeCardByIdService,
  getNoticeCardsService,
  getAllNoticeCardsService,
  getSoftDeletedNoticeCardByIdService,
  softDeleteAllNoticeCardsService,
  hardDeleteAllNoticeCardsService
} from '../services/cardService'; // Import API services
import { NoticeCard } from '../ServicesTypes';

interface NoticeCardState {
  title: string;
  description: string;
  imageUrl: string | File | null;
  noticecards: NoticeCard[]; // Now using the NoticeCard type
  softDeletedNoticeCards: NoticeCard[]; // Now using the NoticeCard type
  activeNoticeCard: NoticeCard | null; // Now using the NoticeCard type
  loading: boolean; // New loading state to track requests

  setTitle: (title: string) => void;
  setDescription: (description: string) => void;
  setImageUrl: (imageUrl: string | File | null) => void;
  resetForm: () => void;
  CreateNoticeCard: (image: File) => Promise<void>;
  updateNoticeCard: (id: string, data: any, image?: File) => Promise<void>;
  restoreNoticeCard: (id: string) => Promise<void>;
  softDeleteNoticeCard: (id: string) => Promise<void>;
  hardDeleteNoticeCard: (id: string) => Promise<void>;
  hardDeleteAllNoticeCards: () => Promise<void>;
  softDeleteAllNoticeCard: () => Promise<void>;
  getActiveNoticeCardById: (id: string) => Promise<void>;
  getNoticeCards: () => Promise<void>;
  getAllNoticeCards: () => Promise<void>;
  getSoftDeletedNoticeCardById: (id: string) => Promise<void>;
}

// Define your Zustand store with NoticeCard types
const useNoticeCardStore = create<NoticeCardState>((set) => ({
  title: '',
  description: '',
  imageUrl: '',
  noticecards: [], // Now using the NoticeCard type
  softDeletedNoticeCards: [], // Now using the NoticeCard type
  activeNoticeCard: null, // Now using the NoticeCard type
  loading: false, // Initial loading state

  setImageUrl: (imageUrl: string | File | null) => set({ imageUrl }),
  setTitle: (title: string) => set({ title }),
  setDescription: (description: string) => set({ description }),

  resetForm: () => set({
    title: '',
    description: '',
    imageUrl: null,
  }),

  CreateNoticeCard: async (image: File) => {
    const { title, description, resetForm, getAllNoticeCards, getNoticeCards } = useNoticeCardStore.getState();

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
      const response = await createNoticeCardService(formData);
      if (response.imageUrl) {
        set({ imageUrl: response.imageUrl });
        resetForm();
        getNoticeCards();
        getAllNoticeCards();
      }
    } catch (error) {
      console.error('Failed to create NoticeCard:', error);
    } finally {
      set({ loading: false }); // Set loading to false after the request is complete
    }
  },

  updateNoticeCard: async (id: string, data: any, image?: File) => {
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

      const response = await updateNoticeCardService(id, formData);
      console.log('NoticeCard updated:', response);
    } catch (error) {
      console.error('Failed to update NoticeCard:', error);
    } finally {
      set({ loading: false }); // Set loading to false after the request is complete
    }
  },

  restoreNoticeCard: async (id) => {
    set({ loading: true });
    try {
      const response = await restoreNoticeCardService(id);
      console.log('NoticeCard restored:', response);
    } catch (error) {
      console.error('Failed to restore NoticeCard:', error);
    } finally {
      set({ loading: false });
    }
  },

  softDeleteNoticeCard: async (id) => {
    set({ loading: true });
    try {
      const response = await softDeleteNoticeCardService(id);
      console.log('NoticeCard soft deleted:', response);
    } catch (error) {
      console.error('Failed to soft delete NoticeCard:', error);
    } finally {
      set({ loading: false });
    }
  },

  hardDeleteNoticeCard: async (id) => {
    set({ loading: true });
    try {
      const response = await hardDeleteNoticeCardService(id);
      console.log('NoticeCard hard deleted:', response);
    } catch (error) {
      console.error('Failed to hard delete NoticeCard:', error);
    } finally {
      set({ loading: false });
    }
  },

  getActiveNoticeCardById: async (id) => {
    set({ loading: true });
    try {
      const response = await getActiveNoticeCardByIdService(id);
      set({ activeNoticeCard: response });
      console.log('Fetched active NoticeCard by ID:', response);
    } catch (error) {
      console.error('Failed to fetch active NoticeCard by ID:', error);
    } finally {
      set({ loading: false });
    }
  },

  getNoticeCards: async () => {
    set({ loading: true });
    try {
      const response = await getNoticeCardsService();
      set({ noticecards: response });
      console.log('Fetched NoticeCards:', response);
    } catch (error) {
      console.error('Failed to fetch NoticeCards:', error);
    } finally {
      set({ loading: false });
    }
  },

  getAllNoticeCards: async () => {
    set({ loading: true });
    try {
      const response = await getAllNoticeCardsService();
      set({ noticecards: response });
      console.log('Fetched all NoticeCards (including soft deleted):', response);
    } catch (error) {
      console.error('Failed to fetch all NoticeCards:', error);
    } finally {
      set({ loading: false });
    }
  },

  getSoftDeletedNoticeCardById: async (id) => {
    set({ loading: true });
    try {
      const response = await getSoftDeletedNoticeCardByIdService(id);
      console.log('Fetched soft-deleted NoticeCard by ID:', response);
    } catch (error) {
      console.error('Failed to fetch soft-deleted NoticeCard by ID:', error);
    } finally {
      set({ loading: false });
    }
  },

  softDeleteAllNoticeCard: async (): Promise<void> => {
    set({ loading: true });
    try {
      await softDeleteAllNoticeCardsService();
      console.log('Successfully soft-deleted all NoticeCards');
    } catch (error) {
      console.error('Failed to soft delete all NoticeCards:', error);
    } finally {
      set({ loading: false });
    }
  },

  hardDeleteAllNoticeCards: async (): Promise<void> => {
    set({ loading: true });
    try {
      await hardDeleteAllNoticeCardsService();
      console.log('Successfully hard-deleted all NoticeCards');
    } catch (error) {
      console.error('Failed to hard delete all NoticeCards:', error);
    } finally {
      set({ loading: false });
    }
  },
}));

export default useNoticeCardStore;

import axios from 'axios';
import { NoticeCard }from '../ServicesTypes';
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

// Type definition for NoticeCard


// Handle API errors
const handleApiError = (error: any, defaultMessage: string) => {
  console.error(error);
  if (axios.isAxiosError(error) && error.response) {
    throw new Error(error.response.data.error || defaultMessage);
  }
  throw new Error(defaultMessage);
};

// Fetch all active NoticeCards (excluding soft deleted)
export const getNoticeCardsService = async (): Promise<NoticeCard[]> => {
  try {
    const response = await axios.get(`${API_URL}/cards`, { withCredentials: true });
    return response.data;
  } catch (error) {
    throw handleApiError(error, 'Failed to fetch NoticeCards');
  }
};

// Fetch all NoticeCards (including soft deleted)
export const getAllNoticeCardsService = async (): Promise<NoticeCard[]> => {
  try {
    const response = await axios.get(`${API_URL}/card/deleted`, { withCredentials: true });
    return response.data;
  } catch (error) {
    throw handleApiError(error, 'Failed to fetch all NoticeCards');
  }
};

// Fetch a soft-deleted NoticeCard by ID
export const getSoftDeletedNoticeCardByIdService = async (id: string): Promise<NoticeCard> => {
  try {
    const response = await axios.get(`${API_URL}/card/soft-deleted/${id}`, { withCredentials: true });
    return response.data;
  } catch (error) {
    throw handleApiError(error, 'Failed to fetch soft-deleted NoticeCard');
  }
};

// Fetch an active NoticeCard by ID
export const getActiveNoticeCardByIdService = async (id: string): Promise<NoticeCard> => {
  try {
    const response = await axios.get(`${API_URL}/card/active/${id}`, { withCredentials: true });
    return response.data;
  } catch (error) {
    throw handleApiError(error, 'Failed to fetch active NoticeCard');
  }
};

// Create a new NoticeCard
export const createNoticeCardService = async (formData: FormData): Promise<NoticeCard> => {
  try {
    const response = await axios.post(`${API_URL}/create-card`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw handleApiError(error, 'Failed to create NoticeCard');
  }
};

// Update an existing NoticeCard
export const updateNoticeCardService = async (id: string, formData: FormData): Promise<NoticeCard> => {
  try {
    const response = await axios.put(`${API_URL}/card/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw handleApiError(error, 'Failed to update NoticeCard');
  }
};

// Restore a soft-deleted NoticeCard
export const restoreNoticeCardService = async (id: string): Promise<NoticeCard> => {
  try {
    const response = await axios.put(`${API_URL}/card/restore/${id}`, null, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw handleApiError(error, 'Failed to restore NoticeCard');
  }
};

// Soft delete a NoticeCard
export const softDeleteNoticeCardService = async (id: string): Promise<{ message: string }> => {
  try {
    const response = await axios.delete(`${API_URL}/card/delete/${id}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw handleApiError(error, 'Failed to soft delete NoticeCard');
  }
};

// Hard delete a NoticeCard
export const hardDeleteNoticeCardService = async (id: string): Promise<{ message: string }> => {
  try {
    const response = await axios.delete(`${API_URL}/card/hardDel/${id}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw handleApiError(error, 'Failed to hard delete NoticeCard');
  }
};


// Soft delete all NoticeCards
export const softDeleteAllNoticeCardsService = async (): Promise<{ message: string }> => {
  try {
    const response = await axios.delete(`${API_URL}/card/soft-delete-all`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw handleApiError(error, 'Failed to soft delete all NoticeCards');
  }
};

// Hard delete all NoticeCards
export const hardDeleteAllNoticeCardsService = async (): Promise<{ message: string }> => {
  try {
    const response = await axios.delete(`${API_URL}/card/hard-delete-all`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw handleApiError(error, 'Failed to hard delete all NoticeCards');
  }
};

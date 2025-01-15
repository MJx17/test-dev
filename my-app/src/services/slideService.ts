import axios from 'axios';
import { Carousel }from '../ServicesTypes';
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

// Type definition for Carousel


// Handle API errors
const handleApiError = (error: any, defaultMessage: string) => {
  console.error(error);
  if (axios.isAxiosError(error) && error.response) {
    throw new Error(error.response.data.error || defaultMessage);
  }
  throw new Error(defaultMessage);
};

// Fetch all active carousels (excluding soft deleted)
export const getCarouselsService = async (): Promise<Carousel[]> => {
  try {
    const response = await axios.get(`${API_URL}/carousels`, { withCredentials: true });
    return response.data;
  } catch (error) {
    throw handleApiError(error, 'Failed to fetch carousels');
  }
};

// Fetch all carousels (including soft deleted)
export const getAllCarouselsService = async (): Promise<Carousel[]> => {
  try {
    const response = await axios.get(`${API_URL}/carousel/deleted`, { withCredentials: true });
    return response.data;
  } catch (error) {
    throw handleApiError(error, 'Failed to fetch all carousels');
  }
};

// Fetch a soft-deleted carousel by ID
export const getSoftDeletedCarouselByIdService = async (id: string): Promise<Carousel> => {
  try {
    const response = await axios.get(`${API_URL}/carousel/soft-deleted/${id}`, { withCredentials: true });
    return response.data;
  } catch (error) {
    throw handleApiError(error, 'Failed to fetch soft-deleted carousel');
  }
};

// Fetch an active carousel by ID
export const getActiveCarouselByIdService = async (id: string): Promise<Carousel> => {
  try {
    const response = await axios.get(`${API_URL}/carousel/active/${id}`, { withCredentials: true });
    return response.data;
  } catch (error) {
    throw handleApiError(error, 'Failed to fetch active carousel');
  }
};

// Create a new carousel
export const createCarouselService = async (formData: FormData): Promise<Carousel> => {
  try {
    const response = await axios.post(`${API_URL}/create-carousel`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw handleApiError(error, 'Failed to create carousel');
  }
};

// Update an existing carousel
export const updateCarouselService = async (id: string, formData: FormData): Promise<Carousel> => {
  try {
    const response = await axios.put(`${API_URL}/carousel/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw handleApiError(error, 'Failed to update carousel');
  }
};

// Restore a soft-deleted carousel
export const restoreCarouselService = async (id: string): Promise<Carousel> => {
  try {
    const response = await axios.put(`${API_URL}/carousel/restore/${id}`, null, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw handleApiError(error, 'Failed to restore carousel');
  }
};

// Soft delete a carousel
export const softDeleteCarouselService = async (id: string): Promise<{ message: string }> => {
  try {
    const response = await axios.delete(`${API_URL}/carousel/delete/${id}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw handleApiError(error, 'Failed to soft delete carousel');
  }
};

// Hard delete a carousel
export const hardDeleteCarouselService = async (id: string): Promise<{ message: string }> => {
  try {
    const response = await axios.delete(`${API_URL}/carousel/hardDel/${id}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw handleApiError(error, 'Failed to hard delete carousel');
  }
};


// Soft delete all carousels
export const softDeleteAllCarouselsService = async (): Promise<{ message: string }> => {
  try {
    const response = await axios.delete(`${API_URL}/carousels/soft-delete-all`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw handleApiError(error, 'Failed to soft delete all carousels');
  }
};

// Hard delete all carousels
export const hardDeleteAllCarouselsService = async (): Promise<{ message: string }> => {
  try {
    const response = await axios.delete(`${API_URL}/carousels/hard-delete-all`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw handleApiError(error, 'Failed to hard delete all carousels');
  }
};

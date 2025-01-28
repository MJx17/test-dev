import { apiClient } from "../apiClient";
import { ExchangeRate, NewExchangeRate } from "../ServicesTypes";

// Function to create an exchange rate
export const createExchangeRate = async (
  exchangeRateData: NewExchangeRate
): Promise<ExchangeRate> => {
  try {
    const response = await apiClient.post<ExchangeRate>('/exchange-rates', exchangeRateData);
    return response.data;
  } catch (error) {
    console.error('Error creating exchange rate:', error);
    throw new Error('Failed to create exchange rate.');
  }
};

// Function to get all exchange rates
export const getExchangeRates = async (): Promise<ExchangeRate[]> => {
  try {
    const response = await apiClient.get<ExchangeRate[]>('/exchange-rates');
    return response.data;
  } catch (error) {
    console.error('Error fetching exchange rates:', error);
    throw new Error('Failed to fetch exchange rates.');
  }
};

export const getAllExchangeRates = async (): Promise<ExchangeRate[]> => {
  try {
    const response = await apiClient.get<ExchangeRate[]>('/exchange-rates/deleted');
    return response.data;
  } catch (error) {
    console.error('Error fetching exchange rates:', error);
    throw new Error('Failed to fetch exchange rates.');
  }
};
 

// Function to get an exchange rate by ID
export const getExchangeRateById = async (id: string): Promise<ExchangeRate> => {
  try {
    const response = await apiClient.get<ExchangeRate>(`/exchange-rates/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching exchange rate by ID:', error);
    throw new Error('Failed to fetch exchange rate by ID.');
  }
};

// Function to update an exchange rate by ID
export const updateExchangeRate = async (
  id: string,
  exchangeRateData: Partial<ExchangeRate>
): Promise<ExchangeRate> => {
  try {
    const response = await apiClient.put<ExchangeRate>(`/exchange-rates/${id}`, exchangeRateData);
    return response.data;
  } catch (error) {
    console.error('Error updating exchange rate:', error);
    throw new Error('Failed to update exchange rate.');
  }
};

// Function to delete an exchange rate by ID (soft delete)
export const deleteExchangeRate = async (id: string): Promise<{ message: string }> => {
  try {
    const response = await apiClient.delete<{ message: string }>(`/exchange-rates/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting exchange rate:', error);
    throw new Error('Failed to delete exchange rate.');
  }
};

// Function to restore a soft-deleted exchange rate by ID
export const restoreExchangeRate = async (id: string): Promise<ExchangeRate> => {
  try {
    const response = await apiClient.put<ExchangeRate>(`/exchange-rates/restore/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error restoring exchange rate:', error);
    throw new Error('Failed to restore exchange rate.');
  }
};

// Function to hard delete an exchange rate by ID (permanent delete)
export const hardDeleteExchangeRate = async (id: string): Promise<{ message: string }> => {
  try {
    const response = await apiClient.delete<{ message: string }>(`/exchange-rates/hard-delete/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error permanently deleting exchange rate:', error);
    throw new Error('Failed to permanently delete exchange rate.');
  }
};

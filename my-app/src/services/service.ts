// src/services/adminSignupService.ts

import { apiClient } from '../apiClient';

export const fetchRoles = async () => {
  try {
    const response = await apiClient.get(`/roles`, {
      withCredentials: true, // Include credentials in the request
    });
    return response.data;
  } catch (err) {
    throw new Error('Failed to load roles');
  }
};

export const createUser = async (name: string, email: string, password: string, role: string) => {
  try {
    await apiClient.post(
      `/create-user`,
      { name, email, password, roleName: role },
      { withCredentials: true, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err) {
    throw new Error('Account creation failed');
  }
};

// Login and Auth Types
export interface AuthResponse {
  success: boolean;
  accessToken: string;
  refreshToken: string;
  user: {
    _id: string;
    name: string;
    email: string;
  };
  role: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface SignupPayload {
  name: string;
  email: string;
  password: string;
  role: string;
}

export interface RefreshTokenResponse {
  accessToken: string;
}

// Roles and Permissions
export interface Role {
  _id?: string; // Unique identifier for the role (optional for new roles)
  name: string; // Name of the role
  permissions: Permission[]; // List of permissions associated with the role
  createdAt?: string; // Timestamp when the role was created (optional for new roles)
  updatedAt?: string; // Timestamp when the role was last updated (optional for new roles)
}

export interface Permission {
  _id?: string;
  name: string;
  category: string;
  description: string;
  createdAt?: string; // Optional timestamps for consistency
  updatedAt?: string; // Optional timestamps for consistency
}

export interface RoleResponse {
  success: boolean;
  roles: Role[];
}

// Resource Types
export interface Resource {
  _id?: string; // Unique identifier for the resource (optional for new resources)
  route: string; // The route of the resource
  method: string; // The HTTP method (GET, POST, etc.) of the resource
  roles: string[]; // MongoDB ObjectId references
  permissions: string[]; // MongoDB ObjectId references
  createdAt?: string; // Timestamp when the resource was created (optional for new resources)
  updatedAt?: string; // Timestamp when the resource was last updated (optional for new resources)
}

// Carousel Types
export interface Carousel {
  _id: string;
  title: string;
  description: string;
  imageUrl: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null; // Optional to track soft delete
}


export interface NoticeCard {
  _id: string;
  title: string;
  description: string;
  imageUrl: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null; // Optional to track soft delete
}
//Rate Types


export interface ExchangeRate {
  _id: string; // Unique identifier for the resource (optional for new resources)
  currency: string | null;
  value: number;
  selling_rate: number;
  countryCode?: string;
  deletedAt?: string | null; // Optional to track soft delete
  createdAt: string; // Timestamp when the resource was created (optional for new resources)
  updatedAt: string; // Timestamp when the resource was last updated (optional for new resources)
  
}


export type NewExchangeRate = {
  currency: string | null;
  value: number;
  selling_rate: number;
  countryCode?: string;
  symbol?: string;
};


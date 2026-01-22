import { API_CONFIG } from '../constants';
import type {
  DonationRecord,
  Fund,
  NewsItem,
  NoticeItem,
  Project,
  SiteConfig,
  Volunteer,
  Category,
} from '../types';

// Pagination response type
export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

const API_BASE = API_CONFIG.BASE_URL;

// Helper for fetch with error handling
async function fetchAPI<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const token = localStorage.getItem('authToken');
  const headers = {
    ...options.headers,
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  const config = {
    ...options,
    headers,
  };

  const url = endpoint.startsWith('http') ? endpoint : `${API_BASE}${endpoint}`;
  const response = await fetch(url, config);
  
  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`API Error: ${response.status} ${response.statusText} - ${errorBody}`);
  }
  return response.json();
}

// =============================================
// UPLOAD API
// =============================================
export const UploadAPI = {
  async uploadImage(file: File): Promise<string> {
    const formData = new FormData();
    formData.append('file', file);
    
    // We use fetch directly here because we need to handle FormData differently
    // and fetchAPI might try to set Content-Type to application/json if we standardized it there
    // But actually fetchAPI is generic enough, let's try to use it but we need to ensure headers are correct.
    // Fetch automatically sets Content-Type for FormData, so we shouldn't set it manually.
    
    const token = localStorage.getItem('authToken');
    const headers: HeadersInit = token ? { Authorization: `Bearer ${token}` } : {};

    const response = await fetch(`${API_CONFIG.UPLOAD_URL}`, {
      method: 'POST',
      headers,
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Upload failed: ${response.status}`);
    }

    const data = await response.json();
    return data.url;
  }
};


// =============================================
// PROJECTS API
// =============================================
export const ProjectsAPI = {
  async getAll(page?: number, limit?: number): Promise<Project[]> {
    // Backward compatible: if no pagination params, return all data
    if (!page && !limit) {
      const response = await fetchAPI<Project[] | PaginatedResponse<Project>>('/projects');
      // Handle both old and new response formats
      return Array.isArray(response) ? response : response.data;
    }

    // With pagination
    const response = await fetchAPI<PaginatedResponse<Project>>(
      `/projects?page=${page}&limit=${limit}`
    );
    return response.data;
  },

  async getAllPaginated(page: number = 1, limit: number = 10): Promise<PaginatedResponse<Project>> {
    return fetchAPI<PaginatedResponse<Project>>(`/projects?page=${page}&limit=${limit}`);
  },

  async getById(id: string): Promise<Project | null> {
    try {
      return await fetchAPI<Project>(`/projects/${id}`);
    } catch (e) {
      console.error(`Error fetching project by ID ${id}:`, e);
      return null;
    }
  },

  async create(data: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>): Promise<Project> {
    return fetchAPI<Project>('/projects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
  },

  async update(id: string, data: Partial<Project>): Promise<Project> {
    return fetchAPI<Project>(`/projects/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
  },

  async delete(id: string): Promise<void> {
    await fetchAPI<void>(`/projects/${id}`, { method: 'DELETE' });
  },
};

// =============================================
// FUNDS API
// =============================================
export const FundsAPI = {
  async getAll(): Promise<Fund[]> {
    return fetchAPI<Fund[]>('/funds');
  },
  async getById(id: string): Promise<Fund | null> {
    // Assuming backend might not have specific endpoint yet or we reuse getAll
    const all = await this.getAll();
    return all.find((f) => f.id === id) || null;
  },
  async create(data: Omit<Fund, 'id'>): Promise<Fund> {
    return fetchAPI<Fund>('/funds', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
  },
  async update(id: string, data: Partial<Fund>): Promise<Fund> {
    return fetchAPI<Fund>(`/funds/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
  },
  async delete(id: string): Promise<void> {
    await fetchAPI<void>(`/funds/${id}`, { method: 'DELETE' });
  },
};

// =============================================
// NEWS API
// =============================================
export const NewsAPI = {
  async getAll(page?: number, limit?: number, category?: string): Promise<NewsItem[]> {
    // Backward compatible: if no pagination params, return all data
    if (!page && !limit) {
      const response = await fetchAPI<NewsItem[] | PaginatedResponse<NewsItem>>('/news');
      return Array.isArray(response) ? response : response.data;
    }

    // With pagination
    let url = `/news?page=${page}&limit=${limit}`;
    if (category) url += `&category=${category}`;

    const response = await fetchAPI<PaginatedResponse<NewsItem>>(url);
    return response.data;
  },

  async getAllPaginated(
    page: number = 1,
    limit: number = 10,
    category?: string
  ): Promise<PaginatedResponse<NewsItem>> {
    let url = `/news?page=${page}&limit=${limit}`;
    if (category) url += `&category=${category}`;
    return fetchAPI<PaginatedResponse<NewsItem>>(url);
  },

  async getById(id: string): Promise<NewsItem | null> {
    try {
      return await fetchAPI<NewsItem>(`/news/${id}`);
    } catch (e) {
      return null;
    }
  },

  async create(data: Omit<NewsItem, 'id'>): Promise<NewsItem> {
    return fetchAPI<NewsItem>('/news', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
  },

  async update(id: string, data: Partial<NewsItem>): Promise<NewsItem> {
    return fetchAPI<NewsItem>(`/news/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
  },

  async delete(id: string): Promise<void> {
    await fetchAPI<void>(`/news/${id}`, { method: 'DELETE' });
  },
};

// =============================================
// DONATIONS API
// =============================================
export const DonationsAPI = {
  async getAll(limit: number = 100): Promise<DonationRecord[]> {
    const res = await fetchAPI<any[]>('/donations');
    // Map backend response to frontend DonationRecord type
    return res.map((item) => ({
      id: item.id,
      date: item.createdAt ? item.createdAt.split('T')[0] : new Date().toISOString().split('T')[0],
      donor: item.donorName || 'Anonymous',
      amount: Number(item.amount),
      projectTitle: item.projectTitle || 'General',
      payType: item.paymentMethod || 'Unknown',
      channel: 'Online', // Default as backend doesn't store this yet
    }));
  },

  async getRecent(): Promise<DonationRecord[]> {
    return this.getAll();
  },

  async create(data: Omit<DonationRecord, 'id'>): Promise<DonationRecord> {
    const res = await fetchAPI<any>('/donations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        donorName: data.donor,
        amount: data.amount,
        message: 'Donation',
        paymentMethod: data.payType,
      }),
    });

    // Backend now returns the full object with correct mapping
    return {
      id: res.id,
      date: res.createdAt ? res.createdAt.split('T')[0] : new Date().toISOString().split('T')[0],
      donor: res.donorName || 'Anonymous',
      amount: Number(res.amount),
      projectTitle: res.projectTitle || 'General',
      payType: res.paymentMethod || 'Unknown',
      channel: 'Online',
    };
  },

  async getTotalRaised(): Promise<number> {
    const res = await fetchAPI<{ total: number }>('/stats/total-raised');
    return res.total;
  },
};

// =============================================
// VOLUNTEERS API
// =============================================
export const VolunteersAPI = {
  async getAll(): Promise<Volunteer[]> {
    return fetchAPI<Volunteer[]>('/volunteers');
  },

  async create(data: Omit<Volunteer, 'id' | 'status' | 'joinedAt'>): Promise<Volunteer> {
    return fetchAPI<Volunteer>('/volunteers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
  },

  async updateStatus(id: number, status: string): Promise<void> {
    await fetchAPI<void>(`/volunteers/${id}/status`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
  },

  async delete(id: number): Promise<void> {
    await fetchAPI<void>(`/volunteers/${id}`, { method: 'DELETE' });
  },
};

// =============================================
// NOTICES API
// =============================================
export const NoticesAPI = {
  async getActive(): Promise<NoticeItem[]> {
    return fetchAPI<NoticeItem[]>('/notices/active');
  },

  async getAll(): Promise<NoticeItem[]> {
    return fetchAPI<NoticeItem[]>('/notices');
  },

  async create(data: Omit<NoticeItem, 'id'>): Promise<NoticeItem> {
    return fetchAPI<NoticeItem>('/notices', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
  },

  async update(id: string, data: Partial<NoticeItem>): Promise<void> {
    await fetchAPI<void>(`/notices/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
  },

  async delete(id: string): Promise<void> {
    await fetchAPI<void>(`/notices/${id}`, { method: 'DELETE' });
  },
};

// =============================================
// AUTH API
// =============================================
export const AuthAPI = {
  async login(
    username: string,
    password: string
  ): Promise<{ success: boolean; token?: string; user?: any }> {
    try {
      const res = await fetchAPI<{ token: string; user: any }>('/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      if (res.token) {
        return { success: true, token: res.token, user: res.user };
      }
      return { success: false };
    } catch (e) {
      console.error('Login failed', e);
      return { success: false };
    }
  },

  async register(data: any): Promise<{ success: boolean; message?: string }> {
    try {
      const res = await fetchAPI<{ message: string; user: any }>('/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      return { success: true, message: res.message };
    } catch (e: any) {
      console.error('Registration failed', e);
      // Extract error message from the Error object we threw in fetchAPI
      return { success: false, message: e.message };
    }
  },

  async verifyToken(token: string): Promise<{ valid: boolean; user?: any }> {
    try {
      const res = await fetchAPI<{ valid: boolean; user: any }>('/auth/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      });
      return res;
    } catch (e) {
      console.error('Token verification failed', e);
      return { valid: false };
    }
  },
};

// =============================================
// SITE CONFIG API
// =============================================
export const SiteConfigAPI = {
  async getConfig(): Promise<SiteConfig | null> {
    try {
      return await fetchAPI<SiteConfig>('/site-config');
    } catch (e) {
      return null;
    }
  },

  async get(): Promise<SiteConfig | null> {
    return this.getConfig();
  },

  async updateConfig(config: SiteConfig): Promise<void> {
    await fetchAPI<void>('/site-config', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(config),
    });
  },

  async update(config: SiteConfig): Promise<void> {
    return this.updateConfig(config);
  },
};

// =============================================
// CATEGORIES API
// =============================================
export const CategoriesAPI = {
  async getAll(): Promise<Category[]> {
    return fetchAPI<Category[]>('/categories');
  },

  async getById(id: number): Promise<Category | null> {
    try {
      return await fetchAPI<Category>(`/categories/${id}`);
    } catch (e) {
      console.error(`Error fetching category by ID ${id}:`, e);
      return null;
    }
  },

  async create(data: Omit<Category, 'id'>): Promise<Category> {
    return fetchAPI<Category>('/categories', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
  },

  async update(id: number, data: Partial<Category>): Promise<Category> {
    return fetchAPI<Category>(`/categories/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
  },

  async delete(id: number): Promise<void> {
    await fetchAPI<void>(`/categories/${id}`, { method: 'DELETE' });
  },
};

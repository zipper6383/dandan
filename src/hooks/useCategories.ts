import { useState, useEffect } from 'react';
import { Category } from '../types';
import { CategoriesAPI } from '../services/api';

export const useCategories = (type?: 'news' | 'project' | 'download') => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        setLoading(true);
        const data = await CategoriesAPI.getAll();

        // Filter by type if specified
        const filtered = type ? data.filter((cat) => cat.type === type) : data;

        // Sort by sortOrder
        const sorted = filtered.sort((a, b) => a.sortOrder - b.sortOrder);

        setCategories(sorted);
        setError(null);
      } catch (err: any) {
        console.error('Failed to load categories:', err);
        setError(err.message || 'Failed to load categories');
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, [type]);

  return { categories, loading, error };
};

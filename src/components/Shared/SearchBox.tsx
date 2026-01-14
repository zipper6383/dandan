import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';

interface SearchBoxProps {
  className?: string;
  placeholder?: string;
}

export const SearchBox: React.FC<SearchBoxProps> = ({
  className = '',
  placeholder = '搜索项目、新闻、基金...',
}) => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
      setQuery('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`relative ${className}`}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
      />
      <button
        type="submit"
        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-primary transition-colors"
      >
        <Search size={20} />
      </button>
    </form>
  );
};

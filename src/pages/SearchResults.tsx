import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { SEO } from '../components/Shared/SEO';
import { Loading } from '../components/Shared/Loading';
import { Search } from 'lucide-react';

interface SearchResult {
  id: string;
  title: string;
  image?: string;
  description?: string;
  summary?: string;
  category?: string;
  type: 'project' | 'news' | 'fund';
  raised?: number;
  target?: number;
  sponsor?: string;
  date?: string;
}

const SearchResults: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const typeFilter = searchParams.get('type') || 'all';

  const [results, setResults] = useState<{
    projects: SearchResult[];
    news: SearchResult[];
    funds: SearchResult[];
    all: SearchResult[];
    total: number;
  }>({
    projects: [],
    news: [],
    funds: [],
    all: [],
    total: 0,
  });
  const [loading, setLoading] = useState(false);
  const [searchInput, setSearchInput] = useState(query);

  const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api';

  useEffect(() => {
    if (query) {
      performSearch(query, typeFilter);
    }
  }, [query, typeFilter]);

  const performSearch = async (q: string, type: string) => {
    setLoading(true);
    try {
      const typeParam = type !== 'all' ? `&type=${type}` : '';
      const response = await fetch(`${API_BASE}/search?q=${encodeURIComponent(q)}${typeParam}`);
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setSearchParams({ q: searchInput.trim(), type: typeFilter });
    }
  };

  const handleTypeFilter = (type: string) => {
    setSearchParams({ q: query, type });
  };

  const getResultLink = (result: SearchResult) => {
    switch (result.type) {
      case 'project':
        return `/projects/${result.id}`;
      case 'news':
        return `/news/detail/${result.id}`;
      case 'fund':
        return `/funds/${result.id}`;
      default:
        return '#';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'project':
        return '项目';
      case 'news':
        return '新闻';
      case 'fund':
        return '基金';
      default:
        return '';
    }
  };

  const displayResults =
    typeFilter === 'all'
      ? results.all
      : (results[typeFilter as keyof typeof results] as SearchResult[]);

  return (
    <div className="bg-bgBlock py-8 min-h-screen">
      <SEO title={`搜索: ${query}`} description={`搜索结果: ${query}`} />

      <div className="w-container mx-auto">
        {/* Search Header */}
        <div className="bg-white p-8 rounded-lg shadow-sm mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">搜索</h1>

          {/* Search Form */}
          <form onSubmit={handleSearch} className="mb-6">
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder="搜索项目、新闻、基金..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                />
                <Search
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
              </div>
              <button
                type="submit"
                className="px-8 py-3 bg-primary text-white rounded-lg hover:bg-secondary transition-colors"
              >
                搜索
              </button>
            </div>
          </form>

          {/* Type Filters */}
          <div className="flex gap-2">
            {[
              { value: 'all', label: '全部' },
              { value: 'projects', label: '项目' },
              { value: 'news', label: '新闻' },
              { value: 'funds', label: '基金' },
            ].map((filter) => (
              <button
                key={filter.value}
                onClick={() => handleTypeFilter(filter.value)}
                className={`px-4 py-2 rounded-full text-sm transition-all ${
                  typeFilter === filter.value
                    ? 'bg-primary text-white shadow-md'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* Results */}
        {loading ? (
          <Loading />
        ) : (
          <div className="bg-white p-8 rounded-lg shadow-sm">
            <div className="mb-6">
              <h2 className="text-lg font-bold text-gray-800">
                搜索结果
                {query && (
                  <span className="text-gray-500 font-normal ml-2">
                    关于 "{query}" 的结果 ({results.total} 条)
                  </span>
                )}
              </h2>
            </div>

            {displayResults && displayResults.length > 0 ? (
              <div className="space-y-6">
                {displayResults.map((result) => (
                  <div
                    key={`${result.type}-${result.id}`}
                    className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-all group"
                  >
                    <div className="flex gap-4">
                      {/* Image */}
                      {result.image && (
                        <div className="w-48 h-32 shrink-0 overflow-hidden rounded">
                          <Link to={getResultLink(result)}>
                            <img
                              src={result.image}
                              alt={result.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          </Link>
                        </div>
                      )}

                      {/* Content */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <Link to={getResultLink(result)}>
                            <h3 className="text-lg font-bold text-gray-800 group-hover:text-primary transition-colors">
                              {result.title}
                            </h3>
                          </Link>
                          <span className="text-xs px-2 py-1 bg-blue-100 text-blue-600 rounded shrink-0 ml-2">
                            {getTypeLabel(result.type)}
                          </span>
                        </div>

                        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                          {result.description || result.summary || '暂无描述'}
                        </p>

                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          {result.category && (
                            <span className="flex items-center gap-1">
                              <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                              {result.category}
                            </span>
                          )}
                          {result.raised !== undefined && (
                            <span className="text-red-600 font-bold">
                              已筹: ￥{result.raised.toLocaleString()}
                            </span>
                          )}
                          {result.sponsor && <span>冠名: {result.sponsor}</span>}
                          {result.date && <span>{result.date}</span>}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <svg
                  className="w-16 h-16 mx-auto mb-4 text-gray-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <p className="text-gray-400">
                  {query ? `没有找到与 "${query}" 相关的结果` : '请输入搜索关键词'}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResults;

import React, { memo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

// Contexts
import { useAuth } from '../../contexts/AuthContext';
import { useSiteConfig } from '../../contexts/SiteConfigContext';

// Services & Constants
import { UI_CONFIG } from '../../constants';
import { NAV_ITEMS } from '../../services/mockData';

const Header: React.FC = memo(() => {
  const location = useLocation();
  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);
  const { config } = useSiteConfig();
  const { isAuthenticated, user, logout } = useAuth();

  const isActive = (path: string): boolean => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="w-full bg-white">
      {/* Top Bar - Show auth links on mobile, full bar on desktop */}
      <div className="w-full border-b border-gray-100 bg-white">
        <div className="w-container mx-auto flex justify-between items-center h-[40px]">
          {/* Welcome text - hidden on mobile */}
          <div className="text-textSub text-sm hidden md:block">您好，欢迎来到长安慈善会！！！</div>

          {/* Auth links - always visible with proper padding */}
          <div className="text-textSub text-xs md:text-sm flex gap-2 items-center ml-auto pr-3 md:pr-0">
            {isAuthenticated && user ? (
              <>
                <span className="text-gray-900">欢迎, {user.username}</span>
                <span className="text-gray-300">|</span>
                {user.role === 'admin' && (
                  <Link to="/admin" className="hover:text-primary transition-colors py-2 px-1">
                    管理后台
                  </Link>
                )}
                {user.role === 'admin' && <span className="text-gray-300">|</span>}
                <button onClick={logout} className="hover:text-primary transition-colors py-2 px-1">
                  退出
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="hover:text-primary transition-colors py-2 px-1">
                  登录
                </Link>
                <span>|</span>
                <Link to="/register" className="hover:text-primary transition-colors py-2 px-1">
                  注册
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Banner Area - Hidden on mobile, shown on desktop */}
      <div className="w-full hidden md:block">
        <div className="w-full relative" style={{ height: `${UI_CONFIG.HEADER_HEIGHT}px` }}>
          <img
            src="/images/changan.png"
            alt="Header Banner"
            className="w-full h-full object-fill"
          />
        </div>
      </div>

      {/* Navigation - Specific Red Background */}
      <nav className="w-full bg-primary relative z-50 transition-all duration-300">
        <div
          className="w-container mx-auto flex items-center justify-between"
          style={{ minHeight: `${UI_CONFIG.NAV_HEIGHT}px` }}
        >
          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white p-2"
            onClick={() => setHoveredMenu(hoveredMenu === 'mobile' ? null : 'mobile')}
          >
            {hoveredMenu === 'mobile' ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex justify-end w-full">
            {(config.navigation || NAV_ITEMS).map((item) => (
              <li
                key={item.id}
                className="relative group w-[150px] text-center"
                onMouseEnter={() => setHoveredMenu(item.id)}
                onMouseLeave={() => setHoveredMenu(null)}
              >
                <Link
                  to={item.path}
                  className={`block text-white text-[16px] font-bold tracking-wide transition-colors duration-200 ${
                    isActive(item.path) ? 'bg-secondary' : 'hover:bg-hoverRed'
                  }`}
                  style={{ lineHeight: `${UI_CONFIG.NAV_HEIGHT}px` }}
                >
                  {item.label}
                </Link>

                {item.children && hoveredMenu === item.id && (
                  <ul className="absolute top-full left-0 w-full bg-white shadow-lg z-50 border border-t-0 border-gray-200">
                    {item.children.map((child) => (
                      <li key={child.id} className="border-b border-gray-100 last:border-0">
                        <Link
                          to={child.path}
                          className="block py-2 px-0 text-center text-[#333] hover:text-white hover:bg-hoverRed text-[14px] transition-colors"
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Mobile Navigation Menu */}
        {hoveredMenu === 'mobile' && (
          <div className="md:hidden bg-primary w-full border-t border-secondary animate-fadeIn">
            <ul className="flex flex-col w-full">
              {(config.navigation || NAV_ITEMS).map((item) => (
                <li key={item.id} className="border-b border-secondary last:border-0">
                  <Link
                    to={item.path}
                    className={`block text-white text-[16px] font-bold py-3 px-4 ${
                      isActive(item.path) ? 'bg-secondary' : ''
                    }`}
                    onClick={() => setHoveredMenu(null)}
                  >
                    {item.label}
                  </Link>
                  {item.children && (
                    <ul className="bg-white">
                      {item.children.map((child) => (
                        <li key={child.id} className="border-b border-gray-100 last:border-0">
                          <Link
                            to={child.path}
                            className="block py-3 px-8 text-[#333] hover:text-primary text-[14px]"
                            onClick={() => setHoveredMenu(null)}
                          >
                            - {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
});

Header.displayName = 'Header';

export default Header;

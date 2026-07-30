import { useState, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Navbar, AuthModal, Footer } from '@/components/Navigation';
import Views from '@/components/Views';
import type { ViewType, SearchFilters } from '@/types';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewType>('landing');
  const [viewParams, setViewParams] = useState<Record<string, string>>({});
  const [authOpen, setAuthOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<SearchFilters>({
    query: '',
    category: 'all',
    location: '',
    minPrice: 0,
    maxPrice: 100000,
    minRating: 0,
    availableOnly: false,
    sortBy: 'rating',
  });

  const handleNavigate = useCallback((view: ViewType, params?: Record<string, string>) => {
    setCurrentView(view);
    if (params) setViewParams(params);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleSearch = useCallback(() => {
    setCurrentView('search');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleFilterChange = useCallback((partial: Partial<SearchFilters>) => {
    setFilters(prev => ({ ...prev, ...partial }));
  }, []);

  const handleLogin = useCallback(() => {
    setIsLoggedIn(true);
  }, []);

  const isLanding = currentView === 'landing';

  return (
    <div className="flex min-h-screen flex-col bg-white text-gray-900 antialiased">
      <Navbar
        currentView={currentView}
        onNavigate={handleNavigate}
        onOpenAuth={() => setAuthOpen(true)}
        isLoggedIn={isLoggedIn}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        filters={filters}
        onFilterChange={handleFilterChange}
        onSearch={handleSearch}
      />

      <main className="flex-1">
        <AnimatePresence mode="wait">
          <Views
            key={currentView + (viewParams.id || '')}
            currentView={currentView}
            viewParams={viewParams}
            onNavigate={handleNavigate}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            filters={filters}
            onFilterChange={handleFilterChange}
            onSearch={handleSearch}
          />
        </AnimatePresence>
      </main>

      {isLanding && <Footer />}

      <AuthModal
        open={authOpen}
        onClose={() => setAuthOpen(false)}
        onLogin={handleLogin}
      />
    </div>
  );
}
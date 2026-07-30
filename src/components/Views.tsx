import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, MapPin, Star, X, Check, ChevronDown, ChevronRight,
  User, Phone, Mail, Calendar, Clock, ThumbsUp, Briefcase,
  Wrench, Zap, Droplets, PaintBucket, Hammer, Building2, SprayCan,
  Sparkles, ArrowRight, Filter, SlidersHorizontal, Menu as MenuIcon,
  Eye, MessageCircle, Share2, AlertTriangle, Settings, CreditCard,
  Bell, LogOut, HelpCircle, Home, Plus, Clock3, CheckCircle2,
  XCircle, Loader2, ArrowUpRight, Quote
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { BRAND_NAME, BRAND_TAGLINE, ARTISANS, CATEGORIES, SAMPLE_BOOKINGS, SAMPLE_USER, CITIES } from '@/constants';
import type { ViewType, Artisan, SearchFilters, Booking } from '@/types';

/* ─── Utility Components ─── */
const categoryIcon = (id: string, className = 'h-4 w-4') => {
  const icons: Record<string, React.ReactNode> = {
    electrical: <Zap className={className} />,
    plumbing: <Droplets className={className} />,
    painting: <PaintBucket className={className} />,
    carpentry: <Hammer className={className} />,
    mechanics: <Wrench className={className} />,
    construction: <Building2 className={className} />,
    cleaning: <SprayCan className={className} />,
  };
  return icons[id] || <Wrench className={className} />;
};

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
};

function StarRating({ rating, size = 'sm' }: { rating: number; size?: 'sm' | 'md' }) {
  const s = size === 'md' ? 'h-4 w-4' : 'h-3.5 w-3.5';
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={`${s} ${i < Math.floor(rating) ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}`} />
      ))}
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { label: string; cls: string }> = {
    Confirmed: { label: 'Confirmed', cls: 'bg-emerald-100 text-emerald-800 border-emerald-200' },
    Pending: { label: 'Pending', cls: 'bg-amber-50 text-amber-700 border-amber-200' },
    Completed: { label: 'Completed', cls: 'bg-blue-50 text-blue-700 border-blue-200' },
    Cancelled: { label: 'Cancelled', cls: 'bg-red-50 text-red-700 border-red-200' },
  };
  const s = map[status] || { label: status, cls: 'bg-gray-100 text-gray-600 border-gray-200' };
  return <span className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium ${s.cls}`}>{s.label}</span>;
}

/* ─── LANDING PAGE ─── */
function LandingView({ onNavigate, onSearch, searchQuery, onSearchChange, filters, onFilterChange }: {
  onNavigate: (v: ViewType, p?: Record<string, string>) => void;
  onSearch: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  filters: SearchFilters;
  onFilterChange: (f: Partial<SearchFilters>) => void;
}) {
  const topArtisans = ARTISANS.filter(a => a.rating >= 4.7).slice(0, 4);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-900 via-emerald-800 to-emerald-950">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAyNHYySDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-40" />
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mx-auto max-w-3xl text-center">
            <Badge className="mb-4 border-amber-300/30 bg-amber-400/15 text-amber-200">
              <Sparkles className="mr-1 h-3 w-3" /> Trusted by 10,000+ Nigerians
            </Badge>
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Find <span className="bg-gradient-to-r from-amber-300 to-amber-400 bg-clip-text text-transparent">skilled artisans</span> near you
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-lg text-emerald-200">{BRAND_TAGLINE}</p>

            {/* Hero Search */}
            <div className="mx-auto mt-8 max-w-2xl">
              <div className="flex flex-col gap-3 sm:flex-row">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                  <Input
                    value={searchQuery}
                    onChange={e => onSearchChange(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && onSearch()}
                    placeholder="Search for electricians, plumbers, painters..."
                    className="h-13 rounded-xl border-0 bg-white pl-12 text-base shadow-lg ring-1 ring-white/20"
                  />
                </div>
                <Button onClick={onSearch} size="lg" className="h-13 rounded-xl bg-amber-500 px-8 text-base font-semibold text-emerald-950 hover:bg-amber-400">
                  Search <ArrowRight className="ml-1 h-5 w-5" />
                </Button>
              </div>
              <div className="mt-4 flex flex-wrap justify-center gap-2 text-sm text-emerald-300">
                <span className="text-emerald-400">Popular:</span>
                {CATEGORIES.filter(c => c.id !== 'all').slice(0, 5).map(c => (
                  <button key={c.id} onClick={() => { onFilterChange({ category: c.id }); onNavigate('search'); }} className="rounded-full bg-white/10 px-3 py-1 text-emerald-200 transition-colors hover:bg-white/20">{c.name}</button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* How It Works */}
      <section className="relative bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center">
            <h2 className="text-3xl font-bold text-emerald-900">How It Works</h2>
            <p className="mt-2 text-gray-500">Find, book, and get your job done in three simple steps.</p>
          </motion.div>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {[
              { icon: Search, step: '01', title: 'Search & Browse', desc: 'Find skilled artisans near you by category, rating, or location. Read reviews and compare.' },
              { icon: Calendar, step: '02', title: 'Book & Confirm', desc: 'Select your preferred artisan, choose a time, and confirm your booking in seconds.' },
              { icon: ThumbsUp, step: '03', title: 'Get It Done', desc: 'The artisan arrives, completes the job, and you rate your experience. Simple as that!' },
            ].map((item, i) => (
              <motion.div key={item.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }} className="group relative rounded-2xl border border-emerald-100 bg-white p-6 text-center shadow-sm transition-all hover:shadow-md hover:border-emerald-200">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700 transition-colors group-hover:bg-emerald-100">
                  <item.icon className="h-8 w-8" />
                </div>
                <span className="text-xs font-bold tracking-widest text-emerald-400">{item.step}</span>
                <h3 className="mt-2 text-lg font-semibold text-emerald-900">{item.title}</h3>
                <p className="mt-2 text-sm text-gray-500">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Top Artisans */}
      <section className="bg-emerald-50/50 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold text-emerald-900">Top Rated Artisans</h2>
              <p className="mt-1 text-gray-500">Our highest-rated professionals ready to serve you.</p>
            </div>
            <Button onClick={() => onNavigate('search')} variant="outline" className="hidden border-emerald-200 text-emerald-700 hover:bg-emerald-50 sm:flex">
              View All <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {topArtisans.map(artisan => (
              <motion.button key={artisan.id} onClick={() => onNavigate('artisan-detail', { id: artisan.id })} whileHover={{ y: -4 }} className="group overflow-hidden rounded-2xl border border-emerald-100 bg-white text-left shadow-sm transition-all hover:shadow-md">
                <div className="relative h-36 overflow-hidden bg-emerald-100">
                  <img src={artisan.coverImage} alt={artisan.name} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  <div className="absolute bottom-3 left-3 flex items-center gap-2">
                    <img src={artisan.avatar} alt="" className="h-10 w-10 rounded-full border-2 border-white" />
                    <div className="text-white">
                      <p className="text-sm font-semibold leading-tight">{artisan.name}</p>
                      <p className="text-xs text-white/80">{artisan.profession}</p>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-1 text-sm">
                    <StarRating rating={artisan.rating} />
                    <span className="ml-1 font-medium text-gray-700">{artisan.rating}</span>
                    <span className="text-gray-400">({artisan.reviewCount})</span>
                  </div>
                  <div className="mt-2 flex items-center gap-1 text-xs text-gray-500">
                    <MapPin className="h-3 w-3" /> {artisan.location}
                  </div>
                  <div className="mt-2 flex items-center gap-2">
                    {categoryIcon(artisan.category)}
                    <span className="text-xs font-medium capitalize text-emerald-700">{artisan.category}</span>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
          <div className="mt-6 text-center sm:hidden">
            <Button onClick={() => onNavigate('search')} variant="outline" className="border-emerald-200 text-emerald-700">View All Artisans</Button>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-emerald-800 to-emerald-700 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold text-white">Are you a skilled artisan?</h2>
          <p className="mt-3 text-lg text-emerald-200">Join {BRAND_NAME} and connect with thousands of customers looking for your services. It's free to get started.</p>
          <Button size="lg" className="mt-6 bg-amber-500 px-8 text-base font-semibold text-emerald-950 hover:bg-amber-400">
            Become an Artisan <ArrowRight className="ml-1 h-5 w-5" />
          </Button>
        </div>
      </section>
    </div>
  );
}

/* ─── SEARCH / BROWSE VIEW ─── */
function SearchView({ onNavigate, searchQuery, onSearchChange, filters, onFilterChange }: {
  onNavigate: (v: ViewType, p?: Record<string, string>) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  filters: SearchFilters;
  onFilterChange: (f: Partial<SearchFilters>) => void;
}) {
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState<'rating' | 'price_low' | 'price_high'>('rating');

  const filtered = useMemo(() => {
    let result = [...ARTISANS];
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(a => a.name.toLowerCase().includes(q) || a.profession.toLowerCase().includes(q) || a.tags.some(t => t.toLowerCase().includes(q)));
    }
    if (filters.category !== 'all') result = result.filter(a => a.category === filters.category);
    if (filters.location) result = result.filter(a => a.city.toLowerCase().includes(filters.location.toLowerCase()) || a.location.toLowerCase().includes(filters.location.toLowerCase()));
    if (filters.minRating) result = result.filter(a => a.rating >= filters.minRating);
    if (filters.availableOnly) result = result.filter(a => a.available);
    if (sortBy === 'price_low') result.sort((a, b) => a.priceRange.min - b.priceRange.min);
    else if (sortBy === 'price_high') result.sort((a, b) => b.priceRange.max - a.priceRange.max);
    else result.sort((a, b) => b.rating - a.rating);
    return result;
  }, [searchQuery, filters, sortBy]);

  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* Search Header */}
      <div className="border-b border-emerald-100/60 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                value={searchQuery}
                onChange={e => onSearchChange(e.target.value)}
                placeholder="Search artisans, services, or skills..."
                className="h-11 rounded-xl border-gray-200 pl-10 text-sm"
              />
            </div>
            <Button onClick={() => setShowFilters(!showFilters)} variant="outline" className="h-11 border-gray-200">
              <SlidersHorizontal className="mr-1.5 h-4 w-4" /> Filters
            </Button>
          </div>

          {/* Category Pills */}
          <div className="mt-3 flex gap-2 overflow-x-auto pb-1 scrollbar-none">
            {CATEGORIES.map(c => (
              <button
                key={c.id}
                onClick={() => onFilterChange({ category: c.id })}
                className={`flex shrink-0 items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors ${
                  filters.category === c.id
                    ? 'border-emerald-300 bg-emerald-50 text-emerald-800'
                    : 'border-gray-200 bg-white text-gray-600 hover:border-emerald-200 hover:bg-emerald-50'
                }`}
              >
                {c.icon && categoryIcon(c.id, 'h-3.5 w-3.5')}
                {c.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Filters Panel */}
      <AnimatePresence>
        {showFilters && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden border-b border-emerald-100/60 bg-white">
            <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
              <div className="grid gap-4 sm:grid-cols-4">
                <div>
                  <label className="mb-1 block text-xs font-medium text-gray-600">Location</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-400" />
                    <select
                      value={filters.location}
                      onChange={e => onFilterChange({ location: e.target.value })}
                      className="h-9 w-full appearance-none rounded-lg border border-gray-200 bg-white pl-9 pr-8 text-sm text-gray-700 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
                    >
                      <option value="">All locations</option>
                      {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-400" />
                  </div>
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-gray-600">Min Rating</label>
                  <div className="relative">
                    <Star className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-400" />
                    <select
                      value={filters.minRating}
                      onChange={e => onFilterChange({ minRating: Number(e.target.value) })}
                      className="h-9 w-full appearance-none rounded-lg border border-gray-200 bg-white pl-9 pr-8 text-sm text-gray-700 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
                    >
                      <option value={0}>Any rating</option>
                      <option value={4.5}>4.5+ ★</option>
                      <option value={4}>4.0+ ★</option>
                      <option value={3.5}>3.5+ ★</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-400" />
                  </div>
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-gray-600">Sort By</label>
                  <div className="relative">
                    <ArrowUpRight className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-400" />
                    <select
                      value={sortBy}
                      onChange={e => setSortBy(e.target.value as typeof sortBy)}
                      className="h-9 w-full appearance-none rounded-lg border border-gray-200 bg-white pl-9 pr-8 text-sm text-gray-700 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
                    >
                      <option value="rating">Highest Rated</option>
                      <option value="price_low">Price: Low to High</option>
                      <option value="price_high">Price: High to Low</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-400" />
                  </div>
                </div>
                <div className="flex items-end">
                  <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-gray-200 px-3.5 py-2 text-sm text-gray-700 hover:bg-emerald-50">
                    <input type="checkbox" checked={filters.availableOnly} onChange={e => onFilterChange({ availableOnly: e.target.checked })} className="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500" />
                    Available now only
                  </label>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Results */}
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <p className="mb-4 text-sm text-gray-500">{filtered.length} artisan{filtered.length !== 1 ? 's' : ''} found</p>
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <AlertTriangle className="mb-3 h-12 w-12 text-gray-300" />
            <h3 className="text-lg font-semibold text-gray-600">No artisans found</h3>
            <p className="mt-1 text-sm text-gray-400">Try adjusting your filters or search query.</p>
            <Button onClick={() => { onSearchChange(''); onFilterChange({ category: 'all', location: '', minRating: 0, availableOnly: false }); }} variant="outline" className="mt-4">Clear Filters</Button>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((artisan, i) => (
              <motion.button
                key={artisan.id}
                onClick={() => onNavigate('artisan-detail', { id: artisan.id })}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ y: -3 }}
                className="group overflow-hidden rounded-2xl border border-gray-200 bg-white text-left shadow-sm transition-all hover:shadow-md"
              >
                <div className="relative h-40 overflow-hidden bg-emerald-100">
                  <img src={artisan.coverImage} alt="" className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  {artisan.verified && (
                    <Badge className="absolute top-3 right-3 border-emerald-200 bg-emerald-500/80 text-white">
                      <Check className="mr-0.5 h-3 w-3" /> Verified
                    </Badge>
                  )}
                  {!artisan.available && (
                    <Badge variant="secondary" className="absolute top-3 left-3 bg-gray-800/70 text-white">Unavailable</Badge>
                  )}
                  <div className="absolute bottom-3 left-3 flex items-center gap-2.5">
                    <img src={artisan.avatar} alt="" className="h-11 w-11 rounded-full border-2 border-white" />
                    <div className="text-white">
                      <p className="text-sm font-semibold leading-tight">{artisan.name}</p>
                      <p className="text-xs text-white/80">{artisan.profession}</p>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-sm">
                      <StarRating rating={artisan.rating} />
                      <span className="ml-1 font-medium text-gray-700">{artisan.rating}</span>
                      <span className="text-gray-400">({artisan.reviewCount})</span>
                    </div>
                    <span className="text-xs font-medium text-emerald-700">
                      ₦{artisan.priceRange.min.toLocaleString()} - ₦{artisan.priceRange.max.toLocaleString()}
                    </span>
                  </div>
                  <div className="mt-2 flex items-center gap-1 text-xs text-gray-500">
                    <MapPin className="h-3 w-3" /> {artisan.location}
                  </div>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {artisan.tags.slice(0, 3).map(t => (
                      <span key={t} className="rounded-md bg-emerald-50 px-2 py-0.5 text-[10px] font-medium text-emerald-700">{t}</span>
                    ))}
                    {artisan.tags.length > 3 && (
                      <span className="rounded-md bg-gray-50 px-2 py-0.5 text-[10px] text-gray-500">+{artisan.tags.length - 3}</span>
                    )}
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── ARTISAN DETAIL VIEW ─── */
function ArtisanDetailView({ artisanId, onNavigate }: { artisanId: string; onNavigate: (v: ViewType, p?: Record<string, string>) => void }) {
  const artisan = ARTISANS.find(a => a.id === artisanId);
  const [activeTab, setActiveTab] = useState<'services' | 'reviews' | 'portfolio'>('services');

  if (!artisan) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4">
        <AlertTriangle className="h-12 w-12 text-gray-300" />
        <h3 className="text-lg font-semibold text-gray-600">Artisan not found</h3>
        <Button onClick={() => onNavigate('search')} variant="outline">Back to Search</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* Cover */}
      <div className="relative h-56 overflow-hidden bg-emerald-800 sm:h-72">
        <img src={artisan.coverImage} alt="" className="h-full w-full object-cover opacity-70" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        <button onClick={() => onNavigate('search')} className="absolute top-4 left-4 flex h-9 w-9 items-center justify-center rounded-full bg-black/30 text-white backdrop-blur-sm transition-colors hover:bg-black/50">
          <ChevronRight className="h-5 w-5 rotate-180" />
        </button>
      </div>

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <div className="relative -mt-16 mb-6 flex flex-col items-center text-center sm:flex-row sm:items-end sm:text-left sm:gap-6">
          <img src={artisan.avatar} alt="" className="h-24 w-24 rounded-2xl border-4 border-white shadow-lg sm:h-28 sm:w-28" />
          <div className="mt-3 sm:mt-0 sm:flex-1">
            <div className="flex items-center justify-center gap-2 sm:justify-start">
              <h1 className="text-2xl font-bold text-emerald-900">{artisan.name}</h1>
              {artisan.verified && <Badge className="bg-emerald-100 text-emerald-800"><Check className="mr-0.5 h-3 w-3" /> Verified</Badge>}
            </div>
            <p className="text-gray-500">{artisan.profession} &middot; {artisan.yearsExperience} years experience</p>
            <div className="mt-2 flex items-center justify-center gap-4 text-sm sm:justify-start">
              <span className="flex items-center gap-1 text-gray-600"><MapPin className="h-3.5 w-3.5 text-emerald-600" /> {artisan.location}</span>
              <span className="flex items-center gap-1 text-gray-600"><Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" /> {artisan.rating} ({artisan.reviewCount} reviews)</span>
              <span className="flex items-center gap-1 text-gray-600"><Briefcase className="h-3.5 w-3.5 text-emerald-600" /> {artisan.completedJobs} jobs</span>
            </div>
          </div>
          <div className="mt-4 flex gap-2 sm:mt-0">
            <Button className="bg-emerald-700 text-white hover:bg-emerald-800"><MessageCircle className="mr-1 h-4 w-4" /> Contact</Button>
            <Button variant="outline" className="border-emerald-200"><Share2 className="h-4 w-4" /></Button>
          </div>
        </div>

        {/* Bio */}
        <Card className="mb-6 border-emerald-100">
          <CardContent className="px-6 py-4">
            <p className="text-sm leading-relaxed text-gray-600">{artisan.bio}</p>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={v => setActiveTab(v as typeof activeTab)} className="mb-8">
          <TabsList className="bg-emerald-50">
            <TabsTrigger value="services">Services & Pricing</TabsTrigger>
            <TabsTrigger value="reviews">Reviews ({artisan.reviews.length})</TabsTrigger>
            <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
          </TabsList>

          <TabsContent value="services" className="mt-4">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {artisan.services.map((s, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="rounded-xl border border-emerald-100 bg-white p-5 shadow-sm hover:shadow-md transition-shadow">
                  <h4 className="font-semibold text-emerald-900">{s.name}</h4>
                  <p className="mt-1 text-xs text-gray-500">{s.description}</p>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-lg font-bold text-emerald-700">₦{s.price.toLocaleString()}</span>
                    <span className="flex items-center gap-1 text-xs text-gray-500"><Clock className="h-3 w-3" /> {s.duration}</span>
                  </div>
                  <Button size="sm" className="mt-3 w-full bg-emerald-700 text-white hover:bg-emerald-800">Book Now</Button>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="reviews" className="mt-4">
            <div className="space-y-4">
              {artisan.reviews.length === 0 ? (
                <p className="py-8 text-center text-sm text-gray-400">No reviews yet.</p>
              ) : (
                artisan.reviews.map(r => (
                  <div key={r.id} className="rounded-xl border border-gray-100 bg-white p-4">
                    <div className="flex items-center gap-3">
                      <img src={r.userAvatar} alt="" className="h-9 w-9 rounded-full" />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-800">{r.userName}</p>
                        <div className="flex items-center gap-2">
                          <StarRating rating={r.rating} />
                          <span className="text-xs text-gray-400">{r.date}</span>
                        </div>
                      </div>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-gray-600">{r.text}</p>
                  </div>
                ))
              )}
            </div>
          </TabsContent>

          <TabsContent value="portfolio" className="mt-4">
            {artisan.portfolio.length === 0 ? (
              <p className="py-8 text-center text-sm text-gray-400">No portfolio images yet.</p>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {artisan.portfolio.map((img, i) => (
                  <div key={i} className="overflow-hidden rounded-xl">
                    <img src={img} alt={`Portfolio ${i + 1}`} className="h-52 w-full object-cover transition-transform hover:scale-105" />
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

/* ─── CUSTOMER DASHBOARD ─── */
function CustomerDashboard({ onNavigate }: { onNavigate: (v: ViewType, p?: Record<string, string>) => void }) {
  const upcoming = SAMPLE_BOOKINGS.filter(b => b.status === 'Confirmed' || b.status === 'Pending');
  const completed = SAMPLE_BOOKINGS.filter(b => b.status === 'Completed');

  return (
    <div className="min-h-screen bg-gray-50/50 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-emerald-900">My Dashboard</h1>
          <p className="text-sm text-gray-500">Welcome back, {SAMPLE_USER.name}!</p>
        </div>

        {/* Stats */}
        <div className="mb-6 grid gap-4 sm:grid-cols-3">
          {[
            { label: 'Active Bookings', value: upcoming.length, icon: Calendar, color: 'bg-emerald-50 text-emerald-700' },
            { label: 'Completed', value: completed.length, icon: CheckCircle2, color: 'bg-blue-50 text-blue-700' },
            { label: 'Total Spent', value: `₦${completed.reduce((s, b) => s + b.price, 0).toLocaleString()}`, icon: CreditCard, color: 'bg-amber-50 text-amber-700' },
          ].map(s => (
            <Card key={s.label} className="border-emerald-100">
              <CardContent className="flex items-center gap-4 px-6 py-5">
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${s.color}`}>
                  <s.icon className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-emerald-900">{s.value}</p>
                  <p className="text-xs text-gray-500">{s.label}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Upcoming */}
        <div className="mb-6">
          <h2 className="mb-3 text-lg font-semibold text-emerald-900">Upcoming Bookings</h2>
          {upcoming.length === 0 ? (
            <p className="py-6 text-center text-sm text-gray-400">No upcoming bookings.</p>
          ) : (
            <div className="space-y-3">
              {upcoming.map(b => (
                <Card key={b.id} className="border-emerald-100">
                  <CardContent className="flex items-center gap-4 px-6 py-4">
                    <img src={b.artisanAvatar} alt="" className="h-12 w-12 rounded-xl" />
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-emerald-900">{b.artisanName}</p>
                      <p className="text-xs text-gray-500">{b.artisanProfession}</p>
                      <div className="mt-1 flex items-center gap-3 text-xs text-gray-500">
                        <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {b.date}</span>
                        <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {b.time}</span>
                      </div>
                    </div>
                    <StatusBadge status={b.status} />
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="flex gap-3">
          <Button onClick={() => onNavigate('search')} className="bg-emerald-700 text-white hover:bg-emerald-800"><Search className="mr-1 h-4 w-4" /> Find Artisans</Button>
          <Button onClick={() => onNavigate('booking-history')} variant="outline" className="border-emerald-200">View All Bookings</Button>
        </div>
      </div>
    </div>
  );
}

/* ─── BOOKING HISTORY ─── */
function BookingHistory({ onNavigate }: { onNavigate: (v: ViewType, p?: Record<string, string>) => void }) {
  const [filter, setFilter] = useState<'all' | 'Confirmed' | 'Pending' | 'Completed'>('all');
  const bookings = filter === 'all' ? SAMPLE_BOOKINGS : SAMPLE_BOOKINGS.filter(b => b.status === filter);

  return (
    <div className="min-h-screen bg-gray-50/50 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-4">
          <h1 className="text-2xl font-bold text-emerald-900">Booking History</h1>
          <p className="text-sm text-gray-500">Track all your service bookings.</p>
        </div>

        <div className="mb-4 flex gap-2 overflow-x-auto">
          {(['all', 'Confirmed', 'Pending', 'Completed'] as const).map(s => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`shrink-0 rounded-full border px-4 py-1.5 text-xs font-medium transition-colors ${
                filter === s ? 'border-emerald-300 bg-emerald-50 text-emerald-800' : 'border-gray-200 text-gray-600 hover:bg-gray-50'
              }`}
            >
              {s === 'all' ? 'All' : s}
            </button>
          ))}
        </div>

        {bookings.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Calendar className="mb-3 h-10 w-10 text-gray-300" />
            <p className="text-sm text-gray-500">No bookings found.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {bookings.map(b => (
              <Card key={b.id} className="border-emerald-100">
                <CardContent className="flex items-start gap-4 px-6 py-4">
                  <img src={b.artisanAvatar} alt="" className="h-14 w-14 rounded-xl" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <div>
                        <p className="font-semibold text-emerald-900">{b.artisanName}</p>
                        <p className="text-xs text-gray-500">{b.artisanProfession}</p>
                      </div>
                      <StatusBadge status={b.status} />
                    </div>
                    <p className="mt-1 text-sm text-gray-600">{b.description}</p>
                    <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-gray-500">
                      <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {b.date}</span>
                      <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {b.time}</span>
                      {b.price > 0 && <span className="font-medium text-emerald-700">₦{b.price.toLocaleString()}</span>}
                    </div>
                    {b.status === 'Completed' && (
                      <div className="mt-2 flex items-center gap-1 text-xs text-amber-600">
                        <Star className="h-3 w-3 fill-amber-400 text-amber-400" /> Leave a review
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── PROFILE & SETTINGS ─── */
function ProfileSettings({ onNavigate }: { onNavigate: (v: ViewType, p?: Record<string, string>) => void }) {
  const [tab, setTab] = useState<'profile' | 'notifications' | 'security'>('profile');

  return (
    <div className="min-h-screen bg-gray-50/50 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-6 text-2xl font-bold text-emerald-900">Profile & Settings</h1>

        <div className="mb-6 flex items-center gap-4 rounded-2xl border border-emerald-100 bg-white p-4 shadow-sm">
          <img src={SAMPLE_USER.avatar} alt="" className="h-16 w-16 rounded-2xl" />
          <div className="flex-1">
            <h2 className="text-lg font-semibold text-emerald-900">{SAMPLE_USER.name}</h2>
            <p className="text-sm text-gray-500">{SAMPLE_USER.email}</p>
            <p className="text-xs text-gray-400">Member since {SAMPLE_USER.memberSince}</p>
          </div>
          <Button variant="outline" size="sm" className="border-emerald-200">Edit</Button>
        </div>

        <Tabs value={tab} onValueChange={v => setTab(v as typeof tab)}>
          <TabsList className="bg-emerald-50">
            <TabsTrigger value="profile"><User className="mr-1 h-4 w-4" /> Profile</TabsTrigger>
            <TabsTrigger value="notifications"><Bell className="mr-1 h-4 w-4" /> Notifications</TabsTrigger>
            <TabsTrigger value="security"><Settings className="mr-1 h-4 w-4" /> Security</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="mt-4 space-y-4">
            <Card className="border-emerald-100">
              <CardContent className="space-y-4 px-6 py-5">
                {[
                  { label: 'Full Name', value: SAMPLE_USER.name },
                  { label: 'Email', value: SAMPLE_USER.email },
                  { label: 'Phone', value: SAMPLE_USER.phone },
                  { label: 'Location', value: SAMPLE_USER.location },
                ].map(f => (
                  <div key={f.label} className="flex items-center justify-between border-b border-gray-100 pb-3 last:border-0 last:pb-0">
                    <div>
                      <p className="text-xs text-gray-500">{f.label}</p>
                      <p className="text-sm font-medium text-gray-800">{f.value}</p>
                    </div>
                    <Button variant="ghost" size="sm" className="text-emerald-600">Change</Button>
                  </div>
                ))}
              </CardContent>
            </Card>
            <Button variant="outline" className="w-full border-red-200 text-red-600 hover:bg-red-50"><LogOut className="mr-1 h-4 w-4" /> Sign Out</Button>
          </TabsContent>

          <TabsContent value="notifications" className="mt-4">
            <Card className="border-emerald-100">
              <CardContent className="space-y-4 px-6 py-5">
                {[
                  { label: 'Booking confirmations', desc: 'Get notified when a booking is confirmed or updated', on: true },
                  { label: 'Service reminders', desc: 'Reminders before your scheduled service', on: true },
                  { label: 'Promotional emails', desc: 'Special offers and new artisan recommendations', on: false },
                ].map(n => (
                  <div key={n.label} className="flex items-center justify-between border-b border-gray-100 pb-3 last:border-0 last:pb-0">
                    <div>
                      <p className="text-sm font-medium text-gray-800">{n.label}</p>
                      <p className="text-xs text-gray-500">{n.desc}</p>
                    </div>
                    <label className={`relative inline-flex h-6 w-11 cursor-pointer items-center rounded-full transition-colors ${n.on ? 'bg-emerald-600' : 'bg-gray-300'}`}>
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${n.on ? 'translate-x-6' : 'translate-x-1'}`} />
                    </label>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="mt-4 space-y-4">
            <Card className="border-emerald-100">
              <CardContent className="space-y-4 px-6 py-5">
                {[
                  { icon: Lock, label: 'Password', desc: 'Change your account password' },
                  { icon: HelpCircle, label: 'Two-Factor Authentication', desc: 'Add an extra layer of security' },
                  { icon: AlertTriangle, label: 'Delete Account', desc: 'Permanently delete your account and data' },
                ].map(s => (
                  <div key={s.label} className="flex items-center justify-between border-b border-gray-100 pb-3 last:border-0 last:pb-0">
                    <div className="flex items-center gap-3">
                      <s.icon className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="text-sm font-medium text-gray-800">{s.label}</p>
                        <p className="text-xs text-gray-500">{s.desc}</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" className="text-emerald-600">Manage</Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

/* ─── NOT FOUND ─── */
function NotFound({ onNavigate }: { onNavigate: (v: ViewType, p?: Record<string, string>) => void }) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4 text-center">
      <AlertTriangle className="h-16 w-16 text-gray-300" />
      <h1 className="text-2xl font-bold text-gray-700">Page Not Found</h1>
      <p className="text-sm text-gray-500">The page you're looking for doesn't exist.</p>
      <Button onClick={() => onNavigate('landing')} className="bg-emerald-700 text-white hover:bg-emerald-800">Go Home</Button>
    </div>
  );
}

/* ─── VIEWS EXPORT ─── */
interface ViewsProps {
  currentView: ViewType;
  viewParams: Record<string, string>;
  onNavigate: (v: ViewType, p?: Record<string, string>) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  filters: SearchFilters;
  onFilterChange: (f: Partial<SearchFilters>) => void;
  onSearch: () => void;
}

export default function Views({
  currentView, viewParams, onNavigate,
  searchQuery, onSearchChange, filters, onFilterChange, onSearch,
}: ViewsProps) {
  const render = () => {
    switch (currentView) {
      case 'landing':
        return <LandingView onNavigate={onNavigate} onSearch={onSearch} searchQuery={searchQuery} onSearchChange={onSearchChange} filters={filters} onFilterChange={onFilterChange} />;
      case 'search':
        return <SearchView onNavigate={onNavigate} searchQuery={searchQuery} onSearchChange={onSearchChange} filters={filters} onFilterChange={onFilterChange} />;
      case 'artisan-detail':
        return <ArtisanDetailView artisanId={viewParams.id || ''} onNavigate={onNavigate} />;
      case 'customer-dashboard':
        return <CustomerDashboard onNavigate={onNavigate} />;
      case 'booking-history':
        return <BookingHistory onNavigate={onNavigate} />;
      case 'profile-settings':
        return <ProfileSettings onNavigate={onNavigate} />;
      default:
        return <NotFound onNavigate={onNavigate} />;
    }
  };

  return (
    <motion.div key={currentView} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
      {render()}
    </motion.div>
  );
}

function Lock(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}
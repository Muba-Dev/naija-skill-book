import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, MapPin, User, X, Menu, LogIn, Mail, Phone,
  Star, ChevronDown, Check, Sparkles, ArrowRight, Briefcase
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { BRAND_NAME, BRAND_TAGLINE, CITIES, CATEGORIES } from '@/constants';
import type { ViewType, SearchFilters } from '@/types';

interface NavbarProps {
  currentView: ViewType;
  onNavigate: (view: ViewType, params?: Record<string, string>) => void;
  onOpenAuth: () => void;
  isLoggedIn: boolean;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  filters: SearchFilters;
  onFilterChange: (f: Partial<SearchFilters>) => void;
  onSearch: () => void;
}

export function Navbar({
  currentView, onNavigate, onOpenAuth, isLoggedIn,
  searchQuery, onSearchChange, filters, onFilterChange, onSearch,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const isLanding = currentView === 'landing';

  return (
    <header className="sticky top-0 z-40 w-full border-b border-emerald-100/60 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Logo */}
        <button onClick={() => onNavigate('landing')} className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-700 shadow-sm">
            <Sparkles className="h-5 w-5 text-amber-300" />
          </div>
          <span className="text-xl font-bold tracking-tight text-emerald-900">{BRAND_NAME}</span>
        </button>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-6 md:flex">
          <button onClick={() => onNavigate('landing')} className={`text-sm font-medium transition-colors hover:text-emerald-700 ${isLanding ? 'text-emerald-700' : 'text-gray-600'}`}>Home</button>
          <button onClick={() => onNavigate('search')} className={`text-sm font-medium transition-colors hover:text-emerald-700 ${currentView === 'search' ? 'text-emerald-700' : 'text-gray-600'}`}>Find Artisans</button>
          {isLoggedIn && (
            <button onClick={() => onNavigate('booking-history')} className={`text-sm font-medium transition-colors hover:text-emerald-700 ${currentView === 'booking-history' || currentView === 'customer-dashboard' ? 'text-emerald-700' : 'text-gray-600'}`}>My Bookings</button>
          )}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          {!isLanding && (
            <button onClick={() => setShowSearchBar(!showSearchBar)} className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 hover:bg-emerald-50 hover:text-emerald-700 md:hidden">
              <Search className="h-5 w-5" />
            </button>
          )}
          {isLoggedIn ? (
            <button onClick={() => onNavigate('profile-settings')} className="hidden items-center gap-2 rounded-full bg-emerald-50 px-4 py-1.5 text-sm font-medium text-emerald-800 transition-colors hover:bg-emerald-100 md:flex">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-200 text-xs font-bold text-emerald-800">KO</div>
              <span>Profile</span>
            </button>
          ) : (
            <Button onClick={onOpenAuth} variant="default" size="sm" className="hidden bg-emerald-700 hover:bg-emerald-800 md:inline-flex">
              <LogIn className="mr-1 h-4 w-4" /> Sign In
            </Button>
          )}
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-600 hover:bg-emerald-50 md:hidden">
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Search Bar */}
      <AnimatePresence>
        {showSearchBar && !isLanding && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden border-t border-emerald-100/60 px-4 pb-3 pt-2">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input value={searchQuery} onChange={e => onSearchChange(e.target.value)} placeholder="Search artisans..." className="pl-9" />
              </div>
              <Button size="sm" onClick={onSearch} className="bg-emerald-700 hover:bg-emerald-800">Go</Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden border-t border-emerald-100/60 md:hidden">
            <div className="space-y-1 px-4 py-3">
              <button onClick={() => { onNavigate('landing'); setMobileMenuOpen(false); }} className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-emerald-50">Home</button>
              <button onClick={() => { onNavigate('search'); setMobileMenuOpen(false); }} className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-emerald-50"><Search className="h-4 w-4 text-emerald-600" /> Find Artisans</button>
              {isLoggedIn && (
                <>
                  <button onClick={() => { onNavigate('customer-dashboard'); setMobileMenuOpen(false); }} className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-emerald-50"><Briefcase className="h-4 w-4 text-emerald-600" /> Dashboard</button>
                  <button onClick={() => { onNavigate('booking-history'); setMobileMenuOpen(false); }} className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-emerald-50">My Bookings</button>
                </>
              )}
              <div className="border-t border-gray-100 pt-2">
                {isLoggedIn ? (
                  <button onClick={() => { onNavigate('profile-settings'); setMobileMenuOpen(false); }} className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-emerald-50"><User className="h-4 w-4 text-emerald-600" /> Profile</button>
                ) : (
                  <button onClick={() => { onOpenAuth(); setMobileMenuOpen(false); }} className="flex w-full items-center gap-3 rounded-lg bg-emerald-700 px-3 py-2.5 text-sm font-medium text-white">Sign In</button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

/* ─── Auth Modal ─── */
interface AuthModalProps {
  open: boolean;
  onClose: () => void;
  onLogin: () => void;
}

export function AuthModal({ open, onClose, onLogin }: AuthModalProps) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [step, setStep] = useState<'form' | 'otp'>('form');

  return (
    <AnimatePresence>
      {open && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={onClose}>
          <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} onClick={e => e.stopPropagation()} className="w-full max-w-md rounded-2xl border border-emerald-100 bg-white p-6 shadow-2xl">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-emerald-900">{isSignUp ? 'Create Account' : 'Welcome Back'}</h2>
                <p className="mt-1 text-sm text-gray-500">{isSignUp ? 'Join thousands of Nigerians finding skilled artisans.' : 'Sign in to manage your bookings.'}</p>
              </div>
              <button onClick={onClose} className="flex h-8 w-8 items-center justify-center rounded-full text-gray-400 hover:bg-gray-100"><X className="h-4 w-4" /></button>
            </div>

            {step === 'form' ? (
              <div className="space-y-4">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">Email</label>
                  <Input type="email" placeholder="you@example.com" />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">Phone Number</label>
                  <Input type="tel" placeholder="+234 812 345 6789" />
                </div>
                {isSignUp && (
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700">Full Name</label>
                    <Input type="text" placeholder="Kelechi Okafor" />
                  </div>
                )}
                <Button onClick={() => setStep('otp')} className="w-full bg-emerald-700 py-5 text-white hover:bg-emerald-800">
                  {isSignUp ? 'Create Account' : 'Send OTP'} <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
                <div className="text-center text-sm text-gray-500">
                  {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
                  <button onClick={() => setIsSignUp(!isSignUp)} className="font-medium text-emerald-700 hover:underline">{isSignUp ? 'Sign In' : 'Sign Up'}</button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="rounded-xl bg-emerald-50 p-4 text-center">
                  <p className="text-sm text-gray-600">Enter the 6-digit code sent to</p>
                  <p className="mt-1 font-medium text-emerald-800">+234 812 345 6789</p>
                </div>
                <div className="flex justify-center gap-2">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <input key={i} maxLength={1} className="h-12 w-10 rounded-lg border border-gray-300 text-center text-lg font-bold focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200" />
                  ))}
                </div>
                <Button onClick={() => { onLogin(); onClose(); }} className="w-full bg-emerald-700 py-5 text-white hover:bg-emerald-800">Verify & Sign In</Button>
                <button onClick={() => setStep('form')} className="w-full text-center text-sm text-gray-500 hover:text-emerald-700">Change phone number</button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ─── Footer ─── */
export function Footer() {
  return (
    <footer className="border-t border-emerald-100/60 bg-emerald-950 text-emerald-200">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-800">
                <Sparkles className="h-4 w-4 text-amber-300" />
              </div>
              <span className="text-lg font-bold text-white">{BRAND_NAME}</span>
            </div>
            <p className="mt-3 max-w-md text-sm text-emerald-300">{BRAND_TAGLINE}</p>
            <div className="mt-4 flex items-center gap-4 text-sm text-emerald-400">
              <span className="flex items-center gap-1"><Mail className="h-3.5 w-3.5" /> hello@naijahandy.ng</span>
              <span className="flex items-center gap-1"><Phone className="h-3.5 w-3.5" /> +234 800 NAJAHANDY</span>
            </div>
          </div>
          <div>
            <h4 className="mb-3 text-sm font-semibold text-white">Services</h4>
            <ul className="space-y-2 text-sm text-emerald-300">
              {CATEGORIES.filter(c => c.id !== 'all').slice(0, 5).map(c => (
                <li key={c.id}><button className="hover:text-white transition-colors">{c.name}</button></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="mb-3 text-sm font-semibold text-white">Company</h4>
            <ul className="space-y-2 text-sm text-emerald-300">
              <li><button className="hover:text-white transition-colors">About Us</button></li>
              <li><button className="hover:text-white transition-colors">How It Works</button></li>
              <li><button className="hover:text-white transition-colors">Become an Artisan</button></li>
              <li><button className="hover:text-white transition-colors">Privacy Policy</button></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-emerald-800/50 pt-6 text-center text-xs text-emerald-400">
          &copy; {new Date().getFullYear()} {BRAND_NAME}. All rights reserved. Made with ❤️ in Nigeria.
        </div>
      </div>
    </footer>
  );
}
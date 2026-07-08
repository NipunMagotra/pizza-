'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Menu,
  X,
  ShoppingCart,
  User,
  Search,
  MapPin,
  ChevronDown,
} from 'lucide-react';
import { useCartStore } from '@/store/cart';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/menu', label: 'Menu' },
  { href: '/track/demo', label: 'Track Order' },
  { href: '/account', label: 'My Account' },
];

export default function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const getTotalItems = useCartStore((s) => s.getTotalItems);
  const [cartCount, setCartCount] = useState(0);

  // Hydration-safe cart count
  useEffect(() => {
    setCartCount(getTotalItems());
    const unsub = useCartStore.subscribe(() => {
      setCartCount(useCartStore.getState().getTotalItems());
    });
    return unsub;
  }, [getTotalItems]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        'sticky top-0 z-50 transition-all duration-200',
        scrolled
          ? 'bg-white/95 backdrop-blur-sm shadow-sm border-b border-border'
          : 'bg-white border-b border-border-light'
      )}
    >
      <div className="container-app">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">T</span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg leading-tight text-text">
                Taste of India
              </span>
              <span className="text-[10px] text-text-secondary leading-none tracking-wider uppercase hidden sm:block">
                Fresh &amp; Fast
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                  pathname === link.href
                    ? 'text-primary bg-primary-light'
                    : 'text-text-secondary hover:text-text hover:bg-gray-50'
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            {/* Location - desktop only */}
            <button className="hidden lg:flex items-center gap-1.5 px-3 py-2 text-sm text-text-secondary hover:text-text rounded-lg hover:bg-gray-50 transition-colors">
              <MapPin size={15} className="text-primary" />
              <span className="max-w-[120px] truncate">Dehradun</span>
              <ChevronDown size={13} />
            </button>

            {/* Search - desktop */}
            <button className="hidden sm:flex items-center justify-center w-9 h-9 rounded-lg text-text-secondary hover:text-text hover:bg-gray-50 transition-colors">
              <Search size={18} />
            </button>

            {/* Cart */}
            <Link
              href="/cart"
              className="relative flex items-center justify-center w-9 h-9 rounded-lg text-text-secondary hover:text-text hover:bg-gray-50 transition-colors"
            >
              <ShoppingCart size={18} />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-primary text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {cartCount > 9 ? '9+' : cartCount}
                </span>
              )}
            </Link>

            {/* Account */}
            <Link
              href="/account"
              className="hidden sm:flex items-center justify-center w-9 h-9 rounded-lg text-text-secondary hover:text-text hover:bg-gray-50 transition-colors"
            >
              <User size={18} />
            </Link>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden flex items-center justify-center w-9 h-9 rounded-lg text-text-secondary hover:text-text hover:bg-gray-50 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border-light bg-white">
          <nav className="container-app py-3 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'px-4 py-3 rounded-lg text-sm font-medium transition-colors',
                  pathname === link.href
                    ? 'text-primary bg-primary-light'
                    : 'text-text-secondary hover:text-text hover:bg-gray-50'
                )}
              >
                {link.label}
              </Link>
            ))}
            <div className="border-t border-border-light my-2" />
            <button className="flex items-center gap-2 px-4 py-3 text-sm text-text-secondary">
              <MapPin size={15} className="text-primary" />
              <span>Dehradun</span>
              <ChevronDown size={13} />
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}

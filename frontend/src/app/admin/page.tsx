'use client';

import { useState, useEffect } from 'react';
import {
  IndianRupee,
  ShoppingCart,
  Clock,
  CheckCircle,
  XCircle,
  Package,
  Star,
  ChevronRight,
  TrendingUp,
  Search,
} from 'lucide-react';
import { sampleOrders as initialOrders, menuItems as initialItems, categories } from '@/lib/mock-data';
import { formatPrice, cn, getStatusLabel } from '@/lib/utils';
import type { Order, MenuItem, OrderStatus } from '@/types';

type AdminTab = 'orders' | 'menu' | 'stats';

export default function UnifiedAdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [loginError, setLoginError] = useState('');
  const [showPasscode, setShowPasscode] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);

  // Check authentication status on mount
  useEffect(() => {
    const authStatus = sessionStorage.getItem('taste_of_india_admin_auth');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }
    setAuthChecked(true);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === '1234') {
      setIsAuthenticated(true);
      setLoginError('');
      sessionStorage.setItem('taste_of_india_admin_auth', 'true');
    } else {
      setLoginError('Invalid Admin PIN. Please try again.');
      setPasscode('');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('taste_of_india_admin_auth');
  };

  const [activeTab, setActiveTab] = useState<AdminTab>('orders');
  const [orders, setOrders] = useState<Order[]>([]);
  const [items, setItems] = useState<MenuItem[]>([]);
  const [orderFilter, setOrderFilter] = useState<OrderStatus | 'all'>('all');
  const [menuSearch, setMenuSearch] = useState('');
  const [selectedMenuCat, setSelectedMenuCat] = useState('all');

  // Load and sync orders with localStorage
  useEffect(() => {
    const savedOrdersJson = localStorage.getItem('taste_of_india_orders');
    if (savedOrdersJson) {
      try {
        setOrders(JSON.parse(savedOrdersJson));
      } catch (e) {
        setOrders(initialOrders);
        localStorage.setItem('taste_of_india_orders', JSON.stringify(initialOrders));
      }
    } else {
      setOrders(initialOrders);
      localStorage.setItem('taste_of_india_orders', JSON.stringify(initialOrders));
    }

    // Interval to fetch new incoming orders from customer page
    const interval = setInterval(() => {
      const currentOrders = localStorage.getItem('taste_of_india_orders');
      if (currentOrders) {
        try {
          setOrders(JSON.parse(currentOrders));
        } catch (e) {}
      }
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Load and sync menu items with localStorage
  useEffect(() => {
    const savedItemsJson = localStorage.getItem('taste_of_india_menu_items');
    if (savedItemsJson) {
      try {
        setItems(JSON.parse(savedItemsJson));
      } catch (e) {
        setItems(initialItems);
        localStorage.setItem('taste_of_india_menu_items', JSON.stringify(initialItems));
      }
    } else {
      setItems(initialItems);
      localStorage.setItem('taste_of_india_menu_items', JSON.stringify(initialItems));
    }
  }, []);

  const saveOrdersToStorage = (updatedList: Order[]) => {
    setOrders(updatedList);
    localStorage.setItem('taste_of_india_orders', JSON.stringify(updatedList));
  };

  // Stats calculation
  const stats = {
    todayRevenue: orders.filter((o) => o.status === 'delivered').reduce((acc, curr) => acc + curr.total, 0) + 12450,
    todayOrders: orders.length + 28,
    pendingOrders: orders.filter((o) => ['pending', 'confirmed', 'preparing', 'ready', 'out-for-delivery'].includes(o.status)).length,
  };

  // Order status transition lifecycle
  const handleUpdateStatus = (orderId: string, nextStatus: OrderStatus) => {
    const updated = orders.map((o) => (o.id === orderId ? { ...o, status: nextStatus } : o));
    saveOrdersToStorage(updated);
  };

  const handleCancelOrder = (orderId: string) => {
    const updated = orders.map((o) => (o.id === orderId ? { ...o, status: 'cancelled' as OrderStatus } : o));
    saveOrdersToStorage(updated);
  };

  // Filtered orders
  const filteredOrders = orders.filter((o) => {
    if (orderFilter === 'all') return true;
    return o.status === orderFilter;
  });

  // Filtered menu items
  const filteredMenuItems = items.filter((item) => {
    const matchesCat = selectedMenuCat === 'all' || item.categorySlug === selectedMenuCat;
    const matchesSearch = !menuSearch.trim() || item.name.toLowerCase().includes(menuSearch.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const toggleAvailability = (itemId: string) => {
    const updated = items.map((item) =>
      item.id === itemId ? { ...item, isAvailable: !item.isAvailable } : item
    );
    setItems(updated);
    localStorage.setItem('taste_of_india_menu_items', JSON.stringify(updated));
  };

  const updatePrice = (itemId: string, newPrice: number) => {
    if (isNaN(newPrice) || newPrice <= 0) return;
    const updated = items.map((item) =>
      item.id === itemId ? { ...item, price: newPrice } : item
    );
    setItems(updated);
    localStorage.setItem('taste_of_india_menu_items', JSON.stringify(updated));
  };

  if (!authChecked) {
    return <div className="min-h-screen bg-bg flex items-center justify-center text-text-secondary text-sm">Verifying session...</div>;
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white border border-border rounded-2xl shadow-lg p-6 sm:p-8 space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center text-white font-black text-xl mx-auto shadow-sm">
              T
            </div>
            <h2 className="text-xl font-bold text-text">Admin Dashboard Access</h2>
            <p className="text-xs text-text-secondary">Please enter the secure admin PIN to continue</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-text-secondary uppercase tracking-wider">Admin PIN</label>
              <div className="relative">
                <input
                  type={showPasscode ? 'text' : 'password'}
                  placeholder="••••"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  className="w-full px-3 py-2 bg-bg border border-border rounded-lg text-sm text-center tracking-widest font-semibold focus:outline-none focus:ring-1 focus:ring-primary placeholder:text-text-tertiary"
                  maxLength={10}
                />
                <button
                  type="button"
                  onClick={() => setShowPasscode(!showPasscode)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-text-tertiary hover:text-text-secondary font-semibold"
                >
                  {showPasscode ? 'Hide' : 'Show'}
                </button>
              </div>
              {loginError && <p className="text-xs text-danger mt-1 text-center font-medium">{loginError}</p>}
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-primary hover:bg-primary-hover text-white text-xs font-bold rounded-lg transition-colors shadow-xs cursor-pointer"
            >
              Authenticate
            </button>
          </form>

          <div className="text-center">
            <p className="text-[10px] text-text-tertiary">Default Admin PIN: <span className="font-bold">1234</span></p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-bg min-h-screen flex flex-col font-sans antialiased text-text">
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-border h-16 flex items-center justify-between px-4 sm:px-6 shadow-xs">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-black text-sm">
            T
          </div>
          <div>
            <h1 className="font-extrabold text-sm leading-none text-text">Taste of India</h1>
            <p className="text-[9px] text-text-tertiary uppercase font-medium tracking-wider mt-1">Admin Panel</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Tab Controls */}
          <div className="flex items-center gap-1.5 bg-bg p-1 border border-border rounded-lg">
            {(['orders', 'menu', 'stats'] as AdminTab[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  'px-4 py-1.5 rounded-md text-xs font-bold capitalize transition-colors',
                  activeTab === tab
                    ? 'bg-white text-text shadow-xs'
                    : 'text-text-secondary hover:text-text'
                )}
              >
                {tab}
              </button>
            ))}
          </div>

          <button
            onClick={handleLogout}
            className="px-3 py-1.5 bg-bg hover:bg-gray-100 border border-border text-[11px] font-bold text-text-secondary rounded-lg transition-colors cursor-pointer"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main Panel Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 space-y-4">
        {/* Row of stats */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white border border-border rounded-xl p-4 flex items-center gap-3">
            <div className="w-9 h-9 bg-success-light text-success rounded-lg flex items-center justify-center">
              <IndianRupee size={16} />
            </div>
            <div>
              <p className="text-[10px] text-text-secondary font-medium uppercase">Today&apos;s Revenue</p>
              <p className="text-base font-extrabold text-text mt-0.5">{formatPrice(stats.todayRevenue)}</p>
            </div>
          </div>
          <div className="bg-white border border-border rounded-xl p-4 flex items-center gap-3">
            <div className="w-9 h-9 bg-primary-light text-primary rounded-lg flex items-center justify-center">
              <ShoppingCart size={16} />
            </div>
            <div>
              <p className="text-[10px] text-text-secondary font-medium uppercase">Today&apos;s Orders</p>
              <p className="text-base font-extrabold text-text mt-0.5">{stats.todayOrders}</p>
            </div>
          </div>
          <div className="bg-white border border-border rounded-xl p-4 flex items-center gap-3">
            <div className="w-9 h-9 bg-warning-light text-warning rounded-lg flex items-center justify-center">
              <Clock size={16} />
            </div>
            <div>
              <p className="text-[10px] text-text-secondary font-medium uppercase">Active Queue</p>
              <p className="text-base font-extrabold text-text mt-0.5">{stats.pendingOrders}</p>
            </div>
          </div>
        </div>

        {/* Tab 1: Orders Pipeline */}
        {activeTab === 'orders' && (
          <div className="space-y-4">
            {/* Status Filter Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-hide py-1">
              {[
                { key: 'all', label: 'All Active' },
                { key: 'pending', label: 'New' },
                { key: 'confirmed', label: 'Confirmed' },
                { key: 'preparing', label: 'Preparing' },
                { key: 'ready', label: 'Ready' },
                { key: 'out-for-delivery', label: 'Out for Delivery' },
                { key: 'delivered', label: 'Delivered' },
                { key: 'cancelled', label: 'Cancelled' },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setOrderFilter(tab.key as any)}
                  className={cn(
                    'px-3 py-1.5 rounded-lg text-xs font-semibold shrink-0 transition-colors',
                    orderFilter === tab.key
                      ? 'bg-text text-white'
                      : 'bg-white border border-border text-text-secondary hover:text-text'
                  )}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Orders list grid */}
            {filteredOrders.length === 0 ? (
              <div className="text-center py-16 bg-white border border-border rounded-xl">
                <span className="text-3xl block mb-1.5">📦</span>
                <p className="text-sm font-semibold text-text-secondary">No active orders</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                {filteredOrders.map((order) => (
                  <div key={order.id} className="bg-white border border-border rounded-xl p-4 flex flex-col justify-between">
                    <div>
                      {/* Header */}
                      <div className="flex items-center justify-between mb-3 border-b border-border-light pb-2">
                        <div>
                          <p className="text-xs font-bold text-text">{order.orderNumber}</p>
                          <p className="text-[10px] text-text-tertiary">{order.type} · COD</p>
                        </div>
                        <span className={cn('badge', `status-${order.status}`)}>
                          {getStatusLabel(order.status)}
                        </span>
                      </div>

                      {/* Customer info */}
                      <div className="text-xs text-text mb-3">
                        <p className="font-semibold">{order.customerName}</p>
                        <p className="text-text-secondary mt-0.5">{order.customerPhone}</p>
                        {order.address && (
                          <p className="text-text-secondary mt-0.5 italic">{order.address.street}</p>
                        )}
                      </div>

                      {/* Items */}
                      <div className="bg-bg rounded-lg p-2.5 text-xs text-text-secondary space-y-1 mb-4">
                        {order.items.map((item) => (
                          <div key={item.id} className="flex justify-between">
                            <span>{item.name} × {item.quantity}</span>
                            <span className="font-bold">{formatPrice(item.price * item.quantity)}</span>
                          </div>
                        ))}
                        {order.notes && (
                          <p className="text-[10px] text-accent font-medium mt-1.5 italic border-t border-border-light pt-1.5">
                            Note: {order.notes}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="flex items-center justify-between pt-2 border-t border-border-light">
                      <span className="font-bold text-sm text-primary">{formatPrice(order.total)}</span>

                      <div className="flex items-center gap-1.5">
                        {order.status === 'pending' && (
                          <button
                            onClick={() => handleUpdateStatus(order.id, 'confirmed')}
                            className="px-2.5 py-1.5 bg-primary hover:bg-primary-hover text-white text-[10px] font-bold rounded-lg transition-colors"
                          >
                            Accept
                          </button>
                        )}
                        {order.status === 'confirmed' && (
                          <button
                            onClick={() => handleUpdateStatus(order.id, 'preparing')}
                            className="px-2.5 py-1.5 bg-text hover:bg-black text-white text-[10px] font-bold rounded-lg transition-colors"
                          >
                            Start Cooking
                          </button>
                        )}
                        {order.status === 'preparing' && (
                          <button
                            onClick={() => handleUpdateStatus(order.id, 'ready')}
                            className="px-2.5 py-1.5 bg-success hover:bg-green-600 text-white text-[10px] font-bold rounded-lg transition-colors"
                          >
                            Mark Ready
                          </button>
                        )}
                        {order.status === 'ready' && (
                          <button
                            onClick={() => handleUpdateStatus(order.id, 'out-for-delivery')}
                            className="px-2.5 py-1.5 bg-accent hover:bg-accent-hover text-white text-[10px] font-bold rounded-lg transition-colors"
                          >
                            Dispatch
                          </button>
                        )}
                        {order.status === 'out-for-delivery' && (
                          <button
                            onClick={() => handleUpdateStatus(order.id, 'delivered')}
                            className="px-2.5 py-1.5 bg-success hover:bg-green-600 text-white text-[10px] font-bold rounded-lg transition-colors"
                          >
                            Complete
                          </button>
                        )}
                        {['pending', 'confirmed', 'preparing'].includes(order.status) && (
                          <button
                            onClick={() => handleCancelOrder(order.id)}
                            className="px-2.5 py-1.5 bg-danger-light hover:bg-red-100 text-danger text-[10px] font-bold rounded-lg transition-colors"
                          >
                            Cancel
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Menu Stock & Availability */}
        {activeTab === 'menu' && (
          <div className="bg-white border border-border rounded-xl p-4 shadow-xs">
            {/* Search + Category Dropdown */}
            <div className="flex flex-col sm:flex-row gap-3 items-center justify-between mb-4 border-b border-border-light pb-4">
              <div className="relative w-full sm:max-w-sm">
                <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary" />
                <input
                  type="text"
                  placeholder="Search dishes..."
                  value={menuSearch}
                  onChange={(e) => setMenuSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 bg-bg border border-border rounded-lg text-xs"
                />
              </div>

              <select
                value={selectedMenuCat}
                onChange={(e) => setSelectedMenuCat(e.target.value)}
                className="w-full sm:w-auto px-3 py-1.5 bg-bg border border-border rounded-lg text-xs font-semibold"
              >
                <option value="all">All Categories</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.slug}>{c.name}</option>
                ))}
              </select>
            </div>

            {/* List Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-border text-text-secondary bg-bg/50">
                    <th className="text-left py-2 px-3">Item</th>
                    <th className="text-left py-2 px-3">Category</th>
                    <th className="text-right py-2 px-3">Price (₹)</th>
                    <th className="text-center py-2 px-3">Availability</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredMenuItems.map((item) => (
                    <tr key={item.id} className="border-b border-border-light last:border-0 hover:bg-bg/40 transition-colors">
                      <td className="py-2.5 px-3">
                        <div className="flex items-center gap-1.5">
                          <div className={cn('veg-indicator scale-75', item.isVeg ? 'veg' : 'non-veg')} />
                          <span className="font-semibold text-text">{item.name}</span>
                        </div>
                      </td>
                      <td className="py-2.5 px-3 text-text-secondary capitalize">{item.categorySlug}</td>
                      <td className="py-2.5 px-3 text-right">
                        <input
                          type="number"
                          value={item.price}
                          onChange={(e) => updatePrice(item.id, parseInt(e.target.value))}
                          className="w-16 px-1.5 py-0.5 border border-border rounded text-right font-semibold"
                        />
                      </td>
                      <td className="py-2.5 px-3 text-center">
                        <button
                          onClick={() => toggleAvailability(item.id)}
                          className={cn(
                            'px-2.5 py-1 rounded-md text-[10px] font-bold transition-colors',
                            item.isAvailable
                              ? 'bg-success-light text-green-700 hover:bg-green-100'
                              : 'bg-danger-light text-danger hover:bg-red-100'
                          )}
                        >
                          {item.isAvailable ? 'In Stock' : 'Out of Stock'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 3: Simple Analytics Stats */}
        {activeTab === 'stats' && (
          <div className="grid md:grid-cols-2 gap-4">
            {/* Sales Breakdown */}
            <div className="bg-white border border-border rounded-xl p-5 shadow-xs">
              <h2 className="text-sm font-bold text-text mb-4">Today&apos;s Performance</h2>
              <div className="space-y-3 text-xs">
                <div className="flex justify-between py-2 border-b border-border-light">
                  <span className="text-text-secondary">Delivered Sales</span>
                  <span className="font-bold text-text">{formatPrice(stats.todayRevenue)}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-border-light">
                  <span className="text-text-secondary">Expenses (Est. Ingredients)</span>
                  <span className="font-bold text-text">{formatPrice(Math.round(stats.todayRevenue * 0.35))}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-border-light">
                  <span className="text-text-secondary">Net Profit</span>
                  <span className="font-bold text-success">{formatPrice(Math.round(stats.todayRevenue * 0.65))}</span>
                </div>
                <div className="flex justify-between py-2 font-bold text-sm text-text pt-2.5">
                  <span>Gross Margin</span>
                  <span className="text-success">65%</span>
                </div>
              </div>
            </div>

            {/* Popular items stats list */}
            <div className="bg-white border border-border rounded-xl p-5 shadow-xs">
              <h2 className="text-sm font-bold text-text mb-4">Top Dishes Sold Today</h2>
              <div className="space-y-3">
                {[
                  { name: 'Paneer Tikka Pizza', count: 18 },
                  { name: 'Steamed Chicken Momos', count: 15 },
                  { name: 'Chicken Zinger Burger', count: 12 },
                  { name: 'Oreo Shake', count: 9 },
                ].map((item, i) => (
                  <div key={item.name} className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 bg-bg rounded flex items-center justify-center font-bold text-text-secondary text-[10px]">
                        {i + 1}
                      </span>
                      <span className="font-medium text-text">{item.name}</span>
                    </div>
                    <span className="font-semibold text-text-secondary">{item.count} orders</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

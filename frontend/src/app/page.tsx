'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import {
  Search,
  ShoppingCart,
  Star,
  Clock,
  MapPin,
  Phone,
  Percent,
  ChevronDown,
  X,
  Plus,
  Minus,
  CheckCircle,
  AlertTriangle,
  UtensilsCrossed,
} from 'lucide-react';
import { menuItems, categories, coupons, getUnsplashImageUrlForMenuItem } from '@/lib/mock-data';
import { formatPrice, cn, generateOrderNumber } from '@/lib/utils';
import type { MenuItem, CartItem, OrderType, OrderStatus } from '@/types';

export default function SinglePageCustomerApp() {
  // Navigation & UI States
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isVegOnly, setIsVegOnly] = useState(false);
  const [orderType, setOrderType] = useState<OrderType>('delivery');
  
  // Cart State
  const [cart, setCart] = useState<CartItem[]>([]);
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<any>(null);
  const [couponError, setCouponError] = useState('');
  
  // Checkout Form
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [tableNumber, setTableNumber] = useState('');
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  
  // Order Placement & Tracking State
  const [activeOrder, setActiveOrder] = useState<any>(null);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [placingOrder, setPlacingOrder] = useState(false);

  // Cart operations
  const addToCart = (item: MenuItem) => {
    setCart((prev) => {
      const existing = prev.find((ci) => ci.menuItem.id === item.id);
      if (existing) {
        return prev.map((ci) =>
          ci.menuItem.id === item.id ? { ...ci, quantity: ci.quantity + 1 } : ci
        );
      }
      return [...prev, { menuItem: item, quantity: 1 }];
    });
  };

  const updateQuantity = (itemId: string, qty: number) => {
    if (qty <= 0) {
      setCart((prev) => prev.filter((ci) => ci.menuItem.id !== itemId));
      return;
    }
    setCart((prev) =>
      prev.map((ci) => (ci.menuItem.id === itemId ? { ...ci, quantity: qty } : ci))
    );
  };

  // Calculations
  const subtotal = useMemo(() => {
    return cart.reduce((sum, item) => {
      const price = item.menuItem.discountPrice ?? item.menuItem.price;
      return sum + price * item.quantity;
    }, 0);
  }, [cart]);

  const tax = Math.round(subtotal * 0.05); // 5% GST
  const deliveryCharge = orderType === 'delivery' && subtotal < 499 && subtotal > 0 ? 30 : 0;

  const discount = useMemo(() => {
    if (!appliedCoupon) return 0;
    return appliedCoupon.discount;
  }, [appliedCoupon]);

  const total = Math.max(0, subtotal + tax + deliveryCharge - discount);

  // Coupon handling
  const handleApplyCoupon = () => {
    setCouponError('');
    const code = couponCode.trim().toUpperCase();
    if (!code) return;

    const found = coupons.find((c) => c.code === code && c.isActive);
    if (!found) {
      setCouponError('Invalid coupon');
      return;
    }

    if (subtotal < found.minOrder) {
      setCouponError(`Min. order ₹${found.minOrder} required`);
      return;
    }

    let calculatedDiscount = 0;
    if (found.type === 'percentage') {
      calculatedDiscount = Math.round((subtotal * found.value) / 100);
      if (found.maxDiscount) {
        calculatedDiscount = Math.min(calculatedDiscount, found.maxDiscount);
      }
    } else {
      calculatedDiscount = found.value;
    }

    setAppliedCoupon({ code: found.code, discount: calculatedDiscount });
    setCouponCode('');
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
  };

  const [items, setItems] = useState<MenuItem[]>(menuItems);

  // Sync menu items from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('taste_of_india_menu_items');
    if (saved) {
      try {
        setItems(JSON.parse(saved));
      } catch (e) {}
    }
    const interval = setInterval(() => {
      const currentSaved = localStorage.getItem('taste_of_india_menu_items');
      if (currentSaved) {
        try {
          setItems(JSON.parse(currentSaved));
        } catch (e) {}
      }
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Check URL params for table number and order type
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const table = params.get('table');
      const type = params.get('type') || params.get('mode');
      
      if (table) {
        setTableNumber(table);
        setOrderType('dine-in');
      } else if (type === 'dine-in' || type === 'takeaway' || type === 'delivery') {
        setOrderType(type as OrderType);
      }
    }
  }, []);

  // Form Validation & Place Order
  const handleCheckout = () => {
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = 'Name is required';
    if (!phone.trim()) errs.phone = 'Phone is required';
    else if (!/^[6-9]\d{9}$/.test(phone.trim())) {
      errs.phone = 'Enter valid 10-digit number';
    }
    if (orderType === 'delivery' && !address.trim()) {
      errs.address = 'Address is required';
    }
    if (orderType === 'dine-in' && !tableNumber.trim()) {
      errs.tableNumber = 'Table number is required';
    }

    setFormErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setPlacingOrder(true);
    setTimeout(() => {
      const orderNo = generateOrderNumber();
      const newOrder = {
        id: `ord-${Date.now()}`,
        orderNumber: orderNo,
        userId: 'u-current',
        customerName: name,
        customerPhone: phone,
        type: orderType,
        status: 'pending' as OrderStatus,
        items: cart.map((ci) => ({
          id: `oi-${Math.random()}`,
          menuItemId: ci.menuItem.id,
          name: ci.menuItem.name,
          price: ci.menuItem.discountPrice ?? ci.menuItem.price,
          quantity: ci.quantity,
          isVeg: ci.menuItem.isVeg
        })),
        subtotal,
        tax,
        deliveryCharge,
        discount,
        total,
        paymentMethod: 'cod',
        paymentStatus: 'pending',
        notes: tableNumber.trim() ? `Table ${tableNumber.trim()}: ${notes}` : notes,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      
      // Save order to LocalStorage list
      const existingOrdersJson = localStorage.getItem('taste_of_india_orders');
      let existingOrders = [];
      if (existingOrdersJson) {
        try {
          existingOrders = JSON.parse(existingOrdersJson);
        } catch (e) {}
      }
      const updatedOrders = [newOrder, ...existingOrders];
      localStorage.setItem('taste_of_india_orders', JSON.stringify(updatedOrders));
      localStorage.setItem('active_order', JSON.stringify(newOrder));
      
      setActiveOrder(newOrder);
      setCart([]);
      setAppliedCoupon(null);
      setOrderPlaced(true);
      setPlacingOrder(false);
    }, 1200);
  };

  // Check for active order and poll status updates
  useEffect(() => {
    const updateActiveOrderStatus = () => {
      const savedOrder = localStorage.getItem('active_order');
      if (savedOrder) {
        try {
          const parsedSaved = JSON.parse(savedOrder);
          const ordersJson = localStorage.getItem('taste_of_india_orders');
          if (ordersJson) {
            const allOrders = JSON.parse(ordersJson);
            const latest = allOrders.find((o: any) => o.id === parsedSaved.id);
            if (latest) {
              setActiveOrder(latest);
              setOrderPlaced(true);
              return;
            }
          }
          setActiveOrder(parsedSaved);
          setOrderPlaced(true);
        } catch (e) {}
      }
    };

    updateActiveOrderStatus();
    const interval = setInterval(updateActiveOrderStatus, 2000);
    return () => clearInterval(interval);
  }, []);

  // Filter items
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchesCategory = selectedCategory === 'all' || item.categorySlug === selectedCategory;
      const matchesSearch = !searchQuery.trim() || item.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesVeg = !isVegOnly || item.isVeg;
      return matchesCategory && matchesSearch && matchesVeg;
    });
  }, [items, selectedCategory, searchQuery, isVegOnly]);

  return (
    <div className={cn("bg-bg min-h-screen flex flex-col font-sans antialiased text-text", cart.length > 0 && "pb-16 lg:pb-0")}>
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-border h-16 flex items-center justify-between px-4 sm:px-6 shadow-xs">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center text-white font-black text-lg">
            T
          </div>
          <div>
            <h1 className="font-extrabold text-base leading-none text-text">Taste of India</h1>
            <p className="text-[10px] text-text-secondary leading-none mt-1">Fresh &amp; Fast Dehradun</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <a
            href="tel:+919876543210"
            className="flex items-center gap-1 text-xs font-semibold text-text-secondary hover:text-text bg-bg border border-border px-3 py-1.5 rounded-lg"
          >
            <Phone size={13} className="text-primary" />
            <span className="hidden sm:inline">Call Us</span>
          </a>
          <Link
            href="/admin"
            className="text-xs font-semibold text-text-secondary hover:text-primary transition-colors"
          >
            Admin Panel
          </Link>
        </div>
      </header>

      {/* Main Content Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 grid lg:grid-cols-[1fr_360px] gap-6 min-w-0">
        {/* Left Side: Browse Food */}
        <div className="space-y-6 min-w-0">
          {/* Active Order Banner if any */}
          {orderPlaced && activeOrder && (
            <div className="bg-success-light border border-success/30 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 shadow-xs">
              <div className="flex items-start gap-2.5">
                <CheckCircle className="text-success shrink-0 mt-0.5" size={18} />
                <div>
                  <h3 className="text-sm font-bold text-green-950">Active Order: {activeOrder.orderNumber}</h3>
                  <p className="text-xs text-green-800">
                    Status: <span className="font-semibold capitalize">{activeOrder.status}</span> · Estimated delivery in 30 mins
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => {
                    localStorage.removeItem('active_order');
                    setOrderPlaced(false);
                    setActiveOrder(null);
                  }}
                  className="px-3 py-1.5 bg-white border border-success/30 text-green-900 rounded-lg text-xs font-semibold hover:bg-green-50 transition-colors"
                >
                  Clear Status
                </button>
              </div>
            </div>
          )}

          {/* Location & Search Bar */}
          <div className="bg-white border border-border rounded-xl p-4 flex flex-col md:flex-row gap-4 items-center justify-between shadow-xs">
            <div className="flex items-center gap-2 text-sm text-text-secondary w-full md:w-auto">
              <MapPin size={16} className="text-primary shrink-0" />
              <span className="font-semibold text-text">Rajpur Road, Dehradun</span>
              <ChevronDown size={14} className="text-text-tertiary" />
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto md:max-w-md md:flex-1">
              <div className="relative flex-1">
                <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for pizza, momos, burger..."
                  className="w-full pl-9 pr-3 py-1.5 bg-bg border border-border rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
              
              <button
                onClick={() => setIsVegOnly(!isVegOnly)}
                className={cn(
                  'px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors shrink-0 flex items-center gap-1.5',
                  isVegOnly
                    ? 'bg-success-light border-success text-green-700'
                    : 'bg-white border-border text-text-secondary hover:text-text'
                )}
              >
                <span className={cn('w-2 h-2 rounded-full', isVegOnly ? 'bg-green-600' : 'bg-gray-400')} />
                <span>Veg Only</span>
              </button>
            </div>
          </div>

          {/* Quick Category Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-hide py-1">
            <button
              onClick={() => setSelectedCategory('all')}
              className={cn(
                'px-4 py-2 rounded-lg text-xs font-semibold transition-colors shrink-0',
                selectedCategory === 'all'
                  ? 'bg-primary text-white'
                  : 'bg-white border border-border text-text-secondary hover:bg-gray-50'
              )}
            >
              All Menu
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.slug)}
                className={cn(
                  'px-3.5 py-2 rounded-lg text-xs font-semibold transition-colors shrink-0 flex items-center gap-1.5',
                  selectedCategory === cat.slug
                    ? 'bg-primary text-white'
                    : 'bg-white border border-border text-text-secondary hover:bg-gray-50'
                )}
              >
                <span className="w-5 h-5 rounded-full overflow-hidden shrink-0 relative flex items-center justify-center bg-gray-50 border border-border/20">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={cat.icon} alt={cat.name} className="w-full h-full object-cover" />
                </span>
                <span>{cat.name}</span>
              </button>
            ))}
          </div>

          {/* Menu Items Grid */}
          <div>
            <h2 className="text-base font-bold text-text mb-4">
              {selectedCategory === 'all' ? 'Featured Dishes' : categories.find((c) => c.slug === selectedCategory)?.name}
            </h2>

            {filteredItems.length === 0 ? (
              <div className="text-center py-16 bg-white border border-border rounded-xl">
                <UtensilsCrossed size={32} className="mx-auto text-text-tertiary mb-2 opacity-60" />
                <p className="text-sm font-semibold text-text-secondary">No dishes found</p>
                <p className="text-xs text-text-tertiary mt-1">Try changing your search query or filters</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredItems.map((item) => {
                  const cartItem = cart.find((ci) => ci.menuItem.id === item.id);
                  const price = item.discountPrice ?? item.price;
                  return (
                    <div
                      key={item.id}
                      className="bg-white border border-border rounded-xl p-3 flex flex-row sm:flex-col hover:shadow-xs transition-shadow gap-3"
                    >
                      <div className="relative w-28 h-24 sm:w-full sm:aspect-[16/10] bg-gray-50 border border-border/30 rounded-lg overflow-hidden shrink-0">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={item.image.startsWith('/food/') ? getUnsplashImageUrlForMenuItem(item.categorySlug, item.slug) : item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const cat = categories.find(c => c.slug === item.categorySlug);
                            if (cat) e.currentTarget.src = cat.icon;
                          }}
                        />
                        <div className="absolute top-1 right-1 sm:top-2 sm:right-2">
                          <div className={cn('veg-indicator scale-75', item.isVeg ? 'veg' : 'non-veg')} />
                        </div>
                      </div>

                      <div className="flex-1 flex flex-col justify-between min-w-0">
                        <div>
                          <div className="flex items-center justify-between mb-1 gap-1">
                            <h3 className="font-bold text-sm text-text leading-tight line-clamp-1">{item.name}</h3>
                            <div className="flex items-center gap-0.5 shrink-0">
                              <Star size={11} className="fill-amber-400 text-amber-400" />
                              <span className="text-xs font-semibold text-text-secondary">{item.rating}</span>
                            </div>
                          </div>
                          <p className="text-[11px] text-text-secondary line-clamp-2 leading-relaxed mb-3">
                            {item.description}
                          </p>
                        </div>

                        <div className="flex items-center justify-between pt-2 border-t border-border-light">
                          <div className="flex items-baseline gap-1.5">
                            <span className="font-bold text-sm text-text">{formatPrice(price)}</span>
                            {item.discountPrice && (
                              <span className="text-[10px] text-text-tertiary line-through">{formatPrice(item.price)}</span>
                            )}
                          </div>

                          {!item.isAvailable ? (
                            <span className="text-[10px] font-bold text-danger bg-danger-light px-2 py-1 rounded-lg uppercase">
                              Out of Stock
                            </span>
                          ) : cartItem ? (
                            <div className="flex items-center border border-border rounded-lg h-7 overflow-hidden bg-bg">
                              <button
                                onClick={() => updateQuantity(item.id, cartItem.quantity - 1)}
                                className="w-7 h-7 flex items-center justify-center text-text-secondary hover:text-primary transition-colors"
                              >
                                <Minus size={11} />
                              </button>
                              <span className="text-xs font-bold text-text px-2">{cartItem.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.id, cartItem.quantity + 1)}
                                className="w-7 h-7 flex items-center justify-center text-text-secondary hover:text-primary transition-colors"
                              >
                                <Plus size={11} />
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => addToCart(item)}
                              className="px-3 py-1 bg-primary hover:bg-primary-hover text-white text-[11px] font-bold rounded-lg transition-colors"
                            >
                              ADD
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Cart & Checkout in One Panel */}
        <div id="checkout-panel" className="space-y-4 min-w-0">
          <div className="bg-white border border-border rounded-xl p-4 md:p-5 shadow-xs sticky top-20">
            <h2 className="text-base font-bold text-text mb-4 flex items-center gap-1.5">
              <ShoppingCart size={17} className="text-primary" />
              Your Order
            </h2>

            {cart.length === 0 ? (
              <div className="text-center py-10">
                <ShoppingCart size={32} className="mx-auto text-text-tertiary mb-2 opacity-40" />
                <p className="text-xs text-text-secondary font-medium">Your cart is empty</p>
                <p className="text-[10px] text-text-tertiary mt-0.5">Select delicious food from the left to start ordering</p>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Order Type Tabs */}
                <div className="grid grid-cols-3 gap-1 bg-bg p-1 border border-border rounded-lg">
                  {(['delivery', 'takeaway', 'dine-in'] as const).map((type) => (
                    <button
                      key={type}
                      onClick={() => setOrderType(type)}
                      className={cn(
                        'py-1 text-[11px] font-bold rounded capitalize transition-colors',
                        orderType === type
                          ? 'bg-white text-text shadow-xs'
                          : 'text-text-secondary hover:text-text'
                      )}
                    >
                      {type === 'dine-in' ? 'Dine-in' : type}
                    </button>
                  ))}
                </div>

                {/* Cart Items List */}
                <div className="space-y-2.5 max-h-48 overflow-y-auto pr-1 border-b border-border-light pb-3">
                  {cart.map((item) => {
                    const price = item.menuItem.discountPrice ?? item.menuItem.price;
                    return (
                      <div key={item.menuItem.id} className="flex items-center justify-between text-xs">
                        <div className="min-w-0 flex-1">
                          <p className="font-semibold text-text truncate">{item.menuItem.name}</p>
                          <p className="text-[10px] text-text-secondary">{formatPrice(price)}</p>
                        </div>
                        <div className="flex items-center gap-3 ml-2">
                          <div className="flex items-center border border-border rounded h-6 overflow-hidden bg-bg">
                            <button
                              onClick={() => updateQuantity(item.menuItem.id, item.quantity - 1)}
                              className="w-6 h-6 flex items-center justify-center text-text-secondary hover:text-primary transition-colors"
                            >
                              <Minus size={10} />
                            </button>
                            <span className="text-xs font-bold text-text px-1.5">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.menuItem.id, item.quantity + 1)}
                              className="w-6 h-6 flex items-center justify-center text-text-secondary hover:text-primary transition-colors"
                            >
                              <Plus size={10} />
                            </button>
                          </div>
                          <span className="font-bold text-text shrink-0">{formatPrice(price * item.quantity)}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Coupon Code section */}
                {!appliedCoupon ? (
                  <div className="space-y-1.5">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                        placeholder="Enter Code (WELCOME50)"
                        className="flex-1 px-3 py-1.5 bg-bg border border-border rounded-lg text-xs placeholder:text-text-tertiary focus:outline-none"
                      />
                      <button
                        onClick={handleApplyCoupon}
                        className="px-3 bg-text text-white text-xs font-bold rounded-lg hover:bg-black transition-colors"
                      >
                        Apply
                      </button>
                    </div>
                    {couponError && <p className="text-[10px] text-danger font-medium">{couponError}</p>}
                  </div>
                ) : (
                  <div className="flex items-center justify-between p-2 bg-success-light border border-success/20 rounded-lg">
                    <div>
                      <p className="text-xs font-bold text-green-950">{appliedCoupon.code} applied!</p>
                      <p className="text-[10px] text-green-800">You saved {formatPrice(appliedCoupon.discount)}</p>
                    </div>
                    <button onClick={handleRemoveCoupon} className="text-green-800 hover:text-green-950">
                      <X size={14} />
                    </button>
                  </div>
                )}

                {/* Pricing summary */}
                <div className="space-y-1.5 text-xs text-text-secondary border-b border-border-light pb-3">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="text-text font-medium">{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>GST (5%)</span>
                    <span className="text-text font-medium">{formatPrice(tax)}</span>
                  </div>
                  {orderType === 'delivery' && (
                    <div className="flex justify-between">
                      <span>Delivery Fee</span>
                      <span className={cn('font-semibold', deliveryCharge === 0 ? 'text-success' : 'text-text')}>
                        {deliveryCharge === 0 ? 'FREE' : formatPrice(deliveryCharge)}
                      </span>
                    </div>
                  )}
                  {discount > 0 && (
                    <div className="flex justify-between text-success font-medium">
                      <span>Discount</span>
                      <span>-{formatPrice(discount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-text font-bold text-sm pt-1.5">
                    <span>Total Bill</span>
                    <span className="text-primary">{formatPrice(total)}</span>
                  </div>
                </div>

                {/* Simple Checkout Fields */}
                <div className="space-y-3 pt-2">
                  <h3 className="text-xs font-bold text-text uppercase tracking-wider">
                    {orderType === 'delivery' ? 'Delivery Details' : orderType === 'dine-in' ? 'Dine-In Details' : 'Takeaway Details'}
                  </h3>
                  
                  <div>
                    <input
                      type="text"
                      placeholder="Your Name *"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className={cn(
                        'w-full px-3 py-2 bg-bg border rounded-lg text-xs placeholder:text-text-tertiary focus:outline-none focus:ring-1 focus:ring-primary',
                        formErrors.name ? 'border-danger' : 'border-border'
                      )}
                    />
                    {formErrors.name && <p className="text-[10px] text-danger mt-0.5">{formErrors.name}</p>}
                  </div>

                  <div>
                    <input
                      type="tel"
                      placeholder="Phone Number (10 digits) *"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                      className={cn(
                        'w-full px-3 py-2 bg-bg border rounded-lg text-xs placeholder:text-text-tertiary focus:outline-none focus:ring-1 focus:ring-primary',
                        formErrors.phone ? 'border-danger' : 'border-border'
                      )}
                    />
                    {formErrors.phone && <p className="text-[10px] text-danger mt-0.5">{formErrors.phone}</p>}
                  </div>

                  {orderType === 'dine-in' && (
                    <div>
                      <input
                        type="text"
                        placeholder="Table Number *"
                        value={tableNumber}
                        onChange={(e) => setTableNumber(e.target.value)}
                        className={cn(
                          'w-full px-3 py-2 bg-bg border rounded-lg text-xs placeholder:text-text-tertiary focus:outline-none focus:ring-1 focus:ring-primary',
                          formErrors.tableNumber ? 'border-danger' : 'border-border'
                        )}
                      />
                      {formErrors.tableNumber && <p className="text-[10px] text-danger mt-0.5">{formErrors.tableNumber}</p>}
                    </div>
                  )}

                  {orderType === 'delivery' && (
                    <div>
                      <input
                        type="text"
                        placeholder="Complete Delivery Address *"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className={cn(
                          'w-full px-3 py-2 bg-bg border rounded-lg text-xs placeholder:text-text-tertiary focus:outline-none focus:ring-1 focus:ring-primary',
                          formErrors.address ? 'border-danger' : 'border-border'
                        )}
                      />
                      {formErrors.address && <p className="text-[10px] text-danger mt-0.5">{formErrors.address}</p>}
                    </div>
                  )}

                  <div>
                    <textarea
                      placeholder="Instructions/Notes (e.g. no onion, extra spicy)"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      rows={2}
                      className="w-full px-3 py-1.5 bg-bg border border-border rounded-lg text-xs placeholder:text-text-tertiary focus:outline-none resize-none"
                    />
                  </div>

                  {/* Place Order CTA */}
                  <button
                    onClick={handleCheckout}
                    disabled={placingOrder}
                    className="w-full py-2.5 bg-primary hover:bg-primary-hover text-white text-xs font-bold rounded-lg shadow-xs transition-colors flex items-center justify-center gap-2 mt-2"
                  >
                    {placingOrder ? (
                      <>
                        <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Placing Order...</span>
                      </>
                    ) : (
                      <span>Place Cash Order ({formatPrice(total)})</span>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer Info */}
      <footer className="bg-white border-t border-border py-4 mt-auto">
        <div className="container-app flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <p className="text-[11px] text-text-secondary">
            © {new Date().getFullYear()} Taste of India. Timings: 11 AM - 11 PM daily.
          </p>
          <div className="flex items-center gap-3 text-[11px] text-text-secondary">
            <span>Dine-In</span> · <span>Takeaway</span> · <span>Express Delivery</span>
          </div>
        </div>
      </footer>

      {/* Mobile Sticky Cart Banner */}
      {cart.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-primary text-white p-3.5 shadow-[0_-4px_12px_rgba(0,0,0,0.15)] flex items-center justify-between lg:hidden border-t border-primary/20 backdrop-blur-md bg-opacity-95">
          <div className="flex flex-col">
            <span className="text-[10px] font-medium uppercase tracking-wider text-white/80">
              {cart.reduce((sum, item) => sum + item.quantity, 0)} Items Added
            </span>
            <span className="text-sm font-extrabold">{formatPrice(total)}</span>
          </div>
          <button
            onClick={() => {
              const element = document.getElementById('checkout-panel');
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="flex items-center gap-1.5 px-4 py-2 bg-white text-primary rounded-lg text-xs font-bold shadow-sm active:scale-95 transition-transform"
          >
            <span>View Cart / Checkout</span>
            <ShoppingCart size={13} />
          </button>
        </div>
      )}
    </div>
  );
}

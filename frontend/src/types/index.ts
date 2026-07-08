// ==========================================
// Taste of India — Core Type Definitions
// ==========================================

// --- Menu & Categories ---

export type SpiceLevel = 0 | 1 | 2 | 3;

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  itemCount: number;
}

export interface MenuItem {
  id: string;
  categoryId: string;
  categorySlug: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  discountPrice?: number;
  image: string;
  isVeg: boolean;
  spiceLevel: SpiceLevel;
  rating: number;
  ratingCount: number;
  isAvailable: boolean;
  isFeatured: boolean;
  isRecommended: boolean;
  isBestseller: boolean;
  tags: string[];
}

// --- Cart ---

export interface CartItem {
  menuItem: MenuItem;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  coupon: AppliedCoupon | null;
  orderType: OrderType;
  addItem: (item: MenuItem) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  applyCoupon: (coupon: AppliedCoupon) => void;
  removeCoupon: () => void;
  setOrderType: (type: OrderType) => void;
  clearCart: () => void;
  getSubtotal: () => number;
  getTax: () => number;
  getDeliveryCharge: () => number;
  getDiscount: () => number;
  getTotal: () => number;
  getTotalItems: () => number;
}

// --- Orders ---

export type OrderType = 'dine-in' | 'takeaway' | 'delivery';

export type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'preparing'
  | 'ready'
  | 'out-for-delivery'
  | 'delivered'
  | 'cancelled';

export type PaymentMethod = 'cod' | 'upi' | 'online';
export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded';

export interface Order {
  id: string;
  orderNumber: string;
  userId: string;
  customerName: string;
  customerPhone: string;
  type: OrderType;
  status: OrderStatus;
  items: OrderItem[];
  subtotal: number;
  tax: number;
  deliveryCharge: number;
  discount: number;
  total: number;
  couponCode?: string;
  address?: Address;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  notes?: string;
  estimatedTime?: number; // minutes
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  id: string;
  menuItemId: string;
  name: string;
  price: number;
  quantity: number;
  isVeg: boolean;
}

// --- Users & Auth ---

export type UserRole = 'customer' | 'admin' | 'staff';

export interface User {
  id: string;
  name: string;
  phone: string;
  email?: string;
  role: UserRole;
  addresses: Address[];
  rewardPoints: number;
  createdAt: string;
}

export interface Address {
  id: string;
  label: string;
  street: string;
  city: string;
  pincode: string;
  isDefault: boolean;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (user: User, token: string) => void;
  logout: () => void;
}

// --- Coupons ---

export type CouponType = 'percentage' | 'flat';

export interface Coupon {
  id: string;
  code: string;
  type: CouponType;
  value: number;
  minOrder: number;
  maxDiscount?: number;
  usageLimit: number;
  usedCount: number;
  expiresAt: string;
  isActive: boolean;
  description: string;
}

export interface AppliedCoupon {
  code: string;
  type: CouponType;
  value: number;
  discount: number;
}

// --- Inventory ---

export interface InventoryItem {
  id: string;
  name: string;
  unit: string;
  quantity: number;
  lowStockThreshold: number;
  lastRestocked: string;
  isLowStock: boolean;
}

// --- Reviews ---

export interface Review {
  id: string;
  userId: string;
  userName: string;
  menuItemId?: string;
  rating: number;
  comment: string;
  createdAt: string;
}

// --- Dashboard Stats ---

export interface DashboardStats {
  todayRevenue: number;
  todayOrders: number;
  pendingOrders: number;
  avgOrderValue: number;
  weeklyRevenue: number[];
  monthlyRevenue: number;
  deliveredToday: number;
  cancelledToday: number;
  topSellingItems: { name: string; count: number }[];
}

// --- Customer (Admin view) ---

export interface CustomerRecord {
  id: string;
  name: string;
  phone: string;
  email?: string;
  totalOrders: number;
  lifetimeSpend: number;
  lastOrderDate: string;
  rewardPoints: number;
  isBlocked: boolean;
  notes?: string;
  createdAt: string;
}

// --- Notification ---

export interface Notification {
  id: string;
  type: 'order' | 'promotion' | 'system';
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

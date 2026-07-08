// ==========================================
// Cart Store — Zustand with localStorage persistence
// ==========================================

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CartItem, MenuItem, AppliedCoupon, OrderType, CartState } from '@/types';

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      coupon: null,
      orderType: 'delivery' as OrderType,

      addItem: (menuItem: MenuItem) => {
        const items = get().items;
        const existing = items.find((i) => i.menuItem.id === menuItem.id);

        if (existing) {
          set({
            items: items.map((i) =>
              i.menuItem.id === menuItem.id
                ? { ...i, quantity: i.quantity + 1 }
                : i
            ),
          });
        } else {
          set({ items: [...items, { menuItem, quantity: 1 }] });
        }
      },

      removeItem: (itemId: string) => {
        set({ items: get().items.filter((i) => i.menuItem.id !== itemId) });
      },

      updateQuantity: (itemId: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(itemId);
          return;
        }
        set({
          items: get().items.map((i) =>
            i.menuItem.id === itemId ? { ...i, quantity } : i
          ),
        });
      },

      applyCoupon: (coupon: AppliedCoupon) => {
        set({ coupon });
      },

      removeCoupon: () => {
        set({ coupon: null });
      },

      setOrderType: (type: OrderType) => {
        set({ orderType: type });
      },

      clearCart: () => {
        set({ items: [], coupon: null });
      },

      getSubtotal: () => {
        return get().items.reduce((sum, item) => {
          const price = item.menuItem.discountPrice ?? item.menuItem.price;
          return sum + price * item.quantity;
        }, 0);
      },

      getTax: () => {
        return Math.round(get().getSubtotal() * 0.05); // 5% GST
      },

      getDeliveryCharge: () => {
        const orderType = get().orderType;
        if (orderType !== 'delivery') return 0;
        const subtotal = get().getSubtotal();
        if (subtotal >= 499) return 0; // Free delivery above ₹499
        return 30;
      },

      getDiscount: () => {
        const coupon = get().coupon;
        if (!coupon) return 0;
        return coupon.discount;
      },

      getTotal: () => {
        const subtotal = get().getSubtotal();
        const tax = get().getTax();
        const delivery = get().getDeliveryCharge();
        const discount = get().getDiscount();
        return Math.max(0, subtotal + tax + delivery - discount);
      },

      getTotalItems: () => {
        return get().items.reduce((sum, item) => sum + item.quantity, 0);
      },
    }),
    {
      name: 'bro-pizza-cart',
      partialize: (state) => ({
        items: state.items,
        coupon: state.coupon,
        orderType: state.orderType,
      }),
    }
  )
);

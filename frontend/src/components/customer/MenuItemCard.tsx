'use client';

import { useState } from 'react';
import { Plus, Star } from 'lucide-react';
import { useCartStore } from '@/store/cart';
import { useToast } from '@/components/ui/Toast';
import QuantitySelector from '@/components/ui/QuantitySelector';
import { formatPrice, cn } from '@/lib/utils';
import type { MenuItem } from '@/types';
import { getUnsplashImageUrlForMenuItem } from '@/lib/mock-data';

interface MenuItemCardProps {
  item: MenuItem;
}

export default function MenuItemCard({ item }: MenuItemCardProps) {
  const addItem = useCartStore((s) => s.addItem);
  const cartItems = useCartStore((s) => s.items);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const { showToast } = useToast();
  const [imgError, setImgError] = useState(false);

  const cartItem = cartItems.find((ci) => ci.menuItem.id === item.id);
  const effectivePrice = item.discountPrice ?? item.price;
  const hasDiscount = item.discountPrice && item.discountPrice < item.price;

  const handleAdd = () => {
    addItem(item);
    showToast(`${item.name} added to cart`);
  };

  const spiceDots = Array.from({ length: 3 }, (_, i) => (
    <span
      key={i}
      className={cn('spice-dot', i < item.spiceLevel && 'active')}
    />
  ));

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-md transition-shadow duration-200 flex flex-col">
      {/* Image */}
      <div className="relative aspect-[4/3] bg-gray-100 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imgError ? getCategoryFallbackImage(item.categorySlug) : (item.image.startsWith('/food/') ? getUnsplashImageUrlForMenuItem(item.categorySlug, item.slug) : item.image)}
          alt={item.name}
          className="w-full h-full object-cover"
          onError={() => setImgError(true)}
        />

        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {item.isBestseller && (
            <span className="badge badge-bestseller">Bestseller</span>
          )}
          {hasDiscount && (
            <span className="badge bg-success-light text-green-700">
              {Math.round(((item.price - effectivePrice) / item.price) * 100)}% OFF
            </span>
          )}
        </div>

        {/* Veg indicator */}
        <div className="absolute top-2 right-2">
          <div className={cn('veg-indicator', item.isVeg ? 'veg' : 'non-veg')} />
        </div>

        {!item.isAvailable && (
          <div className="absolute inset-0 bg-white/70 flex items-center justify-center">
            <span className="text-sm font-semibold text-text-secondary">
              Currently Unavailable
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-3.5 flex flex-col flex-1">
        {/* Name and rating */}
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="font-semibold text-sm text-text leading-snug line-clamp-1">
            {item.name}
          </h3>
          <div className="flex items-center gap-0.5 shrink-0">
            <Star size={12} className="fill-amber-400 text-amber-400" />
            <span className="text-xs font-medium text-text-secondary">
              {item.rating}
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="text-xs text-text-secondary leading-relaxed line-clamp-2 mb-2.5 flex-1">
          {item.description}
        </p>

        {/* Spice level */}
        {item.spiceLevel > 0 && (
          <div className="flex items-center gap-1 mb-2.5">
            <span className="text-[10px] text-text-tertiary uppercase tracking-wide">Spice</span>
            <div className="flex items-center gap-0.5">{spiceDots}</div>
          </div>
        )}

        {/* Price + Add button */}
        <div className="flex items-center justify-between mt-auto pt-1 border-t border-border-light">
          <div className="flex items-baseline gap-1.5">
            <span className="font-bold text-base text-text">
              {formatPrice(effectivePrice)}
            </span>
            {hasDiscount && (
              <span className="text-xs text-text-tertiary line-through">
                {formatPrice(item.price)}
              </span>
            )}
          </div>

          {item.isAvailable && (
            <>
              {cartItem ? (
                <QuantitySelector
                  quantity={cartItem.quantity}
                  onIncrement={() =>
                    updateQuantity(item.id, cartItem.quantity + 1)
                  }
                  onDecrement={() =>
                    updateQuantity(item.id, cartItem.quantity - 1)
                  }
                  compact
                />
              ) : (
                <button
                  onClick={handleAdd}
                  className="flex items-center gap-1 px-3 py-1.5 bg-primary text-white text-xs font-semibold rounded-lg hover:bg-primary-hover transition-colors active:scale-95"
                >
                  <Plus size={13} />
                  ADD
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function getCategoryFallbackImage(slug: string): string {
  const images: Record<string, string> = {
    pizza: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&auto=format&fit=crop&q=80',
    burgers: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&auto=format&fit=crop&q=80',
    momos: 'https://images.unsplash.com/photo-1625220194771-7ebedd0b70b9?w=400&auto=format&fit=crop&q=80',
    rolls: 'https://images.unsplash.com/photo-1626700051175-6518c4793f4f?w=400&auto=format&fit=crop&q=80',
    chinese: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=400&auto=format&fit=crop&q=80',
    pasta: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&auto=format&fit=crop&q=80',
    sandwiches: 'https://images.unsplash.com/photo-1509722747041-616f39b57569?w=400&auto=format&fit=crop&q=80',
    fries: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&auto=format&fit=crop&q=80',
    shakes: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=400&auto=format&fit=crop&q=80',
    coffee: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&auto=format&fit=crop&q=80',
    'cold-drinks': 'https://images.unsplash.com/photo-1497534446932-c925b458314e?w=400&auto=format&fit=crop&q=80',
    combos: 'https://images.unsplash.com/photo-1606787366850-de6330128bfc?w=400&auto=format&fit=crop&q=80',
    desserts: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=400&auto=format&fit=crop&q=80',
  };
  return images[slug] || 'https://images.unsplash.com/photo-1606787366850-de6330128bfc?w=400&auto=format&fit=crop&q=80';
}

'use client';

import { Minus, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface QuantitySelectorProps {
  quantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
  compact?: boolean;
}

export default function QuantitySelector({
  quantity,
  onIncrement,
  onDecrement,
  compact = false,
}: QuantitySelectorProps) {
  return (
    <div
      className={cn(
        'inline-flex items-center border border-border rounded-lg overflow-hidden',
        compact ? 'h-8' : 'h-9'
      )}
    >
      <button
        onClick={onDecrement}
        className={cn(
          'flex items-center justify-center text-text-secondary hover:text-primary hover:bg-primary-light transition-colors',
          compact ? 'w-7 h-8' : 'w-9 h-9'
        )}
        aria-label="Decrease quantity"
      >
        <Minus size={compact ? 13 : 15} />
      </button>
      <span
        className={cn(
          'font-semibold text-text flex items-center justify-center border-x border-border bg-gray-50/50',
          compact ? 'w-8 h-8 text-xs' : 'w-10 h-9 text-sm'
        )}
      >
        {quantity}
      </span>
      <button
        onClick={onIncrement}
        className={cn(
          'flex items-center justify-center text-text-secondary hover:text-primary hover:bg-primary-light transition-colors',
          compact ? 'w-7 h-8' : 'w-9 h-9'
        )}
        aria-label="Increase quantity"
      >
        <Plus size={compact ? 13 : 15} />
      </button>
    </div>
  );
}

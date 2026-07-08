// ==========================================
// Utility functions
// ==========================================

/** Format price in Indian Rupees */
export function formatPrice(amount: number): string {
  return `₹${amount.toLocaleString('en-IN')}`;
}

/** Format date to readable string */
export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

/** Format time */
export function formatTime(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
}

/** Get relative time (e.g., "5 min ago") */
export function getRelativeTime(dateStr: string): string {
  const now = new Date();
  const date = new Date(dateStr);
  const diffMs = now.getTime() - date.getTime();
  const diffMin = Math.floor(diffMs / 60000);

  if (diffMin < 1) return 'Just now';
  if (diffMin < 60) return `${diffMin} min ago`;

  const diffHrs = Math.floor(diffMin / 60);
  if (diffHrs < 24) return `${diffHrs}h ago`;

  const diffDays = Math.floor(diffHrs / 24);
  if (diffDays === 1) return 'Yesterday';
  return `${diffDays} days ago`;
}

/** Readable order status */
export function getStatusLabel(status: string): string {
  const labels: Record<string, string> = {
    'pending': 'Pending',
    'confirmed': 'Confirmed',
    'preparing': 'Preparing',
    'ready': 'Ready',
    'out-for-delivery': 'Out for Delivery',
    'delivered': 'Delivered',
    'cancelled': 'Cancelled',
  };
  return labels[status] || status;
}

/** Readable order type */
export function getOrderTypeLabel(type: string): string {
  const labels: Record<string, string> = {
    'dine-in': 'Dine-in',
    'takeaway': 'Takeaway',
    'delivery': 'Delivery',
  };
  return labels[type] || type;
}

/** Generate a mock order number */
export function generateOrderNumber(): string {
  const num = Math.floor(1000 + Math.random() * 9000);
  return `BRO-${num}`;
}

/** Debounce function */
export function debounce<T extends (...args: unknown[]) => void>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

/** Truncate text */
export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength) + '...';
}

/** cn — simple class name merger */
export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ');
}

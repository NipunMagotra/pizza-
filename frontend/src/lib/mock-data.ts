// ==========================================
// Taste of India — Mock Data
// Realistic Indian fast-food menu with ₹ prices
// ==========================================

import { Category, MenuItem, Order, Coupon, Review, DashboardStats, CustomerRecord, InventoryItem } from '@/types';

// --- Categories ---

export const categories: Category[] = [
  { id: 'cat-1', name: 'Pizza', slug: 'pizza', icon: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=100&auto=format&fit=crop&q=80', itemCount: 6 },
  { id: 'cat-2', name: 'Burgers', slug: 'burgers', icon: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=100&auto=format&fit=crop&q=80', itemCount: 5 },
  { id: 'cat-3', name: 'Momos', slug: 'momos', icon: 'https://images.unsplash.com/photo-1625220194771-7ebedd0b70b9?w=100&auto=format&fit=crop&q=80', itemCount: 6 },
  { id: 'cat-4', name: 'Rolls', slug: 'rolls', icon: 'https://images.unsplash.com/photo-1626700051175-6518c4793f4f?w=100&auto=format&fit=crop&q=80', itemCount: 5 },
  { id: 'cat-5', name: 'Chinese', slug: 'chinese', icon: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=100&auto=format&fit=crop&q=80', itemCount: 6 },
  { id: 'cat-6', name: 'Pasta', slug: 'pasta', icon: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=100&auto=format&fit=crop&q=80', itemCount: 4 },
  { id: 'cat-7', name: 'Sandwiches', slug: 'sandwiches', icon: 'https://images.unsplash.com/photo-1509722747041-616f39b57569?w=100&auto=format&fit=crop&q=80', itemCount: 4 },
  { id: 'cat-8', name: 'Fries', slug: 'fries', icon: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=100&auto=format&fit=crop&q=80', itemCount: 4 },
  { id: 'cat-9', name: 'Shakes', slug: 'shakes', icon: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=100&auto=format&fit=crop&q=80', itemCount: 5 },
  { id: 'cat-10', name: 'Coffee', slug: 'coffee', icon: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=100&auto=format&fit=crop&q=80', itemCount: 4 },
  { id: 'cat-11', name: 'Cold Drinks', slug: 'cold-drinks', icon: 'https://images.unsplash.com/photo-1497534446932-c925b458314e?w=100&auto=format&fit=crop&q=80', itemCount: 5 },
  { id: 'cat-12', name: 'Combos', slug: 'combos', icon: 'https://images.unsplash.com/photo-1606787366850-de6330128bfc?w=100&auto=format&fit=crop&q=80', itemCount: 4 },
  { id: 'cat-13', name: 'Desserts', slug: 'desserts', icon: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=100&auto=format&fit=crop&q=80', itemCount: 5 },
];

// --- Menu Items ---

const rawMenuItems: MenuItem[] = [
  // Pizza
  {
    id: 'item-1', categoryId: 'cat-1', categorySlug: 'pizza',
    name: 'Margherita Pizza', slug: 'margherita-pizza',
    description: 'Classic pizza with fresh mozzarella cheese, tomato sauce, and basil on a thin crust.',
    price: 149, image: '/food/pizza-1.jpg', isVeg: true, spiceLevel: 0,
    rating: 4.5, ratingCount: 328, isAvailable: true, isFeatured: true, isRecommended: true, isBestseller: true,
    tags: ['bestseller', 'classic'],
  },
  {
    id: 'item-2', categoryId: 'cat-1', categorySlug: 'pizza',
    name: 'Farm Fresh Pizza', slug: 'farm-fresh-pizza',
    description: 'Loaded with capsicum, onion, tomato, sweet corn, and olives with mozzarella.',
    price: 199, image: '/food/pizza-2.jpg', isVeg: true, spiceLevel: 1,
    rating: 4.3, ratingCount: 215, isAvailable: true, isFeatured: false, isRecommended: true, isBestseller: false,
    tags: ['veggie'],
  },
  {
    id: 'item-3', categoryId: 'cat-1', categorySlug: 'pizza',
    name: 'Paneer Tikka Pizza', slug: 'paneer-tikka-pizza',
    description: 'Marinated paneer tikka with onion, capsicum, and tandoori sauce on a cheesy base.',
    price: 249, image: '/food/pizza-3.jpg', isVeg: true, spiceLevel: 2,
    rating: 4.6, ratingCount: 189, isAvailable: true, isFeatured: true, isRecommended: false, isBestseller: true,
    tags: ['spicy', 'bestseller'],
  },
  {
    id: 'item-4', categoryId: 'cat-1', categorySlug: 'pizza',
    name: 'Chicken Pepperoni Pizza', slug: 'chicken-pepperoni-pizza',
    description: 'Loaded with chicken pepperoni slices and mozzarella cheese on a classic base.',
    price: 279, image: '/food/pizza-4.jpg', isVeg: false, spiceLevel: 1,
    rating: 4.7, ratingCount: 276, isAvailable: true, isFeatured: true, isRecommended: true, isBestseller: true,
    tags: ['bestseller', 'non-veg'],
  },
  {
    id: 'item-5', categoryId: 'cat-1', categorySlug: 'pizza',
    name: 'BBQ Chicken Pizza', slug: 'bbq-chicken-pizza',
    description: 'Smoky BBQ chicken with onion rings, jalapeño, and a tangy BBQ drizzle.',
    price: 299, image: '/food/pizza-5.jpg', isVeg: false, spiceLevel: 2,
    rating: 4.4, ratingCount: 163, isAvailable: true, isFeatured: false, isRecommended: false, isBestseller: false,
    tags: ['smoky'],
  },
  {
    id: 'item-6', categoryId: 'cat-1', categorySlug: 'pizza',
    name: 'Tandoori Chicken Pizza', slug: 'tandoori-chicken-pizza',
    description: 'Tandoori-style chicken with mint mayo, onion, and capsicum on a stuffed crust.',
    price: 289, image: '/food/pizza-6.jpg', isVeg: false, spiceLevel: 2,
    rating: 4.5, ratingCount: 198, isAvailable: true, isFeatured: false, isRecommended: true, isBestseller: false,
    tags: ['tandoori'],
  },

  // Burgers
  {
    id: 'item-7', categoryId: 'cat-2', categorySlug: 'burgers',
    name: 'Classic Veg Burger', slug: 'classic-veg-burger',
    description: 'Crispy veg patty with lettuce, tomato, onion, and our signature mayo sauce.',
    price: 89, image: '/food/burger-1.jpg', isVeg: true, spiceLevel: 0,
    rating: 4.2, ratingCount: 412, isAvailable: true, isFeatured: false, isRecommended: true, isBestseller: true,
    tags: ['value', 'bestseller'],
  },
  {
    id: 'item-8', categoryId: 'cat-2', categorySlug: 'burgers',
    name: 'Paneer Royale Burger', slug: 'paneer-royale-burger',
    description: 'Thick paneer patty with cheese slice, jalapeno, lettuce, and chipotle sauce.',
    price: 129, image: '/food/burger-2.jpg', isVeg: true, spiceLevel: 1,
    rating: 4.4, ratingCount: 287, isAvailable: true, isFeatured: true, isRecommended: false, isBestseller: false,
    tags: ['premium'],
  },
  {
    id: 'item-9', categoryId: 'cat-2', categorySlug: 'burgers',
    name: 'Chicken Zinger Burger', slug: 'chicken-zinger-burger',
    description: 'Crunchy fried chicken fillet with coleslaw and spicy mayo in a toasted bun.',
    price: 149, image: '/food/burger-3.jpg', isVeg: false, spiceLevel: 2,
    rating: 4.6, ratingCount: 356, isAvailable: true, isFeatured: true, isRecommended: true, isBestseller: true,
    tags: ['spicy', 'bestseller'],
  },
  {
    id: 'item-10', categoryId: 'cat-2', categorySlug: 'burgers',
    name: 'Double Chicken Smash', slug: 'double-chicken-smash',
    description: 'Two smashed chicken patties, double cheese, pickles, and smoky sauce.',
    price: 199, image: '/food/burger-4.jpg', isVeg: false, spiceLevel: 1,
    rating: 4.7, ratingCount: 198, isAvailable: true, isFeatured: true, isRecommended: false, isBestseller: false,
    tags: ['premium', 'heavy'],
  },
  {
    id: 'item-11', categoryId: 'cat-2', categorySlug: 'burgers',
    name: 'Aloo Tikki Burger', slug: 'aloo-tikki-burger',
    description: 'Spiced aloo tikki patty with mint chutney, onion, and tomato in a soft bun.',
    price: 69, image: '/food/burger-5.jpg', isVeg: true, spiceLevel: 1,
    rating: 4.1, ratingCount: 523, isAvailable: true, isFeatured: false, isRecommended: false, isBestseller: true,
    tags: ['value', 'desi'],
  },

  // Momos
  {
    id: 'item-12', categoryId: 'cat-3', categorySlug: 'momos',
    name: 'Steamed Veg Momos', slug: 'steamed-veg-momos',
    description: 'Soft steamed dumplings filled with mixed vegetables, served with spicy red chutney.',
    price: 79, image: '/food/momos-1.jpg', isVeg: true, spiceLevel: 1,
    rating: 4.3, ratingCount: 567, isAvailable: true, isFeatured: false, isRecommended: true, isBestseller: true,
    tags: ['light', 'bestseller'],
  },
  {
    id: 'item-13', categoryId: 'cat-3', categorySlug: 'momos',
    name: 'Steamed Chicken Momos', slug: 'steamed-chicken-momos',
    description: 'Juicy chicken-filled steamed dumplings with a fiery red chutney on the side.',
    price: 99, image: '/food/momos-2.jpg', isVeg: false, spiceLevel: 1,
    rating: 4.5, ratingCount: 489, isAvailable: true, isFeatured: true, isRecommended: true, isBestseller: true,
    tags: ['popular', 'bestseller'],
  },
  {
    id: 'item-14', categoryId: 'cat-3', categorySlug: 'momos',
    name: 'Fried Paneer Momos', slug: 'fried-paneer-momos',
    description: 'Crispy fried momos stuffed with spiced paneer, served with mayo and chutney.',
    price: 109, image: '/food/momos-3.jpg', isVeg: true, spiceLevel: 1,
    rating: 4.4, ratingCount: 312, isAvailable: true, isFeatured: false, isRecommended: false, isBestseller: false,
    tags: ['crispy'],
  },
  {
    id: 'item-15', categoryId: 'cat-3', categorySlug: 'momos',
    name: 'Tandoori Chicken Momos', slug: 'tandoori-chicken-momos',
    description: 'Pan-seared momos tossed in tandoori masala with onion and capsicum.',
    price: 139, image: '/food/momos-4.jpg', isVeg: false, spiceLevel: 3,
    rating: 4.6, ratingCount: 267, isAvailable: true, isFeatured: true, isRecommended: true, isBestseller: false,
    tags: ['spicy', 'tandoori'],
  },
  {
    id: 'item-16', categoryId: 'cat-3', categorySlug: 'momos',
    name: 'Kurkure Momos', slug: 'kurkure-momos',
    description: 'Extra crunchy coated momos with a cheesy filling and tangy dip.',
    price: 119, image: '/food/momos-5.jpg', isVeg: true, spiceLevel: 1,
    rating: 4.3, ratingCount: 198, isAvailable: true, isFeatured: false, isRecommended: false, isBestseller: false,
    tags: ['crunchy'],
  },
  {
    id: 'item-17', categoryId: 'cat-3', categorySlug: 'momos',
    name: 'Afghani Momos', slug: 'afghani-momos',
    description: 'Creamy afghani-style momos in a rich cashew and cream sauce with mild spices.',
    price: 149, image: '/food/momos-6.jpg', isVeg: false, spiceLevel: 1,
    rating: 4.7, ratingCount: 234, isAvailable: true, isFeatured: true, isRecommended: false, isBestseller: true,
    tags: ['creamy', 'premium'],
  },

  // Rolls
  {
    id: 'item-18', categoryId: 'cat-4', categorySlug: 'rolls',
    name: 'Paneer Tikka Roll', slug: 'paneer-tikka-roll',
    description: 'Grilled paneer tikka wrapped in a flaky paratha with mint chutney and onion.',
    price: 99, image: '/food/roll-1.jpg', isVeg: true, spiceLevel: 2,
    rating: 4.4, ratingCount: 345, isAvailable: true, isFeatured: false, isRecommended: true, isBestseller: true,
    tags: ['wraps', 'bestseller'],
  },
  {
    id: 'item-19', categoryId: 'cat-4', categorySlug: 'rolls',
    name: 'Chicken Seekh Roll', slug: 'chicken-seekh-roll',
    description: 'Tender chicken seekh kebab in a rumali roti with green chutney and salad.',
    price: 119, image: '/food/roll-2.jpg', isVeg: false, spiceLevel: 2,
    rating: 4.5, ratingCount: 289, isAvailable: true, isFeatured: true, isRecommended: true, isBestseller: true,
    tags: ['kebab', 'bestseller'],
  },
  {
    id: 'item-20', categoryId: 'cat-4', categorySlug: 'rolls',
    name: 'Egg Roll', slug: 'egg-roll',
    description: 'Fluffy egg omelette wrapped with onion, green chili, and tangy sauce in a paratha.',
    price: 79, image: '/food/roll-3.jpg', isVeg: false, spiceLevel: 1,
    rating: 4.2, ratingCount: 456, isAvailable: true, isFeatured: false, isRecommended: false, isBestseller: false,
    tags: ['value'],
  },
  {
    id: 'item-21', categoryId: 'cat-4', categorySlug: 'rolls',
    name: 'Double Chicken Roll', slug: 'double-chicken-roll',
    description: 'Extra loaded chicken tikka and seekh roll with cheese and spicy mayo.',
    price: 159, image: '/food/roll-4.jpg', isVeg: false, spiceLevel: 2,
    rating: 4.6, ratingCount: 167, isAvailable: true, isFeatured: true, isRecommended: false, isBestseller: false,
    tags: ['heavy', 'premium'],
  },
  {
    id: 'item-22', categoryId: 'cat-4', categorySlug: 'rolls',
    name: 'Aloo Tikki Roll', slug: 'aloo-tikki-roll',
    description: 'Crispy aloo tikki with chole, onion, and chutneys wrapped in a soft paratha.',
    price: 69, image: '/food/roll-5.jpg', isVeg: true, spiceLevel: 1,
    rating: 4.1, ratingCount: 389, isAvailable: true, isFeatured: false, isRecommended: false, isBestseller: false,
    tags: ['value', 'desi'],
  },

  // Chinese
  {
    id: 'item-23', categoryId: 'cat-5', categorySlug: 'chinese',
    name: 'Veg Manchurian', slug: 'veg-manchurian',
    description: 'Crispy vegetable balls in a tangy soy-chili Manchurian sauce with spring onion.',
    price: 129, image: '/food/chinese-1.jpg', isVeg: true, spiceLevel: 2,
    rating: 4.3, ratingCount: 278, isAvailable: true, isFeatured: false, isRecommended: true, isBestseller: true,
    tags: ['indo-chinese', 'bestseller'],
  },
  {
    id: 'item-24', categoryId: 'cat-5', categorySlug: 'chinese',
    name: 'Chilli Chicken', slug: 'chilli-chicken',
    description: 'Boneless chicken tossed with green chillies, soy sauce, and bell peppers.',
    price: 169, image: '/food/chinese-2.jpg', isVeg: false, spiceLevel: 3,
    rating: 4.6, ratingCount: 334, isAvailable: true, isFeatured: true, isRecommended: true, isBestseller: true,
    tags: ['spicy', 'bestseller'],
  },
  {
    id: 'item-25', categoryId: 'cat-5', categorySlug: 'chinese',
    name: 'Veg Fried Rice', slug: 'veg-fried-rice',
    description: 'Wok-tossed basmati rice with mixed veggies, soy sauce, and a hint of garlic.',
    price: 109, image: '/food/chinese-3.jpg', isVeg: true, spiceLevel: 1,
    rating: 4.2, ratingCount: 445, isAvailable: true, isFeatured: false, isRecommended: false, isBestseller: false,
    tags: ['rice'],
  },
  {
    id: 'item-26', categoryId: 'cat-5', categorySlug: 'chinese',
    name: 'Chicken Fried Rice', slug: 'chicken-fried-rice',
    description: 'Classic chicken fried rice with egg, spring onion, and soy sauce.',
    price: 139, image: '/food/chinese-4.jpg', isVeg: false, spiceLevel: 1,
    rating: 4.4, ratingCount: 312, isAvailable: true, isFeatured: false, isRecommended: true, isBestseller: false,
    tags: ['rice'],
  },
  {
    id: 'item-27', categoryId: 'cat-5', categorySlug: 'chinese',
    name: 'Hakka Noodles', slug: 'hakka-noodles',
    description: 'Stir-fried noodles with vegetables, soy sauce, and a touch of vinegar.',
    price: 109, image: '/food/chinese-5.jpg', isVeg: true, spiceLevel: 1,
    rating: 4.3, ratingCount: 398, isAvailable: true, isFeatured: false, isRecommended: false, isBestseller: true,
    tags: ['noodles'],
  },
  {
    id: 'item-28', categoryId: 'cat-5', categorySlug: 'chinese',
    name: 'Chicken Manchurian', slug: 'chicken-manchurian',
    description: 'Crispy chicken in a sweet-spicy Manchurian gravy with spring onions.',
    price: 159, image: '/food/chinese-6.jpg', isVeg: false, spiceLevel: 2,
    rating: 4.5, ratingCount: 256, isAvailable: true, isFeatured: true, isRecommended: false, isBestseller: false,
    tags: ['indo-chinese'],
  },

  // Pasta
  {
    id: 'item-29', categoryId: 'cat-6', categorySlug: 'pasta',
    name: 'White Sauce Pasta', slug: 'white-sauce-pasta',
    description: 'Creamy béchamel sauce with penne, mushrooms, corn, and a dash of herbs.',
    price: 149, image: '/food/pasta-1.jpg', isVeg: true, spiceLevel: 0,
    rating: 4.4, ratingCount: 267, isAvailable: true, isFeatured: false, isRecommended: true, isBestseller: true,
    tags: ['creamy', 'bestseller'],
  },
  {
    id: 'item-30', categoryId: 'cat-6', categorySlug: 'pasta',
    name: 'Arrabbiata Pasta', slug: 'arrabbiata-pasta',
    description: 'Penne in a spicy tomato-garlic sauce with olives, basil, and chili flakes.',
    price: 139, image: '/food/pasta-2.jpg', isVeg: true, spiceLevel: 2,
    rating: 4.2, ratingCount: 189, isAvailable: true, isFeatured: false, isRecommended: false, isBestseller: false,
    tags: ['spicy'],
  },
  {
    id: 'item-31', categoryId: 'cat-6', categorySlug: 'pasta',
    name: 'Pink Sauce Pasta', slug: 'pink-sauce-pasta',
    description: 'A blend of creamy white and tangy red sauce with mixed veggies and herbs.',
    price: 159, image: '/food/pasta-3.jpg', isVeg: true, spiceLevel: 1,
    rating: 4.5, ratingCount: 234, isAvailable: true, isFeatured: true, isRecommended: true, isBestseller: false,
    tags: ['popular'],
  },
  {
    id: 'item-32', categoryId: 'cat-6', categorySlug: 'pasta',
    name: 'Chicken Alfredo Pasta', slug: 'chicken-alfredo-pasta',
    description: 'Grilled chicken with fettuccine in a rich parmesan cream sauce.',
    price: 189, image: '/food/pasta-4.jpg', isVeg: false, spiceLevel: 0,
    rating: 4.6, ratingCount: 178, isAvailable: true, isFeatured: true, isRecommended: false, isBestseller: false,
    tags: ['premium', 'creamy'],
  },

  // Sandwiches
  {
    id: 'item-33', categoryId: 'cat-7', categorySlug: 'sandwiches',
    name: 'Veg Club Sandwich', slug: 'veg-club-sandwich',
    description: 'Triple-decker grilled sandwich with veggies, cheese, and herb mayo.',
    price: 89, image: '/food/sandwich-1.jpg', isVeg: true, spiceLevel: 0,
    rating: 4.2, ratingCount: 234, isAvailable: true, isFeatured: false, isRecommended: true, isBestseller: false,
    tags: ['light'],
  },
  {
    id: 'item-34', categoryId: 'cat-7', categorySlug: 'sandwiches',
    name: 'Paneer Tikka Sandwich', slug: 'paneer-tikka-sandwich',
    description: 'Grilled paneer tikka with mint mayo, onion, and capsicum in toasted bread.',
    price: 109, image: '/food/sandwich-2.jpg', isVeg: true, spiceLevel: 2,
    rating: 4.4, ratingCount: 187, isAvailable: true, isFeatured: false, isRecommended: false, isBestseller: false,
    tags: ['grilled'],
  },
  {
    id: 'item-35', categoryId: 'cat-7', categorySlug: 'sandwiches',
    name: 'Chicken Tikka Sandwich', slug: 'chicken-tikka-sandwich',
    description: 'Spiced chicken tikka with cheese, lettuce, and garlic mayo in multigrain bread.',
    price: 129, image: '/food/sandwich-3.jpg', isVeg: false, spiceLevel: 2,
    rating: 4.5, ratingCount: 212, isAvailable: true, isFeatured: true, isRecommended: true, isBestseller: true,
    tags: ['grilled', 'bestseller'],
  },
  {
    id: 'item-36', categoryId: 'cat-7', categorySlug: 'sandwiches',
    name: 'Classic Grilled Cheese', slug: 'classic-grilled-cheese',
    description: 'Golden grilled sandwich with melting cheddar and mozzarella cheese.',
    price: 79, image: '/food/sandwich-4.jpg', isVeg: true, spiceLevel: 0,
    rating: 4.3, ratingCount: 345, isAvailable: true, isFeatured: false, isRecommended: false, isBestseller: true,
    tags: ['comfort', 'classic'],
  },

  // Fries
  {
    id: 'item-37', categoryId: 'cat-8', categorySlug: 'fries',
    name: 'Classic French Fries', slug: 'classic-french-fries',
    description: 'Golden crispy fries seasoned with salt. Simple and perfect.',
    price: 79, image: '/food/fries-1.jpg', isVeg: true, spiceLevel: 0,
    rating: 4.3, ratingCount: 567, isAvailable: true, isFeatured: false, isRecommended: true, isBestseller: true,
    tags: ['sides', 'classic'],
  },
  {
    id: 'item-38', categoryId: 'cat-8', categorySlug: 'fries',
    name: 'Peri Peri Fries', slug: 'peri-peri-fries',
    description: 'Fries tossed in a fiery peri peri seasoning with a cheesy dip.',
    price: 99, image: '/food/fries-2.jpg', isVeg: true, spiceLevel: 2,
    rating: 4.4, ratingCount: 345, isAvailable: true, isFeatured: false, isRecommended: false, isBestseller: false,
    tags: ['spicy'],
  },
  {
    id: 'item-39', categoryId: 'cat-8', categorySlug: 'fries',
    name: 'Cheese Loaded Fries', slug: 'cheese-loaded-fries',
    description: 'Crispy fries smothered in melted cheese sauce with jalapeños.',
    price: 129, image: '/food/fries-3.jpg', isVeg: true, spiceLevel: 1,
    rating: 4.5, ratingCount: 289, isAvailable: true, isFeatured: true, isRecommended: true, isBestseller: true,
    tags: ['cheesy', 'bestseller'],
  },
  {
    id: 'item-40', categoryId: 'cat-8', categorySlug: 'fries',
    name: 'Masala Fries', slug: 'masala-fries',
    description: 'Fries tossed with chaat masala, lime, and fresh coriander. Desi twist!',
    price: 89, image: '/food/fries-4.jpg', isVeg: true, spiceLevel: 1,
    rating: 4.2, ratingCount: 234, isAvailable: true, isFeatured: false, isRecommended: false, isBestseller: false,
    tags: ['desi'],
  },

  // Shakes
  {
    id: 'item-41', categoryId: 'cat-9', categorySlug: 'shakes',
    name: 'Mango Shake', slug: 'mango-shake',
    description: 'Thick and creamy mango milkshake made with real Alphonso mango pulp.',
    price: 89, image: '/food/shake-1.jpg', isVeg: true, spiceLevel: 0,
    rating: 4.6, ratingCount: 456, isAvailable: true, isFeatured: true, isRecommended: true, isBestseller: true,
    tags: ['summer', 'bestseller'],
  },
  {
    id: 'item-42', categoryId: 'cat-9', categorySlug: 'shakes',
    name: 'Oreo Shake', slug: 'oreo-shake',
    description: 'Rich chocolate shake blended with crushed Oreo cookies and whipped cream.',
    price: 109, image: '/food/shake-2.jpg', isVeg: true, spiceLevel: 0,
    rating: 4.7, ratingCount: 389, isAvailable: true, isFeatured: true, isRecommended: false, isBestseller: true,
    tags: ['chocolate', 'bestseller'],
  },
  {
    id: 'item-43', categoryId: 'cat-9', categorySlug: 'shakes',
    name: 'Chocolate Shake', slug: 'chocolate-shake',
    description: 'Classic chocolate milkshake with real cocoa and a scoop of vanilla ice cream.',
    price: 99, image: '/food/shake-3.jpg', isVeg: true, spiceLevel: 0,
    rating: 4.5, ratingCount: 312, isAvailable: true, isFeatured: false, isRecommended: true, isBestseller: false,
    tags: ['classic'],
  },
  {
    id: 'item-44', categoryId: 'cat-9', categorySlug: 'shakes',
    name: 'Butterscotch Shake', slug: 'butterscotch-shake',
    description: 'Creamy butterscotch milkshake with caramel drizzle and crunchy bits.',
    price: 99, image: '/food/shake-4.jpg', isVeg: true, spiceLevel: 0,
    rating: 4.4, ratingCount: 234, isAvailable: true, isFeatured: false, isRecommended: false, isBestseller: false,
    tags: ['caramel'],
  },
  {
    id: 'item-45', categoryId: 'cat-9', categorySlug: 'shakes',
    name: 'Strawberry Shake', slug: 'strawberry-shake',
    description: 'Fresh strawberry milkshake with real fruit pieces and a creamy finish.',
    price: 99, image: '/food/shake-5.jpg', isVeg: true, spiceLevel: 0,
    rating: 4.3, ratingCount: 198, isAvailable: true, isFeatured: false, isRecommended: false, isBestseller: false,
    tags: ['fruity'],
  },

  // Coffee
  {
    id: 'item-46', categoryId: 'cat-10', categorySlug: 'coffee',
    name: 'Hot Coffee', slug: 'hot-coffee',
    description: 'Classic Indian-style hot coffee made with milk and decoction.',
    price: 49, image: '/food/coffee-1.jpg', isVeg: true, spiceLevel: 0,
    rating: 4.2, ratingCount: 567, isAvailable: true, isFeatured: false, isRecommended: false, isBestseller: true,
    tags: ['hot', 'classic'],
  },
  {
    id: 'item-47', categoryId: 'cat-10', categorySlug: 'coffee',
    name: 'Cold Coffee', slug: 'cold-coffee',
    description: 'Chilled coffee blended with ice cream, milk, and a hint of chocolate.',
    price: 89, image: '/food/coffee-2.jpg', isVeg: true, spiceLevel: 0,
    rating: 4.5, ratingCount: 445, isAvailable: true, isFeatured: true, isRecommended: true, isBestseller: true,
    tags: ['summer', 'bestseller'],
  },
  {
    id: 'item-48', categoryId: 'cat-10', categorySlug: 'coffee',
    name: 'Cappuccino', slug: 'cappuccino',
    description: 'Rich espresso topped with steamed milk foam and cocoa powder.',
    price: 109, image: '/food/coffee-3.jpg', isVeg: true, spiceLevel: 0,
    rating: 4.4, ratingCount: 234, isAvailable: true, isFeatured: false, isRecommended: false, isBestseller: false,
    tags: ['premium'],
  },
  {
    id: 'item-49', categoryId: 'cat-10', categorySlug: 'coffee',
    name: 'Café Latte', slug: 'cafe-latte',
    description: 'Smooth espresso with velvety steamed milk and light foam.',
    price: 119, image: '/food/coffee-4.jpg', isVeg: true, spiceLevel: 0,
    rating: 4.3, ratingCount: 178, isAvailable: true, isFeatured: false, isRecommended: false, isBestseller: false,
    tags: ['premium'],
  },

  // Cold Drinks
  {
    id: 'item-50', categoryId: 'cat-11', categorySlug: 'cold-drinks',
    name: 'Coca-Cola', slug: 'coca-cola',
    description: 'Chilled 300ml bottle of Coca-Cola.', price: 40,
    image: '/food/drink-1.jpg', isVeg: true, spiceLevel: 0,
    rating: 4.0, ratingCount: 890, isAvailable: true, isFeatured: false, isRecommended: false, isBestseller: false,
    tags: ['beverage'],
  },
  {
    id: 'item-51', categoryId: 'cat-11', categorySlug: 'cold-drinks',
    name: 'Sprite', slug: 'sprite',
    description: 'Chilled 300ml bottle of Sprite.', price: 40,
    image: '/food/drink-2.jpg', isVeg: true, spiceLevel: 0,
    rating: 4.0, ratingCount: 678, isAvailable: true, isFeatured: false, isRecommended: false, isBestseller: false,
    tags: ['beverage'],
  },
  {
    id: 'item-52', categoryId: 'cat-11', categorySlug: 'cold-drinks',
    name: 'Thumbs Up', slug: 'thumbs-up',
    description: 'Chilled 300ml bottle of Thumbs Up.', price: 40,
    image: '/food/drink-3.jpg', isVeg: true, spiceLevel: 0,
    rating: 4.0, ratingCount: 567, isAvailable: true, isFeatured: false, isRecommended: false, isBestseller: false,
    tags: ['beverage'],
  },
  {
    id: 'item-53', categoryId: 'cat-11', categorySlug: 'cold-drinks',
    name: 'Fresh Lime Soda', slug: 'fresh-lime-soda',
    description: 'Freshly squeezed lime with soda water. Sweet or salted — your choice.',
    price: 49, image: '/food/drink-4.jpg', isVeg: true, spiceLevel: 0,
    rating: 4.3, ratingCount: 345, isAvailable: true, isFeatured: false, isRecommended: true, isBestseller: true,
    tags: ['fresh', 'bestseller'],
  },
  {
    id: 'item-54', categoryId: 'cat-11', categorySlug: 'cold-drinks',
    name: 'Masala Chaas', slug: 'masala-chaas',
    description: 'Refreshing spiced buttermilk with cumin, mint, and a pinch of rock salt.',
    price: 39, image: '/food/drink-5.jpg', isVeg: true, spiceLevel: 0,
    rating: 4.4, ratingCount: 289, isAvailable: true, isFeatured: false, isRecommended: false, isBestseller: false,
    tags: ['desi', 'refreshing'],
  },

  // Combos
  {
    id: 'item-55', categoryId: 'cat-12', categorySlug: 'combos',
    name: 'Pizza Meal Deal', slug: 'pizza-meal-deal',
    description: 'Margherita Pizza + French Fries + Coca-Cola. Save ₹68!',
    price: 199, discountPrice: 149, image: '/food/combo-1.jpg', isVeg: true, spiceLevel: 0,
    rating: 4.5, ratingCount: 234, isAvailable: true, isFeatured: true, isRecommended: true, isBestseller: true,
    tags: ['value', 'combo', 'bestseller'],
  },
  {
    id: 'item-56', categoryId: 'cat-12', categorySlug: 'combos',
    name: 'Burger Combo', slug: 'burger-combo',
    description: 'Chicken Zinger Burger + Peri Peri Fries + Cold Drink. Save ₹89!',
    price: 249, discountPrice: 199, image: '/food/combo-2.jpg', isVeg: false, spiceLevel: 1,
    rating: 4.6, ratingCount: 189, isAvailable: true, isFeatured: true, isRecommended: true, isBestseller: true,
    tags: ['value', 'combo', 'bestseller'],
  },
  {
    id: 'item-57', categoryId: 'cat-12', categorySlug: 'combos',
    name: 'Momos Party Pack', slug: 'momos-party-pack',
    description: '2 plates of Steamed Momos (Veg + Chicken) + 2 Cold Drinks. Perfect for sharing!',
    price: 299, discountPrice: 229, image: '/food/combo-3.jpg', isVeg: false, spiceLevel: 1,
    rating: 4.4, ratingCount: 156, isAvailable: true, isFeatured: false, isRecommended: false, isBestseller: false,
    tags: ['sharing', 'combo'],
  },
  {
    id: 'item-58', categoryId: 'cat-12', categorySlug: 'combos',
    name: 'Couple Combo', slug: 'couple-combo',
    description: '2 Pizzas + 2 Shakes + Cheese Fries. A date night feast!',
    price: 499, discountPrice: 399, image: '/food/combo-4.jpg', isVeg: true, spiceLevel: 0,
    rating: 4.7, ratingCount: 123, isAvailable: true, isFeatured: true, isRecommended: true, isBestseller: false,
    tags: ['premium', 'combo', 'date'],
  },

  // Desserts
  {
    id: 'item-59', categoryId: 'cat-13', categorySlug: 'desserts',
    name: 'Gulab Jamun (2 pcs)', slug: 'gulab-jamun',
    description: 'Soft, warm gulab jamuns soaked in cardamom-infused sugar syrup.',
    price: 49, image: '/food/dessert-1.jpg', isVeg: true, spiceLevel: 0,
    rating: 4.3, ratingCount: 345, isAvailable: true, isFeatured: false, isRecommended: false, isBestseller: true,
    tags: ['indian', 'sweet'],
  },
  {
    id: 'item-60', categoryId: 'cat-13', categorySlug: 'desserts',
    name: 'Chocolate Brownie', slug: 'chocolate-brownie',
    description: 'Warm, fudgy chocolate brownie served with vanilla ice cream and chocolate sauce.',
    price: 99, image: '/food/dessert-2.jpg', isVeg: true, spiceLevel: 0,
    rating: 4.6, ratingCount: 278, isAvailable: true, isFeatured: true, isRecommended: true, isBestseller: true,
    tags: ['chocolate', 'bestseller'],
  },
  {
    id: 'item-61', categoryId: 'cat-13', categorySlug: 'desserts',
    name: 'Chocolate Lava Cake', slug: 'chocolate-lava-cake',
    description: 'Rich molten chocolate cake with a gooey center and a dusting of cocoa.',
    price: 139, image: '/food/dessert-3.jpg', isVeg: true, spiceLevel: 0,
    rating: 4.7, ratingCount: 198, isAvailable: true, isFeatured: true, isRecommended: true, isBestseller: false,
    tags: ['premium', 'chocolate'],
  },
  {
    id: 'item-62', categoryId: 'cat-13', categorySlug: 'desserts',
    name: 'Vanilla Ice Cream', slug: 'vanilla-ice-cream',
    description: 'Two scoops of creamy vanilla ice cream with a wafer.',
    price: 69, image: '/food/dessert-4.jpg', isVeg: true, spiceLevel: 0,
    rating: 4.2, ratingCount: 456, isAvailable: true, isFeatured: false, isRecommended: false, isBestseller: false,
    tags: ['cold', 'classic'],
  },
  {
    id: 'item-63', categoryId: 'cat-13', categorySlug: 'desserts',
    name: 'Rasmalai (2 pcs)', slug: 'rasmalai',
    description: 'Soft paneer discs soaked in sweet saffron milk with crushed pistachios.',
    price: 79, image: '/food/dessert-5.jpg', isVeg: true, spiceLevel: 0,
    rating: 4.5, ratingCount: 267, isAvailable: true, isFeatured: false, isRecommended: true, isBestseller: false,
    tags: ['indian', 'premium'],
  },
];

// --- Coupons ---

export const coupons: Coupon[] = [
  {
    id: 'coupon-1', code: 'WELCOME50', type: 'percentage', value: 50, minOrder: 199, maxDiscount: 100,
    usageLimit: 1, usedCount: 0, expiresAt: '2026-12-31', isActive: true,
    description: '50% off on your first order (up to ₹100)',
  },
  {
    id: 'coupon-2', code: 'BRO20', type: 'percentage', value: 20, minOrder: 299, maxDiscount: 150,
    usageLimit: 100, usedCount: 45, expiresAt: '2026-08-31', isActive: true,
    description: '20% off on orders above ₹299',
  },
  {
    id: 'coupon-3', code: 'FLAT100', type: 'flat', value: 100, minOrder: 499,
    usageLimit: 50, usedCount: 23, expiresAt: '2026-09-30', isActive: true,
    description: 'Flat ₹100 off on orders above ₹499',
  },
  {
    id: 'coupon-4', code: 'WEEKEND30', type: 'percentage', value: 30, minOrder: 399, maxDiscount: 200,
    usageLimit: 200, usedCount: 89, expiresAt: '2026-08-15', isActive: true,
    description: '30% off on weekend orders (up to ₹200)',
  },
  {
    id: 'coupon-5', code: 'FREEDELIVERY', type: 'flat', value: 40, minOrder: 199,
    usageLimit: 500, usedCount: 234, expiresAt: '2026-12-31', isActive: true,
    description: 'Free delivery on orders above ₹199',
  },
];

// --- Reviews ---

export const reviews: Review[] = [
  { id: 'rev-1', userId: 'u-1', userName: 'Rahul Sharma', rating: 5, comment: 'Best pizza in town! The Paneer Tikka Pizza is absolutely amazing. Fast delivery too.', createdAt: '2026-07-05' },
  { id: 'rev-2', userId: 'u-2', userName: 'Priya Singh', rating: 4, comment: 'Love the momos here. Tandoori momos are to die for! Consistent quality every time.', createdAt: '2026-07-04' },
  { id: 'rev-3', userId: 'u-3', userName: 'Amit Patel', rating: 5, comment: 'Ordered the Burger Combo for a family dinner. Everyone loved it. Great value for money.', createdAt: '2026-07-03' },
  { id: 'rev-4', userId: 'u-4', userName: 'Neha Gupta', rating: 4, comment: 'The Oreo Shake is heavenly! A bit pricey but totally worth it. Quick delivery.', createdAt: '2026-07-02' },
  { id: 'rev-5', userId: 'u-5', userName: 'Vikram Joshi', rating: 5, comment: 'Fresh ingredients and amazing taste. The Chilli Chicken is exactly like restaurant quality.', createdAt: '2026-07-01' },
  { id: 'rev-6', userId: 'u-6', userName: 'Ananya Reddy', rating: 4, comment: 'Reliable and tasty! I order from here every weekend. Never disappointed.', createdAt: '2026-06-30' },
];

// --- Sample Orders (for admin) ---

export const sampleOrders: Order[] = [
  {
    id: 'ord-1', orderNumber: 'BRO-1001', userId: 'u-1', customerName: 'Rahul Sharma', customerPhone: '9876543210',
    type: 'delivery', status: 'preparing',
    items: [
      { id: 'oi-1', menuItemId: 'item-3', name: 'Paneer Tikka Pizza', price: 249, quantity: 1, isVeg: true },
      { id: 'oi-2', menuItemId: 'item-37', name: 'Classic French Fries', price: 79, quantity: 1, isVeg: true },
      { id: 'oi-3', menuItemId: 'item-50', name: 'Coca-Cola', price: 40, quantity: 2, isVeg: true },
    ],
    subtotal: 408, tax: 20, deliveryCharge: 30, discount: 0, total: 458,
    address: { id: 'addr-1', label: 'Home', street: '42, Rajpur Road', city: 'Dehradun', pincode: '248001', isDefault: true },
    paymentMethod: 'cod', paymentStatus: 'pending', notes: 'Extra cheese on pizza please',
    estimatedTime: 35, createdAt: '2026-07-07T12:30:00', updatedAt: '2026-07-07T12:35:00',
  },
  {
    id: 'ord-2', orderNumber: 'BRO-1002', userId: 'u-2', customerName: 'Priya Singh', customerPhone: '9876543211',
    type: 'takeaway', status: 'confirmed',
    items: [
      { id: 'oi-4', menuItemId: 'item-13', name: 'Steamed Chicken Momos', price: 99, quantity: 2, isVeg: false },
      { id: 'oi-5', menuItemId: 'item-15', name: 'Tandoori Chicken Momos', price: 139, quantity: 1, isVeg: false },
    ],
    subtotal: 337, tax: 17, deliveryCharge: 0, discount: 67, total: 287,
    couponCode: 'BRO20',
    paymentMethod: 'upi', paymentStatus: 'paid',
    estimatedTime: 20, createdAt: '2026-07-07T12:15:00', updatedAt: '2026-07-07T12:18:00',
  },
  {
    id: 'ord-3', orderNumber: 'BRO-1003', userId: 'u-3', customerName: 'Amit Patel', customerPhone: '9876543212',
    type: 'delivery', status: 'out-for-delivery',
    items: [
      { id: 'oi-6', menuItemId: 'item-56', name: 'Burger Combo', price: 199, quantity: 2, isVeg: false },
      { id: 'oi-7', menuItemId: 'item-42', name: 'Oreo Shake', price: 109, quantity: 2, isVeg: true },
    ],
    subtotal: 616, tax: 31, deliveryCharge: 30, discount: 100, total: 577,
    couponCode: 'FLAT100',
    address: { id: 'addr-2', label: 'Office', street: '15, IT Park', city: 'Dehradun', pincode: '248001', isDefault: false },
    paymentMethod: 'online', paymentStatus: 'paid',
    estimatedTime: 10, createdAt: '2026-07-07T11:45:00', updatedAt: '2026-07-07T12:25:00',
  },
  {
    id: 'ord-4', orderNumber: 'BRO-1004', userId: 'u-4', customerName: 'Neha Gupta', customerPhone: '9876543213',
    type: 'dine-in', status: 'delivered',
    items: [
      { id: 'oi-8', menuItemId: 'item-29', name: 'White Sauce Pasta', price: 149, quantity: 1, isVeg: true },
      { id: 'oi-9', menuItemId: 'item-47', name: 'Cold Coffee', price: 89, quantity: 1, isVeg: true },
      { id: 'oi-10', menuItemId: 'item-60', name: 'Chocolate Brownie', price: 99, quantity: 1, isVeg: true },
    ],
    subtotal: 337, tax: 17, deliveryCharge: 0, discount: 0, total: 354,
    paymentMethod: 'upi', paymentStatus: 'paid',
    createdAt: '2026-07-07T11:00:00', updatedAt: '2026-07-07T11:45:00',
  },
  {
    id: 'ord-5', orderNumber: 'BRO-1005', userId: 'u-5', customerName: 'Vikram Joshi', customerPhone: '9876543214',
    type: 'delivery', status: 'pending',
    items: [
      { id: 'oi-11', menuItemId: 'item-24', name: 'Chilli Chicken', price: 169, quantity: 1, isVeg: false },
      { id: 'oi-12', menuItemId: 'item-26', name: 'Chicken Fried Rice', price: 139, quantity: 1, isVeg: false },
      { id: 'oi-13', menuItemId: 'item-27', name: 'Hakka Noodles', price: 109, quantity: 1, isVeg: true },
    ],
    subtotal: 417, tax: 21, deliveryCharge: 30, discount: 0, total: 468,
    address: { id: 'addr-3', label: 'Home', street: '7, Clock Tower', city: 'Dehradun', pincode: '248001', isDefault: true },
    paymentMethod: 'cod', paymentStatus: 'pending', notes: 'Make the chilli chicken extra spicy',
    estimatedTime: 40, createdAt: '2026-07-07T13:00:00', updatedAt: '2026-07-07T13:00:00',
  },
  {
    id: 'ord-6', orderNumber: 'BRO-1006', userId: 'u-6', customerName: 'Ananya Reddy', customerPhone: '9876543215',
    type: 'takeaway', status: 'ready',
    items: [
      { id: 'oi-14', menuItemId: 'item-9', name: 'Chicken Zinger Burger', price: 149, quantity: 2, isVeg: false },
      { id: 'oi-15', menuItemId: 'item-39', name: 'Cheese Loaded Fries', price: 129, quantity: 1, isVeg: true },
    ],
    subtotal: 427, tax: 21, deliveryCharge: 0, discount: 85, total: 363,
    couponCode: 'BRO20',
    paymentMethod: 'upi', paymentStatus: 'paid',
    createdAt: '2026-07-07T12:45:00', updatedAt: '2026-07-07T13:10:00',
  },
];

// --- Dashboard Stats ---

export const dashboardStats: DashboardStats = {
  todayRevenue: 12450,
  todayOrders: 34,
  pendingOrders: 5,
  avgOrderValue: 366,
  weeklyRevenue: [8200, 9100, 11300, 10800, 12450, 14200, 13600],
  monthlyRevenue: 285000,
  deliveredToday: 26,
  cancelledToday: 2,
  topSellingItems: [
    { name: 'Paneer Tikka Pizza', count: 45 },
    { name: 'Steamed Chicken Momos', count: 38 },
    { name: 'Chicken Zinger Burger', count: 32 },
    { name: 'Oreo Shake', count: 28 },
    { name: 'Classic French Fries', count: 27 },
    { name: 'Cold Coffee', count: 24 },
    { name: 'White Sauce Pasta', count: 22 },
    { name: 'Chilli Chicken', count: 20 },
  ],
};

// --- Customer Records (for admin) ---

export const customerRecords: CustomerRecord[] = [
  { id: 'u-1', name: 'Rahul Sharma', phone: '9876543210', email: 'rahul@email.com', totalOrders: 23, lifetimeSpend: 8450, lastOrderDate: '2026-07-07', rewardPoints: 845, isBlocked: false, createdAt: '2026-01-15' },
  { id: 'u-2', name: 'Priya Singh', phone: '9876543211', email: 'priya@email.com', totalOrders: 18, lifetimeSpend: 6230, lastOrderDate: '2026-07-07', rewardPoints: 623, isBlocked: false, createdAt: '2026-02-08' },
  { id: 'u-3', name: 'Amit Patel', phone: '9876543212', totalOrders: 31, lifetimeSpend: 11200, lastOrderDate: '2026-07-07', rewardPoints: 1120, isBlocked: false, createdAt: '2025-11-20' },
  { id: 'u-4', name: 'Neha Gupta', phone: '9876543213', email: 'neha@email.com', totalOrders: 12, lifetimeSpend: 4100, lastOrderDate: '2026-07-07', rewardPoints: 410, isBlocked: false, createdAt: '2026-03-01' },
  { id: 'u-5', name: 'Vikram Joshi', phone: '9876543214', totalOrders: 8, lifetimeSpend: 3200, lastOrderDate: '2026-07-07', rewardPoints: 320, isBlocked: false, createdAt: '2026-04-15' },
  { id: 'u-6', name: 'Ananya Reddy', phone: '9876543215', email: 'ananya@email.com', totalOrders: 15, lifetimeSpend: 5800, lastOrderDate: '2026-07-07', rewardPoints: 580, isBlocked: false, createdAt: '2026-01-28' },
  { id: 'u-7', name: 'Rohan Mehta', phone: '9876543216', totalOrders: 5, lifetimeSpend: 1800, lastOrderDate: '2026-06-28', rewardPoints: 180, isBlocked: false, createdAt: '2026-05-10' },
  { id: 'u-8', name: 'Kavita Iyer', phone: '9876543217', email: 'kavita@email.com', totalOrders: 42, lifetimeSpend: 15600, lastOrderDate: '2026-07-06', rewardPoints: 1560, isBlocked: false, notes: 'VIP customer — always orders combos', createdAt: '2025-09-05' },
];

// --- Inventory ---

export const inventoryItems: InventoryItem[] = [
  { id: 'inv-1', name: 'Mozzarella Cheese', unit: 'kg', quantity: 8, lowStockThreshold: 5, lastRestocked: '2026-07-05', isLowStock: false },
  { id: 'inv-2', name: 'Pizza Dough', unit: 'kg', quantity: 12, lowStockThreshold: 5, lastRestocked: '2026-07-06', isLowStock: false },
  { id: 'inv-3', name: 'Cooking Oil', unit: 'litre', quantity: 4, lowStockThreshold: 5, lastRestocked: '2026-07-03', isLowStock: true },
  { id: 'inv-4', name: 'Chicken Breast', unit: 'kg', quantity: 6, lowStockThreshold: 4, lastRestocked: '2026-07-07', isLowStock: false },
  { id: 'inv-5', name: 'Burger Buns', unit: 'pcs', quantity: 45, lowStockThreshold: 20, lastRestocked: '2026-07-06', isLowStock: false },
  { id: 'inv-6', name: 'Maida (Flour)', unit: 'kg', quantity: 3, lowStockThreshold: 5, lastRestocked: '2026-07-02', isLowStock: true },
  { id: 'inv-7', name: 'Onion', unit: 'kg', quantity: 10, lowStockThreshold: 5, lastRestocked: '2026-07-06', isLowStock: false },
  { id: 'inv-8', name: 'Capsicum', unit: 'kg', quantity: 4, lowStockThreshold: 3, lastRestocked: '2026-07-06', isLowStock: false },
  { id: 'inv-9', name: 'Tomato Sauce', unit: 'litre', quantity: 6, lowStockThreshold: 3, lastRestocked: '2026-07-05', isLowStock: false },
  { id: 'inv-10', name: 'Coca-Cola 300ml', unit: 'bottles', quantity: 18, lowStockThreshold: 24, lastRestocked: '2026-07-04', isLowStock: true },
  { id: 'inv-11', name: 'Paneer', unit: 'kg', quantity: 5, lowStockThreshold: 3, lastRestocked: '2026-07-07', isLowStock: false },
  { id: 'inv-12', name: 'Ice Cream (Vanilla)', unit: 'litre', quantity: 3, lowStockThreshold: 2, lastRestocked: '2026-07-05', isLowStock: false },
];

export function getUnsplashImageUrlForMenuItem(categorySlug: string, slug: string): string {
  switch (categorySlug) {
    case 'pizza':
      if (slug.includes('margherita')) return 'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=500&auto=format&fit=crop&q=80';
      if (slug.includes('farm')) return 'https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?w=500&auto=format&fit=crop&q=80';
      if (slug.includes('paneer')) return 'https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?w=500&auto=format&fit=crop&q=80';
      if (slug.includes('pepperoni')) return 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=500&auto=format&fit=crop&q=80';
      if (slug.includes('bbq')) return 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500&auto=format&fit=crop&q=80';
      if (slug.includes('tandoori')) return 'https://images.unsplash.com/photo-1594007654729-407ededc49c8?w=500&auto=format&fit=crop&q=80';
      return 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&auto=format&fit=crop&q=80';

    case 'burgers':
      if (slug.includes('classic')) return 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&auto=format&fit=crop&q=80';
      if (slug.includes('paneer')) return 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=500&auto=format&fit=crop&q=80';
      if (slug.includes('zinger')) return 'https://images.unsplash.com/photo-1525059696034-4967a8e1dca2?w=500&auto=format&fit=crop&q=80';
      if (slug.includes('smash')) return 'https://images.unsplash.com/photo-1549611016-3a70d82b5040?w=500&auto=format&fit=crop&q=80';
      if (slug.includes('aloo')) return 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=500&auto=format&fit=crop&q=80';
      return 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&auto=format&fit=crop&q=80';

    case 'momos':
      if (slug.includes('steamed') && slug.includes('veg')) return 'https://images.unsplash.com/photo-1625220194771-7ebedd0b70b9?w=500&auto=format&fit=crop&q=80';
      if (slug.includes('steamed') && slug.includes('chicken')) return 'https://images.unsplash.com/photo-1625220194771-7ebedd0b70b9?w=500&auto=format&fit=crop&q=80';
      if (slug.includes('fried-paneer')) return 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=500&auto=format&fit=crop&q=80';
      if (slug.includes('tandoori')) return 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=500&auto=format&fit=crop&q=80';
      if (slug.includes('kurkure')) return 'https://images.unsplash.com/photo-1625220194771-7ebedd0b70b9?w=500&auto=format&fit=crop&q=80';
      if (slug.includes('afghani')) return 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=500&auto=format&fit=crop&q=80';
      return 'https://images.unsplash.com/photo-1625220194771-7ebedd0b70b9?w=500&auto=format&fit=crop&q=80';

    case 'rolls':
      if (slug.includes('paneer')) return 'https://images.unsplash.com/photo-1626700051175-6518c4793f4f?w=500&auto=format&fit=crop&q=80';
      if (slug.includes('seekh')) return 'https://images.unsplash.com/photo-1626700051175-6518c4793f4f?w=500&auto=format&fit=crop&q=80';
      if (slug.includes('egg')) return 'https://images.unsplash.com/photo-1626700051175-6518c4793f4f?w=500&auto=format&fit=crop&q=80';
      if (slug.includes('double')) return 'https://images.unsplash.com/photo-1626700051175-6518c4793f4f?w=500&auto=format&fit=crop&q=80';
      if (slug.includes('aloo')) return 'https://images.unsplash.com/photo-1626700051175-6518c4793f4f?w=500&auto=format&fit=crop&q=80';
      return 'https://images.unsplash.com/photo-1626700051175-6518c4793f4f?w=500&auto=format&fit=crop&q=80';

    case 'chinese':
      if (slug.includes('manchurian')) return 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=500&auto=format&fit=crop&q=80';
      if (slug.includes('chilli')) return 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=500&auto=format&fit=crop&q=80';
      if (slug.includes('fried-rice')) return 'https://images.unsplash.com/photo-1603133872878-6850b28e371a?w=500&auto=format&fit=crop&q=80';
      if (slug.includes('noodles')) return 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=500&auto=format&fit=crop&q=80';
      return 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=500&auto=format&fit=crop&q=80';

    case 'pasta':
      if (slug.includes('white')) return 'https://images.unsplash.com/photo-1645112411341-6c4fd023714a?w=500&auto=format&fit=crop&q=80';
      if (slug.includes('arrabbiata')) return 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=500&auto=format&fit=crop&q=80';
      if (slug.includes('pink')) return 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=500&auto=format&fit=crop&q=80';
      if (slug.includes('alfredo')) return 'https://images.unsplash.com/photo-1645112411341-6c4fd023714a?w=500&auto=format&fit=crop&q=80';
      return 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=500&auto=format&fit=crop&q=80';

    case 'sandwiches':
      if (slug.includes('club')) return 'https://images.unsplash.com/photo-1509722747041-616f39b57569?w=500&auto=format&fit=crop&q=80';
      if (slug.includes('paneer')) return 'https://images.unsplash.com/photo-1509722747041-616f39b57569?w=500&auto=format&fit=crop&q=80';
      if (slug.includes('chicken')) return 'https://images.unsplash.com/photo-1509722747041-616f39b57569?w=500&auto=format&fit=crop&q=80';
      if (slug.includes('grilled-cheese')) return 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=500&auto=format&fit=crop&q=80';
      return 'https://images.unsplash.com/photo-1509722747041-616f39b57569?w=500&auto=format&fit=crop&q=80';

    case 'fries':
      if (slug.includes('classic')) return 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=500&auto=format&fit=crop&q=80';
      if (slug.includes('peri')) return 'https://images.unsplash.com/photo-1576107232684-1279f390859f?w=500&auto=format&fit=crop&q=80';
      if (slug.includes('cheese') || slug.includes('loaded')) return 'https://images.unsplash.com/photo-1585109649139-366815a0d713?w=500&auto=format&fit=crop&q=80';
      return 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=500&auto=format&fit=crop&q=80';

    case 'shakes':
      if (slug.includes('mango')) return 'https://images.unsplash.com/photo-1546173152-318a724de950?w=500&auto=format&fit=crop&q=80';
      if (slug.includes('oreo')) return 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=500&auto=format&fit=crop&q=80';
      if (slug.includes('chocolate')) return 'https://images.unsplash.com/photo-1579954115545-a95591f28bfc?w=500&auto=format&fit=crop&q=80';
      if (slug.includes('butterscotch')) return 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=500&auto=format&fit=crop&q=80';
      if (slug.includes('strawberry')) return 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=500&auto=format&fit=crop&q=80';
      return 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=500&auto=format&fit=crop&q=80';

    case 'coffee':
      if (slug.includes('hot')) return 'https://images.unsplash.com/photo-1541167760496-1628856ab772?w=500&auto=format&fit=crop&q=80';
      if (slug.includes('cold')) return 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=500&auto=format&fit=crop&q=80';
      if (slug.includes('cappuccino')) return 'https://images.unsplash.com/photo-1570968915860-54d5c301fc9f?w=500&auto=format&fit=crop&q=80';
      if (slug.includes('latte')) return 'https://images.unsplash.com/photo-1541167760496-1628856ab772?w=500&auto=format&fit=crop&q=80';
      return 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=500&auto=format&fit=crop&q=80';

    case 'cold-drinks':
      if (slug.includes('coca-cola') || slug.includes('coke')) return 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=500&auto=format&fit=crop&q=80';
      if (slug.includes('sprite')) return 'https://images.unsplash.com/photo-1625772290748-1609b7ca879c?w=500&auto=format&fit=crop&q=80';
      if (slug.includes('thumbs-up')) return 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=500&auto=format&fit=crop&q=80';
      if (slug.includes('lime-soda')) return 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=500&auto=format&fit=crop&q=80';
      if (slug.includes('chaas')) return 'https://images.unsplash.com/photo-1497534446932-c925b458314e?w=500&auto=format&fit=crop&q=80';
      return 'https://images.unsplash.com/photo-1497534446932-c925b458314e?w=500&auto=format&fit=crop&q=80';

    case 'combos':
      if (slug.includes('pizza-meal')) return 'https://images.unsplash.com/photo-1606787366850-de6330128bfc?w=500&auto=format&fit=crop&q=80';
      if (slug.includes('burger')) return 'https://images.unsplash.com/photo-1606787366850-de6330128bfc?w=500&auto=format&fit=crop&q=80';
      if (slug.includes('momos')) return 'https://images.unsplash.com/photo-1606787366850-de6330128bfc?w=500&auto=format&fit=crop&q=80';
      return 'https://images.unsplash.com/photo-1606787366850-de6330128bfc?w=500&auto=format&fit=crop&q=80';

    case 'desserts':
      if (slug.includes('gulab-jamun')) return 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=500&auto=format&fit=crop&q=80';
      if (slug.includes('brownie')) return 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=500&auto=format&fit=crop&q=80';
      if (slug.includes('lava-cake')) return 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=500&auto=format&fit=crop&q=80';
      if (slug.includes('vanilla')) return 'https://images.unsplash.com/photo-1570197788417-0e82375c9371?w=500&auto=format&fit=crop&q=80';
      return 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=500&auto=format&fit=crop&q=80';

    default:
      return 'https://images.unsplash.com/photo-1606787366850-de6330128bfc?w=500&auto=format&fit=crop&q=80';
  }
}

export const menuItems: MenuItem[] = rawMenuItems.map(item => ({
  ...item,
  image: getUnsplashImageUrlForMenuItem(item.categorySlug, item.slug)
}));

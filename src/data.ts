import { ShakeItem, LocationItem, ReviewItem } from './types';

// Let's use the local asset images we generated using generate_image
export const MENU_ITEMS: ShakeItem[] = [
  {
    id: 'ferrero-thick-shake',
    name: 'Ferrero Thick Shake',
    category: 'Chocolates',
    description: 'Rich chocolate hazelnut flavor blended with premium gelato, organic whole milk, and loaded with caramelized hazelnut crunch.',
    price: 320,
    image: '/src/assets/images/ferrero_thick_shake_1781749291019.jpg',
    ingredients: ['Ferrero Rocher Rochitas', 'Hazelnut Butter', 'Dark Cocoa Gelato', 'Gourmet Whipped Cream'],
    calories: 680,
    rating: 4.9,
    isPopular: true
  },
  {
    id: 'chocolate-lava-thick-shake',
    name: 'Chocolate Lava Shake',
    category: 'Chocolates',
    description: 'A luxurious liquid chocolate cake experience in a cup. Exploding with dark chocolate fudge and sponge cake crumbs.',
    price: 340,
    image: '/src/assets/images/chocolate_lava_shake_1781749306632.jpg',
    ingredients: ['Molten Chocolate Fondant', '72% Valrhona Ganache', 'Belgian Cocoa Base', 'Fudge Brownie Bites'],
    calories: 740,
    rating: 4.8,
    isPopular: true
  },
  {
    id: 'lotus-biscoff-shake',
    name: 'Lotus Biscoff Shake',
    category: 'Classic',
    description: 'Our award-winning specification. Pure speculoos biscuit paste layered with creamy heavy-cream and double-crunch Biscoff biscuit flakes.',
    price: 290,
    image: '/src/assets/images/lotus_biscoff_shake_1781749235981.jpg',
    ingredients: ['Lotus Biscoff Spread', 'Caramelized Speculoos', 'Warm Caramel Ribbon', 'Vanilla Bean Mousse'],
    calories: 620,
    rating: 4.9,
    isPopular: true
  },
  {
    id: 'gulab-jamun-thick-shake',
    name: 'Gulab Jamun Shake',
    category: 'Fusions',
    description: 'A revolutionary sensory bridge. Cardamom-infused golden thick shake layered with real soft hot-syrup gulab jamun wedges.',
    price: 310,
    image: '/src/assets/images/gulab_jamun_shake_1781749251649.jpg',
    ingredients: ['Saffron Cream Gelato', 'Mawa Blends', 'Whole Cardamom Dust', 'Organic Rose Petals', 'Pistachio Flakes'],
    calories: 710,
    rating: 5.0,
    isPopular: true
  },
  {
    id: 'kitkat-thick-shake',
    name: 'KitKat Thick Shake',
    category: 'Classic',
    description: 'Crisp chocolate wafers crushed and folded directly into thick malted vanilla cream. Double-layered with KitKat fingers.',
    price: 260,
    image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&q=80&w=600&h=600',
    ingredients: ['Crispy Wafer Bars', 'Malted Vanilla Base', 'Gourmet Chocolate Shell', 'Rich Cream Sauce'],
    calories: 590,
    rating: 4.7
  },
  {
    id: 'mango-special-shake',
    name: 'Mango Special Shake',
    category: 'Fruity',
    description: 'The golden jewel. Creamy Alphonso mango pulp churned to spoonable perfection, spiked with mango chunks and mint accents.',
    price: 280,
    image: 'https://images.unsplash.com/photo-1579954115545-a95591f28bfc?auto=format&fit=crop&q=80&w=600&h=600',
    ingredients: ['Alphonso Mango Cubes', 'Organic Cream Frosting', 'Kesar Mango Glaze', 'Fresh Mint Sprig'],
    calories: 490,
    rating: 4.8
  }
];

export const REVIEWS: ReviewItem[] = [
  {
    id: 'r1',
    name: 'Riya Sharma',
    role: 'Digital Creator & Food Critic',
    rating: 5,
    text: 'MA serves one of the richest thick shakes I’ve ever tried. Perfect texture and amazing flavors. The Gulab Jamun Fusion is a work of culinary art!',
    date: '3 days ago',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150&h=150'
  },
  {
    id: 'r2',
    name: 'Aravind Swamy',
    role: 'Dessert Aficionado',
    rating: 5,
    text: 'Standard milkshakes are basically water compared to this! It is so pleasantly thick that you literally need a spoon. The Lotus Biscoff is absolutely mind-blowing.',
    date: '1 week ago',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150&h=150'
  },
  {
    id: 'r3',
    name: 'Meera Deshmukh',
    role: 'Lifestyle Blogger',
    rating: 5,
    text: 'Incredibly premium experience! The packing, the branding, the visual presentation, everything screams luxury. A must-visit place for premium dessert lovers.',
    date: '2 weeks ago',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150'
  }
];

export const LOCATIONS: LocationItem[] = [
  {
    id: 'mumbai-juhu',
    city: 'Mumbai',
    name: 'MA Signature Lounge, Juhu',
    address: 'Plot 12, Juhu Tara Road, Opp Juhu Beach, Mumbai, Maharashtra 400049',
    phone: '+91 98765 43210',
    timing: '11:00 AM - 1:00 AM',
    lat: 19.0988,
    lng: 72.8267
  },
  {
    id: 'ahmedabad-cgroad',
    city: 'Ahmedabad',
    name: 'MA Dessert Cafe, CG Road',
    address: 'G-4, President Plaza, Chimanlal Girdharlal Rd, Ahmedabad, Gujarat 380009',
    phone: '+91 98765 43211',
    timing: '11:00 AM - 12:00 AM',
    lat: 23.0258,
    lng: 72.5621
  },
  {
    id: 'delhi-connaught',
    city: 'Delhi NCR',
    name: 'MA Luxury Hub, Connaught Place',
    address: 'Radial Road 6, Connaught Place, Block E, New Delhi, Delhi 110001',
    phone: '+91 98765 43212',
    timing: '10:00 AM - 12:00 AM',
    lat: 28.6304,
    lng: 77.2177
  },
  {
    id: 'bangalore-indiranagar',
    city: 'Bangalore',
    name: 'MA Premium Flagship, Indiranagar',
    address: '820, 100 Feet Rd, near HAL 2nd Stage, Indiranagar, Bengaluru, Karnataka 560038',
    phone: '+91 98765 43213',
    timing: '11:00 AM - 1:30 AM',
    lat: 12.9719,
    lng: 77.6412
  }
];

export const TOPPING_OPTIONS = [
  { name: 'Ferrero Rocher Crumbles', price: 60, icon: '🍫' },
  { name: 'Lotus Biscoff Crumbs', price: 50, icon: '🍪' },
  { name: 'Whipped Mousse Cream', price: 30, icon: '🍦' },
  { name: 'Dark Chocolate Fudge Injection', price: 40, icon: '🍯' },
  { name: 'Crush Caramel Drip', price: 30, icon: '🍮' },
  { name: 'Golden Roasted Hazelnuts', price: 50, icon: '🌰' },
  { name: 'Gourmet Gulab Jamun Pieces', price: 70, icon: '🍯' },
  { name: 'Grated White Chocolate Shavings', price: 30, icon: '🍬' },
];

export const BASE_OPTIONS = [
  { name: 'Creamy Gelato Double-Base', price: 0, desc: 'Ultra-rich churned dairy base' },
  { name: 'Plant-Based Almond-Oat Cream', price: 60, desc: 'Vegan premium dairy alternative' },
  { name: 'Double Malt High-Protein Cream', price: 40, desc: 'Thick sports-recovery base' },
];

export const FLAVOR_PROFILES = [
  { name: 'Dark Belgian Fudge', color: '#3d251d', shadowColor: 'rgba(61,37,29,0.4)', text: 'Chocolate' },
  { name: 'Caramelised Speculoos', color: '#c49564', shadowColor: 'rgba(196,149,100,0.4)', text: 'Caramel' },
  { name: 'Saffron Pistachio Thandai', color: '#ecc560', shadowColor: 'rgba(236,197,96,0.4)', text: 'RoseSaffron' },
  { name: 'Juicy Alphonso Nectar', color: '#FFA500', shadowColor: 'rgba(255,165,0,0.4)', text: 'Mango' },
  { name: 'Classic Malted Madagascar Vanilla', color: '#f3e5ab', shadowColor: 'rgba(243,229,171,0.4)', text: 'Vanilla' }
];

import { Photo, ServicePackage } from './types';

export const BRAND = {
  name: "Mark Beecham Photography",
  slogan: "You do life. We'll capture the memory.",
  phone: "(865) 555-0123",
  email: "mark@markbeechamphotography.com",
  location: "Tennessee & Surrounding Areas"
};

export const INITIAL_PHOTOS: Photo[] = [
  {
    id: '1',
    url: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=800&auto=format&fit=crop',
    title: 'The Sprint',
    category: 'Sports'
  },
  {
    id: '2',
    url: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=800&auto=format&fit=crop',
    title: 'Morning Mist',
    category: 'Wildlife'
  },
  {
    id: '3',
    url: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=800&auto=format&fit=crop',
    title: 'Touchdown',
    category: 'Sports'
  },
  {
    id: '4',
    url: 'https://images.unsplash.com/photo-1472396961693-142e6e594e0c?q=80&w=800&auto=format&fit=crop',
    title: 'Eagle Watch',
    category: 'Wildlife'
  },
  {
    id: '5',
    url: 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=800&auto=format&fit=crop',
    title: 'Grand Slam',
    category: 'Sports'
  },
  {
    id: '6',
    url: 'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?q=80&w=800&auto=format&fit=crop',
    title: 'Luxury Estate',
    category: 'Real Estate'
  },
  {
    id: '7',
    url: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=800&auto=format&fit=crop',
    title: 'Family Bond',
    category: 'Family'
  },
  {
    id: '8',
    url: 'https://images.unsplash.com/photo-1488998427799-e3362cec87c3?q=80&w=800&auto=format&fit=crop',
    title: 'Focus',
    category: 'Sports'
  },
   {
    id: '9',
    url: 'https://images.unsplash.com/photo-1575550959726-90c19058ac64?q=80&w=800&auto=format&fit=crop',
    title: 'Elk in Meadow',
    category: 'Wildlife'
  }
];

export const PACKAGES: ServicePackage[] = [
  {
    title: "The Game Day Package",
    price: 250,
    description: "Enjoy the game while we focus on capturing your child's key moments.",
    features: [
      "Professional-grade equipment",
      "Focus on your child throughout the game",
      "5 professionally edited photos",
      "High-resolution digital delivery",
      "Quick turnaround"
    ],
    cta: "Book Game Day",
    highlight: true
  },
  {
    title: "Wildlife Prints",
    description: "Stunning prints of Tennessee's magnificent wildlife. Perfect for home or office decoration.",
    cta: "View Gallery",
    highlight: false
  },
  {
    title: "Family Portraits",
    description: "Beautiful sessions that capture the love and connection between family members.",
    cta: "Inquire for Pricing",
    highlight: false
  },
  {
    title: "Real Estate",
    description: "Professional photography to make your listings shine and attract potential buyers.",
    cta: "Contact Us",
    highlight: false
  }
];

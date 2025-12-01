export interface Photo {
  id: string;
  url: string;
  title: string;
  category: 'Wildlife' | 'Sports' | 'Real Estate' | 'Family' | 'Uploads';
  width?: number;
  height?: number;
  storage_path?: string;
}

export interface ServicePackage {
  title: string;
  price?: number;
  description: string;
  features?: string[];
  cta: string;
  highlight?: boolean;
}

export interface Testimonial {
  text: string;
  author: string;
  role?: string;
}

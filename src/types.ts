export type SeoResult = {
  seoTitle: string;
  metaDescription: string;
  ogTitle: string;
  ogDescription: string;
  keywords: string[];
  h1Suggestion?: string;
  schemaJson?: any;
  localAdvice?: string[];
  source?: string;
  warning?: string;
};

export type ServiceItem = {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  iconName: 'zap' | 'shieldCheck' | 'sliders' | 'lightbulb' | 'phoneCall' | 'clock';
  emergencyAvailable: boolean;
  typicalDuration: string;
  priceEstimate: string;
  highlights: string[];
};

export type ZoneInfo = {
  name: string;
  subtitle: string;
  eta: string;
  neighborhoods: string[];
  featured: boolean;
};

export type CustomerReview = {
  id: string;
  author: string;
  location: string;
  service: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
};

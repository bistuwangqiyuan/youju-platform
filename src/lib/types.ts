export interface Destination {
  id: string;
  name: string;
  slug: string;
  province: string;
  description: string;
  short_description: string;
  cover_image: string;
  gallery_images: string[];
  latitude: number;
  longitude: number;
  climate_score: number;
  cost_score: number;
  medical_score: number;
  internet_score: number;
  transport_score: number;
  community_score: number;
  culture_score: number;
  overall_score: number;
  avg_monthly_cost: number;
  avg_temperature_winter: number;
  avg_temperature_summer: number;
  best_months: string[];
  tags: string[];
  property_count: number;
  created_at: string;
}

export interface Property {
  id: string;
  host_id: string;
  destination_id: string;
  title: string;
  description: string;
  short_description: string;
  property_type: "apartment" | "house" | "villa" | "studio" | "farmhouse" | "courtyard";
  cover_image: string;
  images: string[];
  address: string;
  latitude: number;
  longitude: number;
  bedrooms: number;
  bathrooms: number;
  max_guests: number;
  area_sqm: number;
  price_weekly: number;
  price_monthly: number;
  price_quarterly: number;
  amenities: string[];
  rating_living: number;
  rating_internet: number;
  rating_surroundings: number;
  rating_safety: number;
  rating_community: number;
  rating_overall: number;
  review_count: number;
  tier: "youxiang" | "youxuan" | "youshi" | "youjian";
  is_available: boolean;
  min_stay_days: number;
  internet_speed_mbps: number;
  has_kitchen: boolean;
  has_workspace: boolean;
  has_parking: boolean;
  has_elevator: boolean;
  is_accessible: boolean;
  host_name: string;
  host_avatar: string;
  host_verified: boolean;
  destination?: Destination;
  created_at: string;
}

export interface Review {
  id: string;
  property_id: string;
  user_id: string;
  user_name: string;
  user_avatar: string;
  rating_living: number;
  rating_internet: number;
  rating_surroundings: number;
  rating_safety: number;
  rating_community: number;
  rating_overall: number;
  content: string;
  stay_duration_days: number;
  stay_type: "silver" | "nomad" | "family" | "wellness";
  images: string[];
  created_at: string;
}

export interface Booking {
  id: string;
  property_id: string;
  user_id: string;
  check_in: string;
  check_out: string;
  guests: number;
  total_price: number;
  service_fee: number;
  status: "pending" | "confirmed" | "active" | "completed" | "cancelled";
  pricing_type: "weekly" | "monthly" | "quarterly";
  property?: Property;
  created_at: string;
}

export interface CommunityPost {
  id: string;
  author_id: string;
  author_name: string;
  author_avatar: string;
  title: string;
  content: string;
  cover_image: string;
  images: string[];
  destination_id: string;
  destination_name: string;
  category: "silver" | "nomad" | "family" | "wellness" | "guide" | "story";
  tags: string[];
  likes_count: number;
  comments_count: number;
  is_liked?: boolean;
  created_at: string;
}

export interface PostComment {
  id: string;
  post_id: string;
  user_id: string;
  user_name: string;
  user_avatar: string;
  content: string;
  created_at: string;
}

export interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  avatar_url: string;
  user_type: "traveler" | "host" | "both";
  bio: string;
  phone: string;
  preferred_destinations: string[];
  travel_style: string[];
  membership_tier: "free" | "silver" | "gold" | "platinum";
  created_at: string;
}

export interface MembershipTier {
  id: string;
  name: string;
  name_en: string;
  price_monthly: number;
  price_yearly: number;
  discount_rate: number;
  features: string[];
  color: string;
  icon: string;
}

export interface SearchFilters {
  destination?: string;
  checkIn?: string;
  checkOut?: string;
  guests?: number;
  priceMin?: number;
  priceMax?: number;
  propertyType?: string[];
  amenities?: string[];
  tier?: string[];
  minRating?: number;
  stayType?: "weekly" | "monthly" | "quarterly";
  sortBy?: "price_asc" | "price_desc" | "rating" | "newest";
}

export interface SojourIndex {
  climate: number;
  cost: number;
  medical: number;
  internet: number;
  transport: number;
  community: number;
  culture: number;
}

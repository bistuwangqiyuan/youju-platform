-- ============================================================
-- 悠居 (YouJu) 旅居民宿平台 - 数据库初始化
-- ============================================================

-- 启用必要扩展
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- ============================================================
-- 用户系统
-- ============================================================

CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL DEFAULT '',
  avatar_url TEXT DEFAULT '',
  user_type TEXT NOT NULL DEFAULT 'traveler' CHECK (user_type IN ('traveler', 'host', 'both')),
  bio TEXT DEFAULT '',
  phone TEXT DEFAULT '',
  preferred_destinations TEXT[] DEFAULT '{}',
  travel_style TEXT[] DEFAULT '{}',
  membership_tier TEXT NOT NULL DEFAULT 'free' CHECK (membership_tier IN ('free', 'silver', 'gold', 'platinum')),
  is_verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- 目的地系统
-- ============================================================

CREATE TABLE destinations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  province TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  short_description TEXT NOT NULL DEFAULT '',
  cover_image TEXT NOT NULL DEFAULT '',
  gallery_images TEXT[] DEFAULT '{}',
  latitude DOUBLE PRECISION NOT NULL DEFAULT 0,
  longitude DOUBLE PRECISION NOT NULL DEFAULT 0,
  climate_score INTEGER NOT NULL DEFAULT 0 CHECK (climate_score BETWEEN 0 AND 100),
  cost_score INTEGER NOT NULL DEFAULT 0 CHECK (cost_score BETWEEN 0 AND 100),
  medical_score INTEGER NOT NULL DEFAULT 0 CHECK (medical_score BETWEEN 0 AND 100),
  internet_score INTEGER NOT NULL DEFAULT 0 CHECK (internet_score BETWEEN 0 AND 100),
  transport_score INTEGER NOT NULL DEFAULT 0 CHECK (transport_score BETWEEN 0 AND 100),
  community_score INTEGER NOT NULL DEFAULT 0 CHECK (community_score BETWEEN 0 AND 100),
  culture_score INTEGER NOT NULL DEFAULT 0 CHECK (culture_score BETWEEN 0 AND 100),
  overall_score INTEGER NOT NULL DEFAULT 0 CHECK (overall_score BETWEEN 0 AND 100),
  avg_monthly_cost INTEGER NOT NULL DEFAULT 0,
  avg_temperature_winter DOUBLE PRECISION DEFAULT 0,
  avg_temperature_summer DOUBLE PRECISION DEFAULT 0,
  best_months TEXT[] DEFAULT '{}',
  tags TEXT[] DEFAULT '{}',
  property_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- 房源系统
-- ============================================================

CREATE TABLE properties (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  host_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  destination_id UUID NOT NULL REFERENCES destinations(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  short_description TEXT NOT NULL DEFAULT '',
  property_type TEXT NOT NULL CHECK (property_type IN ('apartment', 'house', 'villa', 'studio', 'farmhouse', 'courtyard')),
  cover_image TEXT NOT NULL DEFAULT '',
  images TEXT[] DEFAULT '{}',
  address TEXT NOT NULL DEFAULT '',
  latitude DOUBLE PRECISION NOT NULL DEFAULT 0,
  longitude DOUBLE PRECISION NOT NULL DEFAULT 0,
  bedrooms INTEGER NOT NULL DEFAULT 1,
  bathrooms INTEGER NOT NULL DEFAULT 1,
  max_guests INTEGER NOT NULL DEFAULT 2,
  area_sqm INTEGER NOT NULL DEFAULT 0,
  price_weekly INTEGER NOT NULL DEFAULT 0,
  price_monthly INTEGER NOT NULL DEFAULT 0,
  price_quarterly INTEGER NOT NULL DEFAULT 0,
  amenities TEXT[] DEFAULT '{}',
  rating_living DOUBLE PRECISION DEFAULT 0,
  rating_internet DOUBLE PRECISION DEFAULT 0,
  rating_surroundings DOUBLE PRECISION DEFAULT 0,
  rating_safety DOUBLE PRECISION DEFAULT 0,
  rating_community DOUBLE PRECISION DEFAULT 0,
  rating_overall DOUBLE PRECISION DEFAULT 0,
  review_count INTEGER NOT NULL DEFAULT 0,
  tier TEXT NOT NULL DEFAULT 'youshi' CHECK (tier IN ('youxiang', 'youxuan', 'youshi', 'youjian')),
  is_available BOOLEAN NOT NULL DEFAULT TRUE,
  min_stay_days INTEGER NOT NULL DEFAULT 7,
  internet_speed_mbps INTEGER DEFAULT 0,
  has_kitchen BOOLEAN DEFAULT FALSE,
  has_workspace BOOLEAN DEFAULT FALSE,
  has_parking BOOLEAN DEFAULT FALSE,
  has_elevator BOOLEAN DEFAULT FALSE,
  is_accessible BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- 预订系统
-- ============================================================

CREATE TABLE bookings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  property_id UUID NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  check_in DATE NOT NULL,
  check_out DATE NOT NULL,
  guests INTEGER NOT NULL DEFAULT 1,
  total_price INTEGER NOT NULL DEFAULT 0,
  service_fee INTEGER NOT NULL DEFAULT 0,
  pricing_type TEXT NOT NULL DEFAULT 'monthly' CHECK (pricing_type IN ('weekly', 'monthly', 'quarterly')),
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'active', 'completed', 'cancelled')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT valid_dates CHECK (check_out > check_in)
);

-- ============================================================
-- 评价系统
-- ============================================================

CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  property_id UUID NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  rating_living DOUBLE PRECISION NOT NULL CHECK (rating_living BETWEEN 1 AND 5),
  rating_internet DOUBLE PRECISION NOT NULL CHECK (rating_internet BETWEEN 1 AND 5),
  rating_surroundings DOUBLE PRECISION NOT NULL CHECK (rating_surroundings BETWEEN 1 AND 5),
  rating_safety DOUBLE PRECISION NOT NULL CHECK (rating_safety BETWEEN 1 AND 5),
  rating_community DOUBLE PRECISION NOT NULL CHECK (rating_community BETWEEN 1 AND 5),
  rating_overall DOUBLE PRECISION NOT NULL CHECK (rating_overall BETWEEN 1 AND 5),
  content TEXT NOT NULL DEFAULT '',
  stay_duration_days INTEGER NOT NULL DEFAULT 0,
  stay_type TEXT DEFAULT 'nomad' CHECK (stay_type IN ('silver', 'nomad', 'family', 'wellness')),
  images TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(property_id, user_id)
);

-- ============================================================
-- 社区系统
-- ============================================================

CREATE TABLE community_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  author_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT NOT NULL DEFAULT '',
  cover_image TEXT DEFAULT '',
  images TEXT[] DEFAULT '{}',
  destination_id UUID REFERENCES destinations(id),
  category TEXT NOT NULL DEFAULT 'story' CHECK (category IN ('silver', 'nomad', 'family', 'wellness', 'guide', 'story')),
  tags TEXT[] DEFAULT '{}',
  likes_count INTEGER NOT NULL DEFAULT 0,
  comments_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE post_comments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  post_id UUID NOT NULL REFERENCES community_posts(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE post_likes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  post_id UUID NOT NULL REFERENCES community_posts(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(post_id, user_id)
);

-- ============================================================
-- 收藏与消息
-- ============================================================

CREATE TABLE favorites (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  property_id UUID NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, property_id)
);

CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  sender_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  receiver_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  is_read BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- 索引
-- ============================================================

CREATE INDEX idx_properties_destination ON properties(destination_id);
CREATE INDEX idx_properties_host ON properties(host_id);
CREATE INDEX idx_properties_tier ON properties(tier);
CREATE INDEX idx_properties_available ON properties(is_available);
CREATE INDEX idx_properties_price ON properties(price_monthly);
CREATE INDEX idx_properties_rating ON properties(rating_overall DESC);
CREATE INDEX idx_bookings_user ON bookings(user_id);
CREATE INDEX idx_bookings_property ON bookings(property_id);
CREATE INDEX idx_bookings_status ON bookings(status);
CREATE INDEX idx_reviews_property ON reviews(property_id);
CREATE INDEX idx_community_posts_author ON community_posts(author_id);
CREATE INDEX idx_community_posts_category ON community_posts(category);
CREATE INDEX idx_community_posts_destination ON community_posts(destination_id);
CREATE INDEX idx_favorites_user ON favorites(user_id);
CREATE INDEX idx_messages_receiver ON messages(receiver_id, is_read);
CREATE INDEX idx_destinations_slug ON destinations(slug);

-- Full-text search on properties
CREATE INDEX idx_properties_search ON properties USING gin(
  to_tsvector('simple', coalesce(title, '') || ' ' || coalesce(description, '') || ' ' || coalesce(address, ''))
);

-- ============================================================
-- Row Level Security (RLS)
-- ============================================================

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE community_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE post_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE post_likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE destinations ENABLE ROW LEVEL SECURITY;

-- Destinations: publicly readable
CREATE POLICY "destinations_public_read" ON destinations FOR SELECT USING (true);

-- Properties: publicly readable
CREATE POLICY "properties_public_read" ON properties FOR SELECT USING (true);
CREATE POLICY "properties_host_insert" ON properties FOR INSERT WITH CHECK (auth.uid() = host_id);
CREATE POLICY "properties_host_update" ON properties FOR UPDATE USING (auth.uid() = host_id);
CREATE POLICY "properties_host_delete" ON properties FOR DELETE USING (auth.uid() = host_id);

-- Profiles: own profile full access, others read basic info
CREATE POLICY "profiles_public_read" ON profiles FOR SELECT USING (true);
CREATE POLICY "profiles_own_update" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "profiles_own_insert" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- Bookings: user sees own, host sees property bookings
CREATE POLICY "bookings_user_read" ON bookings FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "bookings_user_insert" ON bookings FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "bookings_user_update" ON bookings FOR UPDATE USING (auth.uid() = user_id);

-- Reviews: publicly readable, user creates own
CREATE POLICY "reviews_public_read" ON reviews FOR SELECT USING (true);
CREATE POLICY "reviews_user_insert" ON reviews FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Community: publicly readable, author manages own
CREATE POLICY "posts_public_read" ON community_posts FOR SELECT USING (true);
CREATE POLICY "posts_author_insert" ON community_posts FOR INSERT WITH CHECK (auth.uid() = author_id);
CREATE POLICY "posts_author_update" ON community_posts FOR UPDATE USING (auth.uid() = author_id);
CREATE POLICY "posts_author_delete" ON community_posts FOR DELETE USING (auth.uid() = author_id);

CREATE POLICY "comments_public_read" ON post_comments FOR SELECT USING (true);
CREATE POLICY "comments_user_insert" ON post_comments FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "likes_public_read" ON post_likes FOR SELECT USING (true);
CREATE POLICY "likes_user_manage" ON post_likes FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "likes_user_delete" ON post_likes FOR DELETE USING (auth.uid() = user_id);

-- Favorites: user manages own
CREATE POLICY "favorites_user_read" ON favorites FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "favorites_user_insert" ON favorites FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "favorites_user_delete" ON favorites FOR DELETE USING (auth.uid() = user_id);

-- Messages: sender and receiver can read
CREATE POLICY "messages_participant_read" ON messages FOR SELECT USING (auth.uid() IN (sender_id, receiver_id));
CREATE POLICY "messages_sender_insert" ON messages FOR INSERT WITH CHECK (auth.uid() = sender_id);

-- ============================================================
-- Triggers
-- ============================================================

CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER profiles_updated_at BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER properties_updated_at BEFORE UPDATE ON properties FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER bookings_updated_at BEFORE UPDATE ON bookings FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER posts_updated_at BEFORE UPDATE ON community_posts FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Auto-create profile on user signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, email, full_name, avatar_url)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'avatar_url', '')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- ════════════════════════════════════════════════════════════
-- DreamEstate — PostgreSQL Database Schema
-- Run this with: psql -U postgres -d dreamestate -f schema.sql
-- ════════════════════════════════════════════════════════════

-- Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "postgis";  -- geospatial queries

-- ── Users ────────────────────────────────────────────────────
CREATE TYPE user_role AS ENUM ('buyer', 'tenant', 'seller', 'landlord', 'admin');

CREATE TABLE users (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email         TEXT UNIQUE NOT NULL,
  full_name     TEXT NOT NULL,
  avatar_url    TEXT,
  phone         TEXT,
  role          user_role NOT NULL DEFAULT 'buyer',
  is_verified   BOOLEAN NOT NULL DEFAULT false,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ── Properties ───────────────────────────────────────────────
CREATE TYPE property_type    AS ENUM ('villa','house','apartment','room','commercial','land');
CREATE TYPE listing_type     AS ENUM ('sale','rent');
CREATE TYPE property_status  AS ENUM ('draft','pending_review','active','sold','rented','archived');

CREATE TABLE properties (
  id             UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title          TEXT NOT NULL,
  description    TEXT,
  type           property_type    NOT NULL,
  listing_type   listing_type     NOT NULL,
  status         property_status  NOT NULL DEFAULT 'draft',
  price          NUMERIC(14,2)    NOT NULL,
  currency       CHAR(3)          NOT NULL DEFAULT 'KES',

  -- Location
  address        TEXT NOT NULL,
  city           TEXT NOT NULL,
  country        TEXT NOT NULL DEFAULT 'Kenya',
  zip_code       TEXT,
  neighbourhood  TEXT,
  lat            DOUBLE PRECISION NOT NULL,
  lng            DOUBLE PRECISION NOT NULL,
  location       GEOGRAPHY(POINT, 4326),  -- PostGIS column for radius queries

  -- Features
  bedrooms       SMALLINT NOT NULL DEFAULT 0,
  bathrooms      SMALLINT NOT NULL DEFAULT 0,
  floors         SMALLINT,
  garages        SMALLINT DEFAULT 0,
  sq_meters      NUMERIC(8,1) NOT NULL DEFAULT 0,
  year_built     SMALLINT,
  furnished      BOOLEAN NOT NULL DEFAULT false,
  pet_friendly   BOOLEAN NOT NULL DEFAULT false,
  amenities      TEXT[]   NOT NULL DEFAULT '{}',

  -- Media
  images         TEXT[]   NOT NULL DEFAULT '{}',
  videos         TEXT[]   NOT NULL DEFAULT '{}',
  tour_url       TEXT,
  floor_plan     TEXT,

  -- Meta
  owner_id       UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  views          INTEGER NOT NULL DEFAULT 0,
  favourites     INTEGER NOT NULL DEFAULT 0,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at     TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Auto-populate PostGIS geography on insert/update
CREATE OR REPLACE FUNCTION sync_property_location()
RETURNS TRIGGER AS $$
BEGIN
  NEW.location := ST_SetSRID(ST_MakePoint(NEW.lng, NEW.lat), 4326)::GEOGRAPHY;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_sync_property_location
  BEFORE INSERT OR UPDATE OF lat, lng ON properties
  FOR EACH ROW EXECUTE FUNCTION sync_property_location();

-- ── Enquiries ────────────────────────────────────────────────
CREATE TYPE enquiry_status AS ENUM ('open','replied','closed');

CREATE TABLE enquiries (
  id           UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  property_id  UUID NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
  sender_id    UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  message      TEXT NOT NULL,
  status       enquiry_status NOT NULL DEFAULT 'open',
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ── Conversations & Messages ─────────────────────────────────
CREATE TABLE conversations (
  id           UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  property_id  UUID REFERENCES properties(id) ON DELETE SET NULL,
  participant_a UUID NOT NULL REFERENCES users(id),
  participant_b UUID NOT NULL REFERENCES users(id),
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE messages (
  id               UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  conversation_id  UUID NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
  sender_id        UUID NOT NULL REFERENCES users(id),
  content          TEXT NOT NULL,
  read_at          TIMESTAMPTZ,
  created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ── Viewings ─────────────────────────────────────────────────
CREATE TYPE viewing_status AS ENUM ('requested','confirmed','completed','cancelled');

CREATE TABLE viewings (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  property_id   UUID NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
  requester_id  UUID NOT NULL REFERENCES users(id),
  owner_id      UUID NOT NULL REFERENCES users(id),
  scheduled_at  TIMESTAMPTZ NOT NULL,
  status        viewing_status NOT NULL DEFAULT 'requested',
  notes         TEXT,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ── Saved / Favourites ───────────────────────────────────────
CREATE TABLE saved_properties (
  user_id      UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  property_id  UUID NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
  saved_at     TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (user_id, property_id)
);

-- ── Transactions ─────────────────────────────────────────────
CREATE TYPE transaction_type   AS ENUM ('deposit','rent_payment','purchase','platform_fee');
CREATE TYPE transaction_status AS ENUM ('pending','completed','failed','refunded');

CREATE TABLE transactions (
  id           UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  property_id  UUID NOT NULL REFERENCES properties(id),
  payer_id     UUID NOT NULL REFERENCES users(id),
  receiver_id  UUID NOT NULL REFERENCES users(id),
  amount       NUMERIC(14,2) NOT NULL,
  currency     CHAR(3) NOT NULL DEFAULT 'KES',
  type         transaction_type   NOT NULL,
  status       transaction_status NOT NULL DEFAULT 'pending',
  stripe_ref   TEXT,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ── Indexes ──────────────────────────────────────────────────
CREATE INDEX idx_properties_city          ON properties(city);
CREATE INDEX idx_properties_type          ON properties(type);
CREATE INDEX idx_properties_listing_type  ON properties(listing_type);
CREATE INDEX idx_properties_status        ON properties(status);
CREATE INDEX idx_properties_price         ON properties(price);
CREATE INDEX idx_properties_owner         ON properties(owner_id);
CREATE INDEX idx_properties_location      ON properties USING GIST(location);
CREATE INDEX idx_messages_conversation    ON messages(conversation_id);
CREATE INDEX idx_viewings_property        ON viewings(property_id);
CREATE INDEX idx_transactions_property    ON transactions(property_id);

-- ── Updated-at trigger helper ─────────────────────────────────
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_users_updated_at
  BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trg_properties_updated_at
  BEFORE UPDATE ON properties FOR EACH ROW EXECUTE FUNCTION update_updated_at();

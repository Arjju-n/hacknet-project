/*
  # Smart Campus Booking System Database Schema

  1. New Tables
    - `profiles` - User profile information extending Supabase auth
      - `id` (uuid, references auth.users)
      - `full_name` (text)
      - `email` (text)
      - `role` (enum: student, faculty, admin)
      - `student_id` (text, nullable)
      - `department` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `venues` - Available venues for booking
      - `id` (uuid, primary key)
      - `name` (text)
      - `type` (text)
      - `capacity` (integer)
      - `equipment` (text array)
      - `available` (boolean)
      - `description` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `bookings` - Venue booking requests
      - `id` (uuid, primary key)
      - `user_id` (uuid, references profiles)
      - `venue_id` (uuid, references venues)
      - `event_name` (text)
      - `description` (text)
      - `event_type` (text)
      - `start_date` (date)
      - `start_time` (time)
      - `end_time` (time)
      - `expected_attendees` (integer)
      - `status` (enum: pending, approved, rejected)
      - `priority` (boolean, default false)
      - `rejection_reason` (text, nullable)
      - `approved_by` (uuid, nullable, references profiles)
      - `approved_at` (timestamp, nullable)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `booking_documents` - Supporting documents for bookings
      - `id` (uuid, primary key)
      - `booking_id` (uuid, references bookings)
      - `file_name` (text)
      - `file_path` (text)
      - `file_size` (integer)
      - `uploaded_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for role-based access control
    - Students can only access their own bookings
    - Faculty have enhanced privileges
    - Admins have full access

  3. Functions and Triggers
    - Auto-update timestamps
    - Booking conflict detection
    - Priority booking logic
</sql>

-- Create custom types
CREATE TYPE user_role AS ENUM ('student', 'faculty', 'admin');
CREATE TYPE booking_status AS ENUM ('pending', 'approved', 'rejected');
CREATE TYPE event_type AS ENUM ('lecture', 'seminar', 'conference', 'meeting', 'workshop', 'thesis-defense', 'club-activity', 'other');

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name text NOT NULL,
  email text UNIQUE NOT NULL,
  role user_role NOT NULL DEFAULT 'student',
  student_id text,
  department text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create venues table
CREATE TABLE IF NOT EXISTS venues (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  type text NOT NULL,
  capacity integer NOT NULL CHECK (capacity > 0),
  equipment text[] DEFAULT '{}',
  available boolean DEFAULT true,
  description text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create bookings table
CREATE TABLE IF NOT EXISTS bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  venue_id uuid NOT NULL REFERENCES venues(id) ON DELETE CASCADE,
  event_name text NOT NULL,
  description text,
  event_type event_type NOT NULL DEFAULT 'other',
  start_date date NOT NULL,
  start_time time NOT NULL,
  end_time time NOT NULL,
  expected_attendees integer NOT NULL CHECK (expected_attendees > 0),
  status booking_status DEFAULT 'pending',
  priority boolean DEFAULT false,
  rejection_reason text,
  approved_by uuid REFERENCES profiles(id),
  approved_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  
  -- Ensure end time is after start time
  CONSTRAINT valid_time_range CHECK (end_time > start_time),
  -- Ensure booking date is not in the past
  CONSTRAINT future_booking CHECK (start_date >= CURRENT_DATE)
);

-- Create booking_documents table
CREATE TABLE IF NOT EXISTS booking_documents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id uuid NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
  file_name text NOT NULL,
  file_path text NOT NULL,
  file_size integer NOT NULL CHECK (file_size > 0),
  uploaded_at timestamptz DEFAULT now()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_bookings_user_id ON bookings(user_id);
CREATE INDEX IF NOT EXISTS idx_bookings_venue_id ON bookings(venue_id);
CREATE INDEX IF NOT EXISTS idx_bookings_date ON bookings(start_date);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);
CREATE INDEX IF NOT EXISTS idx_profiles_role ON profiles(role);
CREATE INDEX IF NOT EXISTS idx_venues_available ON venues(available);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE venues ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE booking_documents ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can read own profile"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Admins can read all profiles"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Venues policies
CREATE POLICY "Everyone can read venues"
  ON venues
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins can manage venues"
  ON venues
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Bookings policies
CREATE POLICY "Users can read own bookings"
  ON bookings
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can create bookings"
  ON bookings
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own pending bookings"
  ON bookings
  FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid() AND status = 'pending');

CREATE POLICY "Admins can read all bookings"
  ON bookings
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Admins and faculty can approve/reject bookings"
  ON bookings
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role IN ('admin', 'faculty')
    )
  );

-- Booking documents policies
CREATE POLICY "Users can read own booking documents"
  ON booking_documents
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM bookings
      WHERE bookings.id = booking_documents.booking_id
      AND bookings.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can upload documents for own bookings"
  ON booking_documents
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM bookings
      WHERE bookings.id = booking_documents.booking_id
      AND bookings.user_id = auth.uid()
    )
  );

CREATE POLICY "Admins can read all booking documents"
  ON booking_documents
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_venues_updated_at
  BEFORE UPDATE ON venues
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_bookings_updated_at
  BEFORE UPDATE ON bookings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Function to check booking conflicts
CREATE OR REPLACE FUNCTION check_booking_conflicts(
  p_venue_id uuid,
  p_start_date date,
  p_start_time time,
  p_end_time time,
  p_booking_id uuid DEFAULT NULL
)
RETURNS boolean AS $$
DECLARE
  conflict_count integer;
BEGIN
  SELECT COUNT(*)
  INTO conflict_count
  FROM bookings
  WHERE venue_id = p_venue_id
    AND start_date = p_start_date
    AND status = 'approved'
    AND (p_booking_id IS NULL OR id != p_booking_id)
    AND (
      (start_time <= p_start_time AND end_time > p_start_time) OR
      (start_time < p_end_time AND end_time >= p_end_time) OR
      (start_time >= p_start_time AND end_time <= p_end_time)
    );
  
  RETURN conflict_count > 0;
END;
$$ LANGUAGE plpgsql;

-- Function to handle booking approval
CREATE OR REPLACE FUNCTION approve_booking(
  p_booking_id uuid,
  p_approved_by uuid
)
RETURNS boolean AS $$
DECLARE
  booking_record bookings%ROWTYPE;
  has_conflict boolean;
BEGIN
  -- Get booking details
  SELECT * INTO booking_record
  FROM bookings
  WHERE id = p_booking_id;
  
  IF NOT FOUND THEN
    RAISE EXCEPTION 'Booking not found';
  END IF;
  
  -- Check for conflicts
  SELECT check_booking_conflicts(
    booking_record.venue_id,
    booking_record.start_date,
    booking_record.start_time,
    booking_record.end_time,
    p_booking_id
  ) INTO has_conflict;
  
  IF has_conflict THEN
    RAISE EXCEPTION 'Booking conflict detected';
  END IF;
  
  -- Approve the booking
  UPDATE bookings
  SET status = 'approved',
      approved_by = p_approved_by,
      approved_at = now()
  WHERE id = p_booking_id;
  
  RETURN true;
END;
$$ LANGUAGE plpgsql;

-- Insert sample venues
INSERT INTO venues (name, type, capacity, equipment, description) VALUES
  ('Main Auditorium', 'Auditorium', 500, ARRAY['Projector', 'Sound System', 'Stage Lighting', 'Microphones'], 'Large auditorium for major events and conferences'),
  ('Seminar Hall A', 'Seminar Hall', 100, ARRAY['Projector', 'Whiteboard', 'AC', 'Sound System'], 'Medium-sized hall perfect for seminars and workshops'),
  ('Seminar Hall B', 'Seminar Hall', 80, ARRAY['Projector', 'Whiteboard', 'AC'], 'Comfortable seminar hall for academic presentations'),
  ('Conference Room 1', 'Conference Room', 25, ARRAY['TV Display', 'Video Conferencing', 'Whiteboard'], 'Modern conference room with video conferencing facilities'),
  ('Conference Room 2', 'Conference Room', 30, ARRAY['TV Display', 'Whiteboard', 'AC'], 'Spacious conference room for meetings and discussions'),
  ('Lab 1', 'Laboratory', 50, ARRAY['Computers', 'Projector', 'Network Access'], 'Computer lab with modern workstations'),
  ('Lab 2', 'Laboratory', 40, ARRAY['Computers', 'Projector', 'Network Access'], 'Secondary computer lab for practical sessions'),
  ('Library Hall', 'Study Hall', 60, ARRAY['Whiteboard', 'AC', 'Study Tables'], 'Quiet study hall in the library'),
  ('Faculty Lounge', 'Meeting Room', 15, ARRAY['Coffee Machine', 'Whiteboard', 'Comfortable Seating'], 'Exclusive lounge for faculty meetings');
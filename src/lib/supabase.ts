import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface Profile {
  id: string;
  full_name: string;
  email: string;
  role: 'student' | 'faculty' | 'admin';
  student_id?: string;
  department: string;
  created_at: string;
  updated_at: string;
}

export interface Venue {
  id: string;
  name: string;
  type: string;
  capacity: number;
  equipment: string[];
  available: boolean;
  description?: string;
  created_at: string;
  updated_at: string;
}

export interface Booking {
  id: string;
  user_id: string;
  venue_id: string;
  event_name: string;
  description?: string;
  event_type: 'lecture' | 'seminar' | 'conference' | 'meeting' | 'workshop' | 'thesis-defense' | 'club-activity' | 'other';
  start_date: string;
  start_time: string;
  end_time: string;
  expected_attendees: number;
  status: 'pending' | 'approved' | 'rejected';
  priority: boolean;
  rejection_reason?: string;
  approved_by?: string;
  approved_at?: string;
  created_at: string;
  updated_at: string;
  
  // Relations
  profiles?: Profile;
  venues?: Venue;
  approved_by_profile?: Profile;
}

export interface BookingDocument {
  id: string;
  booking_id: string;
  file_name: string;
  file_path: string;
  file_size: number;
  uploaded_at: string;
}

// Auth helper functions
export const getCurrentUser = async () => {
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error) throw error;
  return user;
};

export const getCurrentProfile = async () => {
  const user = await getCurrentUser();
  if (!user) return null;
  
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();
    
  if (error) throw error;
  return data as Profile;
};

export const signUp = async (userData: {
  email: string;
  password: string;
  fullName: string;
  role: 'student' | 'faculty' | 'admin';
  studentId?: string;
  department: string;
}) => {
  const { data, error } = await supabase.auth.signUp({
    email: userData.email,
    password: userData.password,
    options: {
      data: {
        full_name: userData.fullName,
        role: userData.role,
        student_id: userData.studentId,
        department: userData.department,
      }
    }
  });
  
  if (error) throw error;
  
  // Create profile
  if (data.user) {
    const { error: profileError } = await supabase
      .from('profiles')
      .insert({
        id: data.user.id,
        full_name: userData.fullName,
        email: userData.email,
        role: userData.role,
        student_id: userData.studentId,
        department: userData.department,
      });
      
    if (profileError) throw profileError;
  }
  
  return data;
};

export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  
  if (error) throw error;
  return data;
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};
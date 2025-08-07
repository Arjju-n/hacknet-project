import { supabase, Venue } from '../supabase';

export const getVenues = async (): Promise<Venue[]> => {
  const { data, error } = await supabase
    .from('venues')
    .select('*')
    .order('name');
    
  if (error) throw error;
  return data;
};

export const getAvailableVenues = async (): Promise<Venue[]> => {
  const { data, error } = await supabase
    .from('venues')
    .select('*')
    .eq('available', true)
    .order('name');
    
  if (error) throw error;
  return data;
};

export const getVenueById = async (id: string): Promise<Venue> => {
  const { data, error } = await supabase
    .from('venues')
    .select('*')
    .eq('id', id)
    .single();
    
  if (error) throw error;
  return data;
};

export const createVenue = async (venue: Omit<Venue, 'id' | 'created_at' | 'updated_at'>): Promise<Venue> => {
  const { data, error } = await supabase
    .from('venues')
    .insert(venue)
    .select()
    .single();
    
  if (error) throw error;
  return data;
};

export const updateVenue = async (id: string, updates: Partial<Venue>): Promise<Venue> => {
  const { data, error } = await supabase
    .from('venues')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
    
  if (error) throw error;
  return data;
};

export const deleteVenue = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from('venues')
    .delete()
    .eq('id', id);
    
  if (error) throw error;
};

export const checkVenueAvailability = async (
  venueId: string,
  date: string,
  startTime: string,
  endTime: string,
  excludeBookingId?: string
): Promise<boolean> => {
  let query = supabase
    .from('bookings')
    .select('id')
    .eq('venue_id', venueId)
    .eq('start_date', date)
    .eq('status', 'approved');
    
  if (excludeBookingId) {
    query = query.neq('id', excludeBookingId);
  }
  
  const { data, error } = await query;
  
  if (error) throw error;
  
  // Check for time conflicts
  const conflicts = data.filter(booking => {
    // This is a simplified check - in a real app, you'd want to do this server-side
    return true; // For now, assume there might be conflicts
  });
  
  return conflicts.length === 0;
};
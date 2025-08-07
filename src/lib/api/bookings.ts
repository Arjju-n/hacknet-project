import { supabase, Booking, getCurrentUser } from '../supabase';

export const getBookings = async (): Promise<Booking[]> => {
  const { data, error } = await supabase
    .from('bookings')
    .select(`
      *,
      profiles:user_id (
        id,
        full_name,
        email,
        role,
        department
      ),
      venues:venue_id (
        id,
        name,
        type,
        capacity
      ),
      approved_by_profile:approved_by (
        id,
        full_name,
        role
      )
    `)
    .order('created_at', { ascending: false });
    
  if (error) throw error;
  return data;
};

export const getUserBookings = async (userId?: string): Promise<Booking[]> => {
  const user = userId || (await getCurrentUser())?.id;
  if (!user) throw new Error('User not authenticated');
  
  const { data, error } = await supabase
    .from('bookings')
    .select(`
      *,
      venues:venue_id (
        id,
        name,
        type,
        capacity
      ),
      approved_by_profile:approved_by (
        id,
        full_name,
        role
      )
    `)
    .eq('user_id', user)
    .order('created_at', { ascending: false });
    
  if (error) throw error;
  return data;
};

export const getPendingBookings = async (): Promise<Booking[]> => {
  const { data, error } = await supabase
    .from('bookings')
    .select(`
      *,
      profiles:user_id (
        id,
        full_name,
        email,
        role,
        department
      ),
      venues:venue_id (
        id,
        name,
        type,
        capacity
      )
    `)
    .eq('status', 'pending')
    .order('created_at', { ascending: false });
    
  if (error) throw error;
  return data;
};

export const getPriorityBookings = async (): Promise<Booking[]> => {
  const { data, error } = await supabase
    .from('bookings')
    .select(`
      *,
      profiles:user_id (
        id,
        full_name,
        email,
        role,
        department
      ),
      venues:venue_id (
        id,
        name,
        type,
        capacity
      )
    `)
    .eq('priority', true)
    .order('created_at', { ascending: false });
    
  if (error) throw error;
  return data;
};

export const createBooking = async (booking: {
  venue_id: string;
  event_name: string;
  description?: string;
  event_type: string;
  start_date: string;
  start_time: string;
  end_time: string;
  expected_attendees: number;
  priority?: boolean;
}): Promise<Booking> => {
  const user = await getCurrentUser();
  if (!user) throw new Error('User not authenticated');
  
  const { data, error } = await supabase
    .from('bookings')
    .insert({
      ...booking,
      user_id: user.id,
    })
    .select(`
      *,
      venues:venue_id (
        id,
        name,
        type,
        capacity
      )
    `)
    .single();
    
  if (error) throw error;
  return data;
};

export const updateBooking = async (id: string, updates: Partial<Booking>): Promise<Booking> => {
  const { data, error } = await supabase
    .from('bookings')
    .update(updates)
    .eq('id', id)
    .select(`
      *,
      venues:venue_id (
        id,
        name,
        type,
        capacity
      ),
      approved_by_profile:approved_by (
        id,
        full_name,
        role
      )
    `)
    .single();
    
  if (error) throw error;
  return data;
};

export const approveBooking = async (bookingId: string): Promise<void> => {
  const user = await getCurrentUser();
  if (!user) throw new Error('User not authenticated');
  
  const { error } = await supabase.rpc('approve_booking', {
    p_booking_id: bookingId,
    p_approved_by: user.id
  });
  
  if (error) throw error;
};

export const rejectBooking = async (bookingId: string, reason?: string): Promise<void> => {
  const user = await getCurrentUser();
  if (!user) throw new Error('User not authenticated');
  
  const { error } = await supabase
    .from('bookings')
    .update({
      status: 'rejected',
      rejection_reason: reason,
      approved_by: user.id,
      approved_at: new Date().toISOString()
    })
    .eq('id', bookingId);
    
  if (error) throw error;
};

export const deleteBooking = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from('bookings')
    .delete()
    .eq('id', id);
    
  if (error) throw error;
};

export const getBookingStats = async () => {
  const { data: totalBookings, error: totalError } = await supabase
    .from('bookings')
    .select('id', { count: 'exact' });
    
  const { data: pendingBookings, error: pendingError } = await supabase
    .from('bookings')
    .select('id', { count: 'exact' })
    .eq('status', 'pending');
    
  const { data: approvedBookings, error: approvedError } = await supabase
    .from('bookings')
    .select('id', { count: 'exact' })
    .eq('status', 'approved');
    
  const { data: priorityBookings, error: priorityError } = await supabase
    .from('bookings')
    .select('id', { count: 'exact' })
    .eq('priority', true);
    
  if (totalError || pendingError || approvedError || priorityError) {
    throw new Error('Failed to fetch booking statistics');
  }
  
  return {
    total: totalBookings?.length || 0,
    pending: pendingBookings?.length || 0,
    approved: approvedBookings?.length || 0,
    priority: priorityBookings?.length || 0,
  };
};
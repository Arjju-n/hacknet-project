import { useState, useEffect } from 'react';
import { Booking } from '../lib/supabase';
import { 
  getBookings, 
  getUserBookings, 
  getPendingBookings, 
  getPriorityBookings,
  getBookingStats 
} from '../lib/api/bookings';
import { useAuth } from './useAuth';

export const useBookings = (type: 'all' | 'user' | 'pending' | 'priority' = 'user') => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user, isAdmin, isFaculty } = useAuth();

  const fetchBookings = async () => {
    try {
      setLoading(true);
      setError(null);
      
      let data: Booking[] = [];
      
      switch (type) {
        case 'all':
          if (isAdmin || isFaculty) {
            data = await getBookings();
          } else {
            data = await getUserBookings();
          }
          break;
        case 'user':
          data = await getUserBookings();
          break;
        case 'pending':
          if (isAdmin || isFaculty) {
            data = await getPendingBookings();
          }
          break;
        case 'priority':
          if (isAdmin || isFaculty) {
            data = await getPriorityBookings();
          }
          break;
        default:
          data = await getUserBookings();
      }
      
      setBookings(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch bookings');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchBookings();
    }
  }, [user, type, isAdmin, isFaculty]);

  return {
    bookings,
    loading,
    error,
    refetch: fetchBookings,
  };
};

export const useBookingStats = () => {
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    approved: 0,
    priority: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getBookingStats();
        setStats(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch stats');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return { stats, loading, error };
};
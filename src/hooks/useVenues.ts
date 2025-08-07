import { useState, useEffect } from 'react';
import { Venue } from '../lib/supabase';
import { getVenues, getAvailableVenues } from '../lib/api/venues';

export const useVenues = (availableOnly: boolean = false) => {
  const [venues, setVenues] = useState<Venue[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchVenues = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const data = availableOnly ? await getAvailableVenues() : await getVenues();
      setVenues(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch venues');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVenues();
  }, [availableOnly]);

  return {
    venues,
    loading,
    error,
    refetch: fetchVenues,
  };
};
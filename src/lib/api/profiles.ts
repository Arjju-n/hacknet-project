import { supabase, Profile, getCurrentUser } from '../supabase';

export const getProfile = async (userId?: string): Promise<Profile | null> => {
  const user = userId || (await getCurrentUser())?.id;
  if (!user) return null;
  
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user)
    .single();
    
  if (error) {
    if (error.code === 'PGRST116') return null; // No rows returned
    throw error;
  }
  
  return data;
};

export const getAllProfiles = async (): Promise<Profile[]> => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .order('full_name');
    
  if (error) throw error;
  return data;
};

export const getProfilesByRole = async (role: 'student' | 'faculty' | 'admin'): Promise<Profile[]> => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('role', role)
    .order('full_name');
    
  if (error) throw error;
  return data;
};

export const updateProfile = async (userId: string, updates: Partial<Profile>): Promise<Profile> => {
  const { data, error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', userId)
    .select()
    .single();
    
  if (error) throw error;
  return data;
};

export const deleteProfile = async (userId: string): Promise<void> => {
  const { error } = await supabase
    .from('profiles')
    .delete()
    .eq('id', userId);
    
  if (error) throw error;
};

export const getProfileStats = async () => {
  const { data: totalUsers, error: totalError } = await supabase
    .from('profiles')
    .select('id', { count: 'exact' });
    
  const { data: students, error: studentsError } = await supabase
    .from('profiles')
    .select('id', { count: 'exact' })
    .eq('role', 'student');
    
  const { data: faculty, error: facultyError } = await supabase
    .from('profiles')
    .select('id', { count: 'exact' })
    .eq('role', 'faculty');
    
  const { data: admins, error: adminsError } = await supabase
    .from('profiles')
    .select('id', { count: 'exact' })
    .eq('role', 'admin');
    
  if (totalError || studentsError || facultyError || adminsError) {
    throw new Error('Failed to fetch profile statistics');
  }
  
  return {
    total: totalUsers?.length || 0,
    students: students?.length || 0,
    faculty: faculty?.length || 0,
    admins: admins?.length || 0,
  };
};
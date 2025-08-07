import { supabase, BookingDocument } from '../supabase';

export const uploadBookingDocument = async (
  bookingId: string,
  file: File
): Promise<BookingDocument> => {
  // Upload file to Supabase Storage
  const fileExt = file.name.split('.').pop();
  const fileName = `${bookingId}/${Date.now()}.${fileExt}`;
  
  const { data: uploadData, error: uploadError } = await supabase.storage
    .from('booking-documents')
    .upload(fileName, file);
    
  if (uploadError) throw uploadError;
  
  // Save document record to database
  const { data, error } = await supabase
    .from('booking_documents')
    .insert({
      booking_id: bookingId,
      file_name: file.name,
      file_path: uploadData.path,
      file_size: file.size,
    })
    .select()
    .single();
    
  if (error) throw error;
  return data;
};

export const getBookingDocuments = async (bookingId: string): Promise<BookingDocument[]> => {
  const { data, error } = await supabase
    .from('booking_documents')
    .select('*')
    .eq('booking_id', bookingId)
    .order('uploaded_at', { ascending: false });
    
  if (error) throw error;
  return data;
};

export const downloadDocument = async (filePath: string): Promise<Blob> => {
  const { data, error } = await supabase.storage
    .from('booking-documents')
    .download(filePath);
    
  if (error) throw error;
  return data;
};

export const deleteDocument = async (documentId: string): Promise<void> => {
  // Get document info first
  const { data: document, error: fetchError } = await supabase
    .from('booking_documents')
    .select('file_path')
    .eq('id', documentId)
    .single();
    
  if (fetchError) throw fetchError;
  
  // Delete from storage
  const { error: storageError } = await supabase.storage
    .from('booking-documents')
    .remove([document.file_path]);
    
  if (storageError) throw storageError;
  
  // Delete from database
  const { error: dbError } = await supabase
    .from('booking_documents')
    .delete()
    .eq('id', documentId);
    
  if (dbError) throw dbError;
};

export const getDocumentUrl = (filePath: string): string => {
  const { data } = supabase.storage
    .from('booking-documents')
    .getPublicUrl(filePath);
    
  return data.publicUrl;
};
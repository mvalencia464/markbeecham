import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Photo } from '../types';
import { INITIAL_PHOTOS } from '../constants';
import { supabase } from '../utils/supabaseClient';

interface PortfolioContextType {
  photos: Photo[];
  loading: boolean;
  addPhoto: (photo: Omit<Photo, 'id'>) => Promise<void>;
  deletePhoto: (id: string) => Promise<void>;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const PortfolioProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPhotos = async () => {
    try {
      const { data, error } = await supabase
        .from('photos')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Combine initial static photos with uploaded ones
      // Note: In a full migration, we'd seed INITIAL_PHOTOS into the DB
      setPhotos([...(data || []), ...INITIAL_PHOTOS]);
    } catch (error) {
      console.error('Error fetching photos:', error);
      // Fallback to initial photos on error
      setPhotos(INITIAL_PHOTOS);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPhotos();
  }, []);

  const addPhoto = async (photo: Omit<Photo, 'id'>) => {
    try {
      const { data, error } = await supabase
        .from('photos')
        .insert([photo])
        .select()
        .single();

      if (error) throw error;
      if (data) {
        setPhotos(prev => [data, ...prev]);
      }
    } catch (error) {
      console.error('Error adding photo:', error);
      throw error;
    }
  };

  const deletePhoto = async (id: string) => {
    try {
      // Find photo to check for storage path
      const photoToDelete = photos.find(p => p.id === id);

      // If it's one of the initial static photos (numeric IDs), just filter it out locally
      // (Though in reality we probably shouldn't allow deleting static assets via this UI)
      if (!photoToDelete?.storage_path) {
        setPhotos(prev => prev.filter(p => p.id !== id));
        return;
      }

      // Delete from storage if it has a path
      if (photoToDelete.storage_path) {
        const { error: storageError } = await supabase.storage
          .from('portfolio-images')
          .remove([photoToDelete.storage_path]);

        if (storageError) console.error('Error deleting from storage:', storageError);
      }

      // Delete from DB
      const { error } = await supabase
        .from('photos')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setPhotos(prev => prev.filter(p => p.id !== id));
    } catch (error) {
      console.error('Error deleting photo:', error);
      throw error;
    }
  };

  return (
    <PortfolioContext.Provider value={{ photos, loading, addPhoto, deletePhoto }}>
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (context === undefined) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};

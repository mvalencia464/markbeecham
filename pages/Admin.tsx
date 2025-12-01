import React, { useState, useCallback } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Upload, Trash2, Home, Image as ImageIcon, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Admin: React.FC = () => {
  const { photos, addPhoto, deletePhoto } = usePortfolio();
  const [isDragging, setIsDragging] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files) as File[];
    
    // In a real app, this would upload to a server. 
    // Here we create object URLs for local preview/usage.
    files.forEach(file => {
      if (file.type.startsWith('image/')) {
        const newPhoto = {
          id: Date.now().toString() + Math.random().toString(),
          url: URL.createObjectURL(file),
          title: file.name.split('.')[0], // Use filename as title
          category: 'Uploads' as const
        };
        addPhoto(newPhoto);
      }
    });

    if (files.length > 0) {
      showNotification(`Successfully added ${files.length} images!`);
    }
  }, [addPhoto]);

  // Handle standard file input
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const files = Array.from(e.target.files) as File[];
       files.forEach(file => {
        if (file.type.startsWith('image/')) {
          const newPhoto = {
            id: Date.now().toString() + Math.random().toString(),
            url: URL.createObjectURL(file),
            title: file.name.split('.')[0],
            category: 'Uploads' as const
          };
          addPhoto(newPhoto);
        }
      });
      showNotification(`Successfully added ${files.length} images!`);
    }
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-200">
      {/* Admin Nav */}
      <div className="bg-stone-900 border-b border-stone-800 p-4 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
             <div className="bg-amber-600 p-2 rounded-md">
                 <ImageIcon className="text-white h-5 w-5" />
             </div>
             <h1 className="text-xl font-serif font-bold text-white">Portfolio Manager</h1>
          </div>
          <Link to="/" className="flex items-center gap-2 text-stone-400 hover:text-amber-500 transition-colors">
            <Home size={18} />
            <span className="text-sm font-medium">Back to Site</span>
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        
        {/* Notification */}
        {notification && (
          <div className="fixed top-20 right-4 bg-green-900/90 text-green-100 px-6 py-3 rounded shadow-xl flex items-center gap-3 animate-fade-in z-50">
            <CheckCircle size={20} />
            {notification}
          </div>
        )}

        {/* Upload Area */}
        <div 
          className={`mb-12 border-2 border-dashed rounded-xl p-12 text-center transition-all duration-300 ${
            isDragging 
              ? 'border-amber-500 bg-amber-500/10 scale-[1.01]' 
              : 'border-stone-700 bg-stone-900/50 hover:border-stone-500'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="flex flex-col items-center gap-4">
            <div className={`p-4 rounded-full ${isDragging ? 'bg-amber-500/20' : 'bg-stone-800'}`}>
                <Upload className={`h-8 w-8 ${isDragging ? 'text-amber-500' : 'text-stone-400'}`} />
            </div>
            <div>
                <p className="text-xl font-medium text-white mb-2">Drag and drop photos here</p>
                <p className="text-stone-500 mb-6">or click to browse from your computer</p>
                
                <label className="cursor-pointer bg-amber-600 hover:bg-amber-500 text-white px-6 py-2.5 rounded text-sm font-bold uppercase tracking-wider transition-colors inline-block">
                    Select Files
                    <input 
                        type="file" 
                        multiple 
                        accept="image/*" 
                        className="hidden" 
                        onChange={handleFileSelect} 
                    />
                </label>
            </div>
            <p className="text-stone-600 text-xs mt-4">Supports JPG, PNG, WEBP</p>
          </div>
        </div>

        {/* Gallery Management */}
        <div>
            <h2 className="text-2xl font-serif text-white font-bold mb-6 flex items-center gap-3">
                Current Gallery 
                <span className="text-sm font-sans font-normal text-stone-500 bg-stone-900 px-2 py-1 rounded">
                    {photos.length} items
                </span>
            </h2>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {photos.map(photo => (
                    <div key={photo.id} className="group relative aspect-square bg-stone-900 rounded overflow-hidden border border-stone-800 hover:border-amber-500/50 transition-colors">
                        <img 
                            src={photo.url} 
                            alt={photo.title} 
                            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                        />
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-3">
                             <span className="text-xs text-stone-300 font-medium truncate">{photo.title}</span>
                             <button 
                                onClick={() => deletePhoto(photo.id)}
                                className="self-end bg-red-500/80 hover:bg-red-600 text-white p-2 rounded-full transition-colors"
                                title="Delete Photo"
                             >
                                 <Trash2 size={16} />
                             </button>
                        </div>
                        <div className="absolute top-2 left-2 bg-black/50 text-white text-[10px] px-2 py-0.5 rounded backdrop-blur-sm">
                            {photo.category}
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
};
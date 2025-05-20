import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../../../supabaseClient';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, arrayMove, rectSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { 
  ArrowUpTrayIcon, 
  XMarkIcon, 
  PencilSquareIcon,
  CheckIcon,
  ArrowsUpDownIcon
} from '@heroicons/react/24/outline';

const ACCEPTED_FILE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

// Sortable image item component
const SortableImage = ({ id, url, alt, display_order, onDelete, onAltChange }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [altText, setAltText] = useState(alt);
  
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 1 : 0,
  };

  const handleAltSave = () => {
    onAltChange(id, altText);
    setIsEditing(false);
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`relative group bg-white rounded-lg shadow ${isDragging ? 'shadow-lg' : ''}`}
    >
      <div className="aspect-square overflow-hidden rounded-t-lg">
        <img
          src={url}
          alt={alt}
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Controls */}
      <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={() => onDelete(id)}
          className="p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
        >
          <XMarkIcon className="h-4 w-4" />
        </button>
      </div>

      {/* Drag handle */}
      <div
        {...attributes}
        {...listeners}
        className="absolute top-2 left-2 p-1 bg-gray-800 bg-opacity-50 text-white rounded-full cursor-move opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <ArrowsUpDownIcon className="h-4 w-4" />
      </div>

      {/* Alt text section */}
      <div className="p-2 border-t">
        {isEditing ? (
          <div className="flex gap-2">
            <input
              type="text"
              value={altText}
              onChange={(e) => setAltText(e.target.value)}
              className="flex-1 text-sm px-2 py-1 border rounded"
              placeholder="Enter alt text"
            />
            <button
              onClick={handleAltSave}
              className="p-1 bg-purple-500 text-white rounded hover:bg-purple-600"
            >
              <CheckIcon className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600 truncate">
              {alt || 'No alt text'}
            </span>
            <button
              onClick={() => setIsEditing(true)}
              className="p-1 text-gray-500 hover:text-purple-600"
            >
              <PencilSquareIcon className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const MediaSelector = ({ productId, value = [], onChange, className = '' }) => {
  const [files, setFiles] = useState([]);
  const [uploads, setUploads] = useState(new Map());
  const [error, setError] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [items, setItems] = useState(value);

  // DND sensors configuration
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor)
  );

  useEffect(() => {
    if (productId) {
      fetchProductImages();
    }
  }, [productId]);

  const fetchProductImages = async () => {
    try {
      const { data, error } = await supabase
        .from('product_images')
        .select('*')
        .eq('product_id', productId)
        .order('display_order');

      if (error) throw error;
      setItems(data);
      onChange(data);
    } catch (err) {
      console.error('Error fetching product images:', err);
      setError('Failed to load images');
    }
  };

  const validateFile = (file) => {
    if (!ACCEPTED_FILE_TYPES.includes(file.type)) {
      throw new Error('Invalid file type. Please upload JPG, PNG, or WebP images.');
    }
    if (file.size > MAX_FILE_SIZE) {
      throw new Error('File too large. Maximum size is 5MB.');
    }
  };

  const handleFileSelect = async (selectedFiles) => {
    try {
      setError(null);
      const newFiles = Array.from(selectedFiles);
      
      // Validate all files first
      newFiles.forEach(validateFile);
      
      // Add files to state
      setFiles(prev => [...prev, ...newFiles]);
      
      // Start upload process for each file
      newFiles.forEach(file => handleUpload(file));
    } catch (err) {
      setError(err.message);
    }
  };

  const handleUpload = async (file) => {
    try {
      // Create unique file name
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `${productId}/${fileName}`;

      // Update uploads state with 0 progress
      setUploads(prev => new Map(prev).set(file.name, 0));

      // Upload to Supabase Storage
      const { error: uploadError, data } = await supabase.storage
        .from('product-images')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false,
        });

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('product-images')
        .getPublicUrl(filePath);

      // Create database record
      const { error: dbError, data: imageRecord } = await supabase
        .from('product_images')
        .insert({
          product_id: productId,
          url: publicUrl,
          display_order: items.length,
          alt: file.name,
        })
        .select()
        .single();

      if (dbError) throw dbError;

      // Update state
      setItems(prev => [...prev, imageRecord]);
      onChange([...items, imageRecord]);
      
      // Remove from uploads
      setUploads(prev => {
        const newMap = new Map(prev);
        newMap.delete(file.name);
        return newMap;
      });
      
      // Remove from files
      setFiles(prev => prev.filter(f => f.name !== file.name));
    } catch (err) {
      console.error('Error uploading file:', err);
      setError(`Failed to upload ${file.name}`);
      
      // Remove from uploads
      setUploads(prev => {
        const newMap = new Map(prev);
        newMap.delete(file.name);
        return newMap;
      });
    }
  };

  const handleDelete = async (imageId) => {
    try {
      const imageToDelete = items.find(item => item.id === imageId);
      if (!imageToDelete) return;

      // Delete from Storage
      const filePathMatch = imageToDelete.url.match(/product-images\/(.*)/);
      if (filePathMatch) {
        await supabase.storage
          .from('product-images')
          .remove([filePathMatch[1]]);
      }

      // Delete from database
      const { error } = await supabase
        .from('product_images')
        .delete()
        .eq('id', imageId);

      if (error) throw error;

      // Update state
      const newItems = items.filter(item => item.id !== imageId);
      setItems(newItems);
      onChange(newItems);
    } catch (err) {
      console.error('Error deleting image:', err);
      setError('Failed to delete image');
    }
  };

  const handleAltChange = async (imageId, newAlt) => {
    try {
      const { error } = await supabase
        .from('product_images')
        .update({ alt: newAlt })
        .eq('id', imageId);

      if (error) throw error;

      // Update state
      const newItems = items.map(item =>
        item.id === imageId ? { ...item, alt: newAlt } : item
      );
      setItems(newItems);
      onChange(newItems);
    } catch (err) {
      console.error('Error updating alt text:', err);
      setError('Failed to update alt text');
    }
  };

  const handleDragEnd = async (event) => {
    const { active, over } = event;
    
    if (active.id !== over.id) {
      const oldIndex = items.findIndex(item => item.id === active.id);
      const newIndex = items.findIndex(item => item.id === over.id);
      
      const newItems = arrayMove(items, oldIndex, newIndex);
      
      // Update display order in database
      try {
        const updates = newItems.map((item, index) => ({
          id: item.id,
          display_order: index,
        }));

        const { error } = await supabase
          .from('product_images')
          .upsert(updates);

        if (error) throw error;

        setItems(newItems);
        onChange(newItems);
      } catch (err) {
        console.error('Error updating display order:', err);
        setError('Failed to update image order');
      }
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFiles = e.dataTransfer.files;
    handleFileSelect(droppedFiles);
  };

  return (
    <div className={className}>
      {/* Upload Area */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`
          border-2 border-dashed rounded-lg p-8 text-center
          ${isDragging ? 'border-purple-500 bg-purple-50' : 'border-gray-300'}
          transition-colors duration-200
        `}
      >
        <ArrowUpTrayIcon className="h-12 w-12 mx-auto text-gray-400" />
        <p className="mt-2 text-sm text-gray-600">
          Drag and drop images here, or{' '}
          <label className="text-purple-600 hover:text-purple-700 cursor-pointer">
            browse
            <input
              type="file"
              className="hidden"
              multiple
              accept={ACCEPTED_FILE_TYPES.join(',')}
              onChange={(e) => handleFileSelect(e.target.files)}
            />
          </label>
        </p>
        <p className="mt-1 text-xs text-gray-500">
          Maximum file size: 5MB. Supported formats: JPG, PNG, WebP
        </p>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mt-4 p-4 bg-red-50 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      {/* Upload Progress */}
      {uploads.size > 0 && (
        <div className="mt-4 space-y-2">
          {Array.from(uploads.entries()).map(([fileName, progress]) => (
            <div key={fileName} className="flex items-center gap-2">
              <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-purple-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <span className="text-sm text-gray-600">{fileName}</span>
            </div>
          ))}
        </div>
      )}

      {/* Images Grid */}
      {items.length > 0 && (
        <div className="mt-6">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext items={items.map(item => item.id)} strategy={rectSortingStrategy}>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {items.map((item) => (
                  <SortableImage
                    key={item.id}
                    id={item.id}
                    url={item.url}
                    alt={item.alt}
                    display_order={item.display_order}
                    onDelete={handleDelete}
                    onAltChange={handleAltChange}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        </div>
      )}
    </div>
  );
};

export default MediaSelector; 
import { useState, useEffect, useRef } from 'react';
import { supabase } from '../../../supabaseClient';
import { XMarkIcon, PlusIcon, ChevronDownIcon, CheckIcon } from '@heroicons/react/24/outline';

const CategorySelector = ({ value = [], onChange, className = '' }) => {
  // State management
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [isCreatingCategory, setIsCreatingCategory] = useState(false);
  const dropdownRef = useRef(null);

  // Fetch categories on mount
  useEffect(() => {
    fetchCategories();
  }, []);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Fetch categories from Supabase
  const fetchCategories = async () => {
    try {
      setLoading(true);
      setError(null);
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('name');

      if (error) throw error;
      setCategories(data);
    } catch (err) {
      console.error('Error fetching categories:', err);
      setError('Failed to load categories');
    } finally {
      setLoading(false);
    }
  };

  // Create new category
  const handleCreateCategory = async (e) => {
    e.preventDefault();
    if (!newCategoryName.trim()) return;

    try {
      setIsCreatingCategory(true);
      setError(null);

      const { data, error } = await supabase
        .from('categories')
        .insert({ name: newCategoryName.trim() })
        .select()
        .single();

      if (error) throw error;

      // Update categories list and selection
      setCategories([...categories, data]);
      onChange([...value, data.id]);
      
      // Reset form
      setNewCategoryName('');
      setIsModalOpen(false);
    } catch (err) {
      console.error('Error creating category:', err);
      setError('Failed to create category');
    } finally {
      setIsCreatingCategory(false);
    }
  };

  // Handle category selection
  const handleCategoryToggle = (categoryId) => {
    const newValue = value.includes(categoryId)
      ? value.filter(id => id !== categoryId)
      : [...value, categoryId];
    onChange(newValue);
  };

  // Filter categories based on search
  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Get selected category names for display
  const selectedCategories = categories.filter(cat => value.includes(cat.id));

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {/* Selected Categories Display */}
      <div className="min-h-[42px] p-2 border rounded-lg bg-white flex flex-wrap gap-2 cursor-pointer"
           onClick={() => setIsOpen(true)}>
        {selectedCategories.map(category => (
          <div
            key={category.id}
            className="inline-flex items-center gap-1 px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-sm"
          >
            <span>{category.name}</span>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleCategoryToggle(category.id);
              }}
              className="p-0.5 hover:bg-purple-200 rounded-full"
            >
              <XMarkIcon className="h-4 w-4" />
            </button>
          </div>
        ))}
        {selectedCategories.length === 0 && (
          <div className="text-gray-500">Select categories...</div>
        )}
      </div>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute z-10 mt-1 w-full bg-white rounded-lg border shadow-lg">
          {/* Search Input */}
          <div className="p-2 border-b">
            <input
              type="text"
              placeholder="Search categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              onClick={(e) => e.stopPropagation()}
            />
          </div>

          {/* Categories List */}
          <div className="max-h-60 overflow-y-auto">
            {loading ? (
              <div className="p-4 text-center text-gray-500">Loading categories...</div>
            ) : error ? (
              <div className="p-4 text-center text-red-500">{error}</div>
            ) : filteredCategories.length === 0 ? (
              <div className="p-4 text-center text-gray-500">No categories found</div>
            ) : (
              <div className="py-2">
                {filteredCategories.map(category => (
                  <div
                    key={category.id}
                    onClick={() => handleCategoryToggle(category.id)}
                    className="px-4 py-2 hover:bg-gray-50 cursor-pointer flex items-center justify-between"
                  >
                    <span>{category.name}</span>
                    {value.includes(category.id) && (
                      <CheckIcon className="h-5 w-5 text-purple-600" />
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Add New Category Button */}
          <div className="p-2 border-t">
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="w-full px-4 py-2 text-left text-purple-600 hover:bg-purple-50 rounded-md flex items-center gap-2"
            >
              <PlusIcon className="h-5 w-5" />
              Add New Category
            </button>
          </div>
        </div>
      )}

      {/* Add Category Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">Add New Category</h3>
            <form onSubmit={handleCreateCategory}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category Name
                </label>
                <input
                  type="text"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>
              {error && (
                <div className="mb-4 text-red-500 text-sm">{error}</div>
              )}
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isCreatingCategory}
                  className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-md hover:from-purple-700 hover:to-pink-700 disabled:opacity-50"
                >
                  {isCreatingCategory ? 'Creating...' : 'Create Category'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategorySelector; 
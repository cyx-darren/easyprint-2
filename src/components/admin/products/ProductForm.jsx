import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from '../../../supabaseClient';
import CategorySelector from './CategorySelector';

const ProductForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    product_code: '',
    description: '',
    is_enabled: true,
    category_ids: [],
    base_price: '',
    images: []
  });

  useEffect(() => {
    fetchCategories();
    if (id) {
      fetchProduct();
    }
  }, [id]);

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('id, name')
        .order('name');
      
      if (error) throw error;
      setCategories(data);
    } catch (err) {
      console.error('Error fetching categories:', err);
      setError('Failed to load categories');
    }
  };

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('products')
        .select(`
          *,
          product_categories (
            category_id
          ),
          product_images (
            id,
            url,
            display_order
          ),
          product_pricing (
            price,
            is_active
          )
        `)
        .eq('id', id)
        .single();

      if (error) throw error;

      setFormData({
        name: data.name,
        product_code: data.product_code,
        description: data.description,
        is_enabled: data.is_enabled,
        category_ids: data.product_categories.map(pc => pc.category_id),
        base_price: data.product_pricing.find(p => p.is_active)?.price || '',
        images: data.product_images
      });
    } catch (err) {
      console.error('Error fetching product:', err);
      setError('Failed to load product');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);

      // Insert/update product
      const productData = {
        name: formData.name,
        product_code: formData.product_code,
        description: formData.description,
        is_enabled: formData.is_enabled,
        updated_at: new Date()
      };

      if (!id) {
        productData.created_at = new Date();
      }

      const { data: product, error: productError } = id
        ? await supabase
            .from('products')
            .update(productData)
            .eq('id', id)
            .select()
            .single()
        : await supabase
            .from('products')
            .insert(productData)
            .select()
            .single();

      if (productError) throw productError;

      // Handle categories
      if (id) {
        await supabase
          .from('product_categories')
          .delete()
          .eq('product_id', id);
      }

      const categoryData = formData.category_ids.map(categoryId => ({
        product_id: product.id,
        category_id: categoryId
      }));

      const { error: categoriesError } = await supabase
        .from('product_categories')
        .insert(categoryData);

      if (categoriesError) throw categoriesError;

      // Handle pricing
      const pricingData = {
        product_id: product.id,
        price: parseFloat(formData.base_price),
        is_active: true
      };

      if (id) {
        await supabase
          .from('product_pricing')
          .update({ is_active: false })
          .eq('product_id', id);
      }

      const { error: pricingError } = await supabase
        .from('product_pricing')
        .insert(pricingData);

      if (pricingError) throw pricingError;

      navigate('/admin/products');
    } catch (err) {
      console.error('Error saving product:', err);
      setError('Failed to save product');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">{id ? 'Edit' : 'Add New'} Product</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">SKU</label>
          <input
            type="text"
            value={formData.product_code}
            onChange={(e) => setFormData(prev => ({ ...prev, product_code: e.target.value }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            rows={4}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Categories</label>
          <CategorySelector
            value={formData.category_ids}
            onChange={(newIds) => setFormData(prev => ({ ...prev, category_ids: newIds }))}
            className="mt-1"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Base Price</label>
          <input
            type="number"
            step="0.01"
            value={formData.base_price}
            onChange={(e) => setFormData(prev => ({ ...prev, base_price: e.target.value }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Status</label>
          <select
            value={formData.is_enabled}
            onChange={(e) => setFormData(prev => ({ ...prev, is_enabled: e.target.value === 'true' }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
          >
            <option value="true">Active</option>
            <option value="false">Inactive</option>
          </select>
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700"
          >
            {loading ? 'Saving...' : 'Save Product'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/admin/products')}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm; 
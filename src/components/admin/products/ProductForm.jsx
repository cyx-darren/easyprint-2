import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from '../../../supabaseClient';
import CategorySelector from './CategorySelector';
import MediaSelector from './MediaSelector';
import PricingMatrixEditor from './PricingMatrixEditor';
import { Tab } from '@headlessui/react';

const ProductForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [formData, setFormData] = useState({
    // Basic Info
    name: '',
    product_code: '',
    description: '',
    is_enabled: true,
    slug: '',
    
    // Categories
    category_ids: [],
    
    // SEO
    meta_title: '',
    meta_description: '',
    
    // Media
    images: [],
    
    // Pricing
    base_price: '',
    pricing_matrix: [],
    
    // Options/Variants
    options: [],
    variants: [],
    
    // Related Products
    related_product_ids: []
  });

  // Tab state
  const [selectedTab, setSelectedTab] = useState(0);
  const tabs = [
    { name: 'Basic Info', id: 'basic' },
    { name: 'Media', id: 'media' },
    { name: 'Pricing', id: 'pricing' },
    { name: 'Options', id: 'options' },
    { name: 'SEO', id: 'seo' },
    { name: 'Related', id: 'related' }
  ];

  // Generate slug from name
  const generateSlug = (name) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-') // Replace special characters with hyphens
      .replace(/^-+|-+$/g, '') // Remove leading/trailing hyphens
      .replace(/-+/g, '-'); // Replace multiple hyphens with single hyphen
  };

  // Handle name change and auto-generate slug
  const handleNameChange = (e) => {
    const newName = e.target.value;
    setFormData(prev => ({
      ...prev,
      name: newName,
      // Only auto-generate slug if it hasn't been manually edited
      slug: prev.slug === generateSlug(prev.name) ? generateSlug(newName) : prev.slug
    }));
  };

  // Handle manual slug change
  const handleSlugChange = (e) => {
    const newSlug = generateSlug(e.target.value);
    setFormData(prev => ({
      ...prev,
      slug: newSlug
    }));
  };

  useEffect(() => {
    fetchCategories();
    if (id) {
      fetchProduct();
    } else {
      // Initialize slug for new products
      setFormData(prev => ({
        ...prev,
        slug: generateSlug(prev.name)
      }));
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
      setError(null);
      
      console.log('Fetching product with ID:', id);
      
      // First fetch just the basic product data
      const { data: basicData, error: basicError } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single();

      if (basicError) {
        console.error('Error fetching basic product data:', basicError);
        throw basicError;
      }

      console.log('Basic product data:', basicData);

      // Then fetch related data
      const [
        categoriesResult,
        imagesResult,
        pricingResult,
        relatedResult
      ] = await Promise.all([
        supabase
          .from('product_categories')
          .select('category_id')
          .eq('product_id', id),
        supabase
          .from('product_images')
          .select('id, url, display_order')
          .eq('product_id', id),
        supabase
          .from('product_pricing')
          .select('id, price, is_active, price_tier_id, print_option_id, lead_time_id')
          .eq('product_id', id),
        supabase
          .from('related_products')
          .select('related_product_id')
          .eq('product_id', id)
      ]);

      // Check for errors in each query
      if (categoriesResult.error) {
        console.error('Error fetching categories:', categoriesResult.error);
        throw categoriesResult.error;
      }
      if (imagesResult.error) {
        console.error('Error fetching images:', imagesResult.error);
        throw imagesResult.error;
      }
      if (pricingResult.error) {
        console.error('Error fetching pricing:', pricingResult.error);
        throw pricingResult.error;
      }
      if (relatedResult.error) {
        console.error('Error fetching related products:', relatedResult.error);
        throw relatedResult.error;
      }

      console.log('Categories data:', categoriesResult.data);
      console.log('Images data:', imagesResult.data);
      console.log('Pricing data:', pricingResult.data);
      console.log('Related products data:', relatedResult.data);

      // Fetch related products details if needed
      let relatedProducts = [];
      const relatedIds = relatedResult.data.map(r => r.related_product_id);
      
      if (relatedIds.length > 0) {
        const { data: relatedData, error: relatedError } = await supabase
          .from('products')
          .select('id, name, product_code, product_images(url)')
          .in('id', relatedIds);

        if (relatedError) {
          console.error('Error fetching related product details:', relatedError);
          throw relatedError;
        }
        
        relatedProducts = relatedData;
      }

      // Transform the data to match our form structure
      setFormData({
        name: basicData.name,
        product_code: basicData.product_code,
        description: basicData.description,
        is_enabled: basicData.is_enabled,
        slug: basicData.slug || generateSlug(basicData.name),
        category_ids: categoriesResult.data.map(pc => pc.category_id),
        base_price: pricingResult.data.find(p => p.is_active && !p.price_tier_id)?.price || '',
        pricing_matrix: pricingResult.data
          .filter(p => p.is_active && p.price_tier_id)
          .map(p => ({
            price_tier_id: p.price_tier_id,
            print_option_id: p.print_option_id,
            lead_time_id: p.lead_time_id,
            price: p.price
          })),
        images: imagesResult.data,
        meta_title: basicData.meta_title || '',
        meta_description: basicData.meta_description || '',
        options: [], // Empty for now until we set up the tables
        variants: [], // Empty for now until we set up the tables
        related_product_ids: relatedIds
      });

      setRelatedProducts(relatedProducts.map(product => ({
        ...product,
        thumbnail: product.product_images?.[0]?.url || '/placeholder.png'
      })));

    } catch (err) {
      console.error('Error in fetchProduct:', err);
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

      // Validate required fields
      if (!formData.name || !formData.product_code || !formData.slug) {
        setError('Name, SKU, and URL Slug are required fields');
        return;
      }

      // Validate base price
      if (!formData.base_price || isNaN(parseFloat(formData.base_price))) {
        setError('Base price is required and must be a valid number');
        return;
      }

      console.log('Form validation passed. Submitting form data:', {
        name: formData.name,
        product_code: formData.product_code,
        slug: formData.slug,
        base_price: formData.base_price,
        pricing_matrix: formData.pricing_matrix
      });

      // Check if slug is unique
      const slugCheckQuery = supabase
        .from('products')
        .select('id')
        .eq('slug', formData.slug);

      // Only add the neq condition if we have an id (editing mode)
      if (id) {
        slugCheckQuery.neq('id', id);
      }

      const { data: existingProduct, error: slugCheckError } = await slugCheckQuery.single();

      if (slugCheckError && slugCheckError.code !== 'PGRST116') { // PGRST116 means no rows returned
        console.error('Slug check error:', slugCheckError);
        throw slugCheckError;
      }

      if (existingProduct) {
        setError('A product with this slug already exists. Please choose a different one.');
        return;
      }

      // 1. Insert/update product
      const productData = {
        name: formData.name,
        product_code: formData.product_code,
        description: formData.description,
        is_enabled: formData.is_enabled,
        slug: formData.slug,
        updated_at: new Date()
      };

      if (!id) {
        productData.created_at = new Date();
      }

      console.log('Saving product data:', productData);
      let product;
      let productError;

      if (id) {
        // Update existing product
        const result = await supabase
          .from('products')
          .update(productData)
          .eq('id', id)
          .select()
          .single();
        product = result.data;
        productError = result.error;
      } else {
        // Create new product
        const result = await supabase
          .from('products')
          .insert(productData)
          .select()
          .single();
        product = result.data;
        productError = result.error;
      }

      if (productError) {
        console.error('Error saving product:', productError);
        throw productError;
      }

      console.log('Product saved successfully:', product);

      // 2. Handle categories
      if (id) {
        const { error: deleteError } = await supabase
          .from('product_categories')
          .delete()
          .eq('product_id', id);
        
        if (deleteError) {
          console.error('Error deleting existing categories:', deleteError);
          throw deleteError;
        }
      }

      if (formData.category_ids.length > 0) {
        const categoryData = formData.category_ids.map(categoryId => ({
          product_id: product.id,
          category_id: categoryId
        }));

        console.log('Saving category data:', categoryData);
        const { error: categoriesError } = await supabase
          .from('product_categories')
          .insert(categoryData);

        if (categoriesError) {
          console.error('Error saving categories:', categoriesError);
          throw categoriesError;
        }
      }

      // 3. Handle pricing
      // Get the default price tier, print option, and lead time
      const [tierResult, optionResult, leadTimeResult] = await Promise.all([
        supabase
          .from('price_tiers')
          .select('id')
          .order('min_quantity', { ascending: true })
          .limit(1)
          .single(),
        supabase
          .from('print_options')
          .select('id')
          .order('name')
          .limit(1)
          .single(),
        supabase
          .from('lead_times')
          .select('id')
          .order('min_days')
          .limit(1)
          .single()
      ]);

      if (tierResult.error) {
        console.error('Error fetching default price tier:', tierResult.error);
        throw tierResult.error;
      }
      if (optionResult.error) {
        console.error('Error fetching default print option:', optionResult.error);
        throw optionResult.error;
      }
      if (leadTimeResult.error) {
        console.error('Error fetching default lead time:', leadTimeResult.error);
        throw leadTimeResult.error;
      }

      // Prepare pricing data
      let pricingData = new Map(); // Use Map to ensure unique combinations

      // Helper function to generate unique key for pricing entries
      const getPricingKey = (tier_id, option_id, time_id) => 
        `${tier_id}-${option_id}-${time_id}`;

      // Add base price
      const basePrice = {
        product_id: product.id,
        price: parseFloat(formData.base_price),
        price_tier_id: tierResult.data.id,
        print_option_id: optionResult.data.id,
        lead_time_id: leadTimeResult.data.id,
        is_active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      const basePriceKey = getPricingKey(
        basePrice.price_tier_id,
        basePrice.print_option_id,
        basePrice.lead_time_id
      );

      console.log('Adding base price:', basePrice);
      pricingData.set(basePriceKey, basePrice);

      // Add matrix pricing
      if (formData.pricing_matrix && formData.pricing_matrix.length > 0) {
        console.log('Processing matrix pricing data:', formData.pricing_matrix);
        formData.pricing_matrix.forEach((pricing, index) => {
          console.log(`Processing pricing entry ${index}:`, pricing);
          if (pricing.price_tier_id && pricing.print_option_id && pricing.lead_time_id) {
            const price = parseFloat(pricing.price);
            if (isNaN(price)) {
              console.warn(`Invalid price value for entry ${index}:`, pricing.price);
              return;
            }

            const pricingKey = getPricingKey(
              pricing.price_tier_id,
              pricing.print_option_id,
              pricing.lead_time_id
            );

            // Skip if we already have this combination
            if (pricingData.has(pricingKey)) {
              console.warn(`Skipping duplicate pricing entry ${index} with key ${pricingKey}`);
              return;
            }

            const pricingEntry = {
              product_id: product.id,
              price: price,
              price_tier_id: pricing.price_tier_id,
              print_option_id: pricing.print_option_id,
              lead_time_id: pricing.lead_time_id,
              is_active: true,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString()
            };
            console.log(`Adding pricing entry ${index}:`, pricingEntry);
            pricingData.set(pricingKey, pricingEntry);
          } else {
            console.warn(`Skipping invalid pricing entry ${index}:`, pricing);
          }
        });
      }

      // First delete existing pricing
      if (id) {
        console.log('Deleting existing pricing for product:', id);
        const { error: deleteError } = await supabase
          .from('product_pricing')
          .delete()
          .eq('product_id', id);
        
        if (deleteError) {
          console.error('Error deleting existing pricing:', deleteError);
          throw deleteError;
        }
      }

      // Convert Map values to array for insertion
      const uniquePricingData = Array.from(pricingData.values());

      // Insert new pricing data
      console.log('Final pricing data to be inserted:', uniquePricingData);
      const { error: pricingError } = await supabase
        .from('product_pricing')
        .insert(uniquePricingData);

      if (pricingError) {
        console.error('Error inserting pricing:', pricingError);
        throw pricingError;
      }

      // 4. Handle related products
      if (id) {
        const { error: deleteRelatedError } = await supabase
          .from('related_products')
          .delete()
          .eq('product_id', id);
        
        if (deleteRelatedError) {
          console.error('Error deleting existing related products:', deleteRelatedError);
          throw deleteRelatedError;
        }
      }

      if (formData.related_product_ids.length > 0) {
        const relatedData = formData.related_product_ids.map(relatedId => ({
          product_id: product.id,
          related_product_id: relatedId
        }));

        console.log('Saving related products:', relatedData);
        const { error: relatedError } = await supabase
          .from('related_products')
          .insert(relatedData);

        if (relatedError) {
          console.error('Error saving related products:', relatedError);
          throw relatedError;
        }
      }

      navigate('/admin/products');
    } catch (err) {
      console.error('Error saving product:', err);
      setError(`Failed to save product: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">{id ? 'Edit' : 'Add New'} Product</h2>
        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => navigate('/admin/products')}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700"
          >
            {loading ? 'Saving...' : 'Save Product'}
          </button>
        </div>
      </div>

      <Tab.Group selectedIndex={selectedTab} onChange={setSelectedTab}>
        <Tab.List className="flex space-x-1 rounded-xl bg-purple-100 p-1 mb-6">
          {tabs.map((tab) => (
            <Tab
              key={tab.id}
              className={({ selected }) =>
                `w-full rounded-lg py-2.5 text-sm font-medium leading-5
                 ${selected
                  ? 'bg-white text-purple-700 shadow'
                  : 'text-purple-600 hover:bg-white/[0.12] hover:text-purple-700'
                }`
              }
            >
              {tab.name}
            </Tab>
          ))}
        </Tab.List>

        <Tab.Panels className="mt-2">
          {/* Basic Info Tab */}
          <Tab.Panel>
            <div className="space-y-6 bg-white rounded-lg shadow p-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={handleNameChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">URL Slug</label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                    /product/
                  </span>
                  <input
                    type="text"
                    value={formData.slug}
                    onChange={handleSlugChange}
                    className="flex-1 block w-full rounded-none rounded-r-md border-gray-300 focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
                    required
                    pattern="[a-z0-9-]+"
                    title="Only lowercase letters, numbers, and hyphens are allowed"
                  />
                </div>
                <p className="mt-1 text-sm text-gray-500">
                  This will be used in the product's URL. Only use lowercase letters, numbers, and hyphens.
                </p>
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
            </div>
          </Tab.Panel>

          {/* Media Tab */}
          <Tab.Panel>
            <div className="bg-white rounded-lg shadow p-6">
              <MediaSelector
                productId={id}
                value={formData.images}
                onChange={(newImages) => setFormData(prev => ({ ...prev, images: newImages }))}
              />
            </div>
          </Tab.Panel>

          {/* Pricing Tab */}
          <Tab.Panel>
            <div className="space-y-6 bg-white rounded-lg shadow p-6">
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
                <h3 className="text-lg font-medium text-gray-900 mb-4">Quantity-based Pricing</h3>
                <PricingMatrixEditor
                  productId={id}
                  value={formData.pricing_matrix}
                  onChange={(newPricing) => {
                    console.log('Received new pricing data:', newPricing);
                    setFormData(prev => {
                      const newFormData = { ...prev, pricing_matrix: newPricing };
                      console.log('Updated form data:', newFormData);
                      return newFormData;
                    });
                  }}
                />
              </div>
            </div>
          </Tab.Panel>

          {/* Options Tab */}
          <Tab.Panel>
            <div className="space-y-6 bg-white rounded-lg shadow p-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Product Options</h3>
                {formData.options.map((option, optionIndex) => (
                  <div key={optionIndex} className="mb-4 p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <input
                        type="text"
                        value={option.name}
                        onChange={(e) => {
                          const newOptions = [...formData.options];
                          newOptions[optionIndex].name = e.target.value;
                          setFormData(prev => ({ ...prev, options: newOptions }));
                        }}
                        placeholder="Option Name (e.g., Size)"
                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                      />
                      <button
                        onClick={() => {
                          const newOptions = formData.options.filter((_, i) => i !== optionIndex);
                          setFormData(prev => ({ ...prev, options: newOptions }));
                        }}
                        className="ml-2 text-red-600 hover:text-red-700"
                      >
                        Remove
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {option.values.map((value, valueIndex) => (
                        <div key={valueIndex} className="flex items-center">
                          <input
                            type="text"
                            value={value}
                            onChange={(e) => {
                              const newOptions = [...formData.options];
                              newOptions[optionIndex].values[valueIndex] = e.target.value;
                              setFormData(prev => ({ ...prev, options: newOptions }));
                            }}
                            placeholder="Value"
                            className="w-32 rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                          />
                          <button
                            onClick={() => {
                              const newOptions = [...formData.options];
                              newOptions[optionIndex].values = option.values.filter((_, i) => i !== valueIndex);
                              setFormData(prev => ({ ...prev, options: newOptions }));
                            }}
                            className="ml-1 text-red-600 hover:text-red-700"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                      <button
                        onClick={() => {
                          const newOptions = [...formData.options];
                          newOptions[optionIndex].values.push('');
                          setFormData(prev => ({ ...prev, options: newOptions }));
                        }}
                        className="px-2 py-1 text-sm text-purple-600 border border-purple-600 rounded hover:bg-purple-50"
                      >
                        Add Value
                      </button>
                    </div>
                  </div>
                ))}
                <button
                  onClick={() => {
                    setFormData(prev => ({
                      ...prev,
                      options: [...prev.options, { name: '', values: [''] }]
                    }));
                  }}
                  className="mt-4 px-4 py-2 text-purple-600 border border-purple-600 rounded-lg hover:bg-purple-50"
                >
                  Add Option
                </button>
              </div>
            </div>
          </Tab.Panel>

          {/* SEO Tab */}
          <Tab.Panel>
            <div className="space-y-6 bg-white rounded-lg shadow p-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Meta Title</label>
                <input
                  type="text"
                  value={formData.meta_title}
                  onChange={(e) => setFormData(prev => ({ ...prev, meta_title: e.target.value }))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                />
                <p className="mt-1 text-sm text-gray-500">
                  Recommended length: 50-60 characters
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Meta Description</label>
                <textarea
                  value={formData.meta_description}
                  onChange={(e) => setFormData(prev => ({ ...prev, meta_description: e.target.value }))}
                  rows={3}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                />
                <p className="mt-1 text-sm text-gray-500">
                  Recommended length: 150-160 characters
                </p>
              </div>
            </div>
          </Tab.Panel>

          {/* Related Products Tab */}
          <Tab.Panel>
            <div className="space-y-6 bg-white rounded-lg shadow p-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Related Products</h3>
                <div className="grid grid-cols-1 gap-4">
                  {relatedProducts.map(product => (
                    <div
                      key={product.id}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div className="flex items-center">
                        <img
                          src={product.thumbnail}
                          alt={product.name}
                          className="w-12 h-12 rounded object-cover"
                        />
                        <div className="ml-4">
                          <div className="font-medium">{product.name}</div>
                          <div className="text-sm text-gray-500">{product.product_code}</div>
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          const newRelatedIds = formData.related_product_ids.filter(id => id !== product.id);
                          setFormData(prev => ({ ...prev, related_product_ids: newRelatedIds }));
                        }}
                        className="text-red-600 hover:text-red-700"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={() => {
                      // TODO: Implement product selector modal
                    }}
                    className="px-4 py-2 text-purple-600 border border-purple-600 rounded-lg hover:bg-purple-50"
                  >
                    Add Related Product
                  </button>
                </div>
              </div>
            </div>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default ProductForm; 
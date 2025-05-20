import { useState, useEffect } from 'react';
import { supabase } from '../../../supabaseClient';
import { PencilSquareIcon, TrashIcon, PlusIcon } from '@heroicons/react/24/outline';

const PricingManager = () => {
  const [activeTab, setActiveTab] = useState('tiers');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      let query;
      switch (activeTab) {
        case 'tiers':
          query = supabase
            .from('price_tiers')
            .select('*')
            .order('min_quantity');
          break;
        case 'options':
          query = supabase
            .from('print_options')
            .select('*')
            .order('name');
          break;
        case 'leadtimes':
          query = supabase
            .from('lead_times')
            .select('*')
            .order('min_days');
          break;
      }

      const { data, error } = await query;
      if (error) throw error;
      setData(data);
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);

      const table = {
        tiers: 'price_tiers',
        options: 'print_options',
        leadtimes: 'lead_times'
      }[activeTab];

      if (editingItem) {
        const { error } = await supabase
          .from(table)
          .update(formData)
          .eq('id', editingItem.id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from(table)
          .insert(formData);

        if (error) throw error;
      }

      setIsModalOpen(false);
      setEditingItem(null);
      setFormData({});
      fetchData();
    } catch (err) {
      console.error('Error saving:', err);
      setError('Failed to save');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;

    try {
      setLoading(true);
      setError(null);

      const table = {
        tiers: 'price_tiers',
        options: 'print_options',
        leadtimes: 'lead_times'
      }[activeTab];

      const { error } = await supabase
        .from(table)
        .delete()
        .eq('id', id);

      if (error) throw error;
      fetchData();
    } catch (err) {
      console.error('Error deleting:', err);
      setError('Failed to delete');
    } finally {
      setLoading(false);
    }
  };

  const renderForm = () => {
    switch (activeTab) {
      case 'tiers':
        return (
          <>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Minimum Quantity
              </label>
              <input
                type="number"
                value={formData.min_quantity || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, min_quantity: parseInt(e.target.value) }))}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
                min="1"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Maximum Quantity
              </label>
              <input
                type="number"
                value={formData.max_quantity || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, max_quantity: parseInt(e.target.value) }))}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                min={formData.min_quantity || 1}
              />
              <p className="mt-1 text-sm text-gray-500">Leave empty for unlimited</p>
            </div>
          </>
        );

      case 'options':
        return (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Print Option Name
            </label>
            <input
              type="text"
              value={formData.name || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>
        );

      case 'leadtimes':
        return (
          <>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Name
              </label>
              <input
                type="text"
                value={formData.name || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Minimum Days
              </label>
              <input
                type="number"
                value={formData.min_days || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, min_days: parseInt(e.target.value) }))}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
                min="1"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Maximum Days
              </label>
              <input
                type="number"
                value={formData.max_days || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, max_days: parseInt(e.target.value) }))}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
                min={formData.min_days || 1}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                value={formData.description || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                rows="3"
              />
            </div>
            <div className="mb-4">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.is_business_days || false}
                  onChange={(e) => setFormData(prev => ({ ...prev, is_business_days: e.target.checked }))}
                  className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                />
                <span className="text-sm font-medium text-gray-700">Business Days Only</span>
              </label>
            </div>
          </>
        );
    }
  };

  const renderTable = () => {
    if (loading) {
      return <div className="text-center text-gray-500 py-4">Loading...</div>;
    }

    if (error) {
      return <div className="text-center text-red-500 py-4">{error}</div>;
    }

    if (data.length === 0) {
      return <div className="text-center text-gray-500 py-4">No items found</div>;
    }

    switch (activeTab) {
      case 'tiers':
        return (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Minimum Quantity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Maximum Quantity
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data.map(tier => (
                <tr key={tier.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {tier.min_quantity}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {tier.max_quantity || '∞'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => {
                          setEditingItem(tier);
                          setFormData(tier);
                          setIsModalOpen(true);
                        }}
                        className="text-purple-600 hover:text-purple-900"
                      >
                        <PencilSquareIcon className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(tier.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        );

      case 'options':
        return (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data.map(option => (
                <tr key={option.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {option.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => {
                          setEditingItem(option);
                          setFormData(option);
                          setIsModalOpen(true);
                        }}
                        className="text-purple-600 hover:text-purple-900"
                      >
                        <PencilSquareIcon className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(option.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        );

      case 'leadtimes':
        return (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Days
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data.map(time => (
                <tr key={time.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {time.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {time.min_days === time.max_days 
                      ? time.min_days 
                      : `${time.min_days}-${time.max_days}`} days
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {time.description || '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {time.is_business_days ? 'Business Days' : 'Calendar Days'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => {
                          setEditingItem(time);
                          setFormData(time);
                          setIsModalOpen(true);
                        }}
                        className="text-purple-600 hover:text-purple-900"
                      >
                        <PencilSquareIcon className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(time.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Pricing Configuration</h2>
        <button
          onClick={() => {
            setEditingItem(null);
            setFormData({});
            setIsModalOpen(true);
          }}
          className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 flex items-center gap-2"
        >
          <PlusIcon className="h-5 w-5" />
          Add New
        </button>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('tiers')}
            className={`
              py-4 px-1 border-b-2 font-medium text-sm
              ${activeTab === 'tiers'
                ? 'border-purple-500 text-purple-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }
            `}
          >
            Price Tiers
          </button>
          <button
            onClick={() => setActiveTab('options')}
            className={`
              py-4 px-1 border-b-2 font-medium text-sm
              ${activeTab === 'options'
                ? 'border-purple-500 text-purple-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }
            `}
          >
            Print Options
          </button>
          <button
            onClick={() => setActiveTab('leadtimes')}
            className={`
              py-4 px-1 border-b-2 font-medium text-sm
              ${activeTab === 'leadtimes'
                ? 'border-purple-500 text-purple-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }
            `}
          >
            Lead Times
          </button>
        </nav>
      </div>

      {/* Content */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {renderTable()}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">
              {editingItem ? 'Edit' : 'Add New'} {
                activeTab === 'tiers' ? 'Price Tier' :
                activeTab === 'options' ? 'Print Option' :
                'Lead Time'
              }
            </h3>
            <form onSubmit={handleSubmit}>
              {renderForm()}
              {error && (
                <div className="mb-4 text-red-500 text-sm">{error}</div>
              )}
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false);
                    setEditingItem(null);
                    setFormData({});
                  }}
                  className="px-4 py-2 border rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-md hover:from-purple-700 hover:to-pink-700 disabled:opacity-50"
                >
                  {loading ? 'Saving...' : 'Save'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PricingManager; 
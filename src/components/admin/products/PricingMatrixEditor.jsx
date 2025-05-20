import { useState, useEffect } from 'react';
import { supabase } from '../../../supabaseClient';
import { Switch } from '@headlessui/react';

const PricingMatrixEditor = ({ productId, value = [], onChange, className = '' }) => {
  // State management
  const [priceTiers, setPriceTiers] = useState([]);
  const [printOptions, setPrintOptions] = useState([]);
  const [leadTimes, setLeadTimes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [matrix, setMatrix] = useState({});
  const [bulkPrice, setBulkPrice] = useState('');
  const [selectedCells, setSelectedCells] = useState([]);

  // Fetch reference data on mount
  useEffect(() => {
    fetchReferenceData();
  }, []);

  // Initialize matrix when reference data is loaded
  useEffect(() => {
    if (priceTiers.length && printOptions.length && leadTimes.length) {
      initializeMatrix();
    }
  }, [priceTiers, printOptions, leadTimes, value]);

  // Fetch all reference data
  const fetchReferenceData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [tiersResult, optionsResult, timesResult] = await Promise.all([
        supabase.from('price_tiers').select('*').order('min_quantity'),
        supabase.from('print_options').select('*').order('name'),
        supabase.from('lead_times').select('*').order('min_days')
      ]);

      if (tiersResult.error) throw tiersResult.error;
      if (optionsResult.error) throw optionsResult.error;
      if (timesResult.error) throw timesResult.error;

      setPriceTiers(tiersResult.data);
      setPrintOptions(optionsResult.data);
      setLeadTimes(timesResult.data);
    } catch (err) {
      console.error('Error fetching reference data:', err);
      setError('Failed to load pricing configuration');
    } finally {
      setLoading(false);
    }
  };

  // Initialize pricing matrix with existing data
  const initializeMatrix = () => {
    const newMatrix = {};
    
    // Create matrix structure
    priceTiers.forEach(tier => {
      printOptions.forEach(option => {
        leadTimes.forEach(time => {
          const key = getMatrixKey(tier.id, option.id, time.id);
          const existingPrice = value.find(p => 
            p.price_tier_id === tier.id &&
            p.print_option_id === option.id &&
            p.lead_time_id === time.id
          );

          newMatrix[key] = {
            enabled: !!existingPrice,
            price: existingPrice?.price || 0,
            tier_id: tier.id,
            option_id: option.id,
            time_id: time.id
          };
        });
      });
    });

    setMatrix(newMatrix);
  };

  // Generate unique key for matrix cell
  const getMatrixKey = (tierId, optionId, timeId) => 
    `${tierId}-${optionId}-${timeId}`;

  // Handle cell toggle
  const handleToggle = (key) => {
    const newMatrix = {
      ...matrix,
      [key]: {
        ...matrix[key],
        enabled: !matrix[key].enabled
      }
    };
    setMatrix(newMatrix);
    emitChange(newMatrix);
  };

  // Handle price change
  const handlePriceChange = (key, value) => {
    const price = parseFloat(value) || 0;
    const newMatrix = {
      ...matrix,
      [key]: {
        ...matrix[key],
        price
      }
    };
    setMatrix(newMatrix);
    emitChange(newMatrix);
  };

  // Handle bulk price update
  const handleBulkUpdate = () => {
    const price = parseFloat(bulkPrice) || 0;
    const newMatrix = { ...matrix };
    
    selectedCells.forEach(key => {
      if (matrix[key].enabled) {
        newMatrix[key] = {
          ...matrix[key],
          price
        };
      }
    });

    setMatrix(newMatrix);
    emitChange(newMatrix);
    setSelectedCells([]);
    setBulkPrice('');
  };

  // Emit change to parent
  const emitChange = (newMatrix) => {
    const pricingData = Object.entries(newMatrix)
      .filter(([_, cell]) => cell.enabled)
      .map(([_, cell]) => ({
        price_tier_id: cell.tier_id,
        print_option_id: cell.option_id,
        lead_time_id: cell.time_id,
        price: cell.price,
        is_active: true
      }));

    onChange(pricingData);
  };

  // Toggle cell selection for bulk update
  const toggleCellSelection = (key) => {
    setSelectedCells(prev => 
      prev.includes(key)
        ? prev.filter(k => k !== key)
        : [...prev, key]
    );
  };

  if (loading) {
    return <div className="p-4 text-gray-500">Loading pricing configuration...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">{error}</div>;
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Bulk Update Controls */}
      {selectedCells.length > 0 && (
        <div className="bg-purple-50 p-4 rounded-lg flex items-center gap-4">
          <span className="text-sm text-purple-700">
            {selectedCells.length} cells selected
          </span>
          <input
            type="number"
            value={bulkPrice}
            onChange={(e) => setBulkPrice(e.target.value)}
            placeholder="Enter bulk price"
            className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button
            onClick={handleBulkUpdate}
            className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-md hover:from-purple-700 hover:to-pink-700"
          >
            Apply to Selected
          </button>
          <button
            onClick={() => setSelectedCells([])}
            className="px-4 py-2 border rounded-md hover:bg-gray-50"
          >
            Clear Selection
          </button>
        </div>
      )}

      {/* Pricing Matrix */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Quantity Range
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Lead Time
              </th>
              {printOptions.map(option => (
                <th
                  key={option.id}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {option.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {priceTiers.map((tier, tierIndex) => (
              leadTimes.map((time, timeIndex) => (
                <tr key={`${tier.id}-${time.id}`}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {timeIndex === 0 && (
                      <div className="font-medium">
                        {tier.min_quantity} - {tier.max_quantity || '∞'}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {time.min_days === time.max_days 
                      ? `${time.min_days} days`
                      : `${time.min_days}-${time.max_days} days`}
                  </td>
                  {printOptions.map(option => {
                    const key = getMatrixKey(tier.id, option.id, time.id);
                    const cell = matrix[key] || { enabled: false, price: 0 };
                    const isSelected = selectedCells.includes(key);

                    return (
                      <td
                        key={key}
                        className={`px-6 py-4 whitespace-nowrap ${
                          isSelected ? 'bg-purple-50' : ''
                        }`}
                        onClick={() => cell.enabled && toggleCellSelection(key)}
                      >
                        <div className="flex items-center gap-4">
                          <Switch
                            checked={cell.enabled}
                            onChange={() => handleToggle(key)}
                            className={`${
                              cell.enabled ? 'bg-purple-600' : 'bg-gray-200'
                            } relative inline-flex h-6 w-11 items-center rounded-full`}
                          >
                            <span className="sr-only">Enable pricing</span>
                            <span
                              className={`${
                                cell.enabled ? 'translate-x-6' : 'translate-x-1'
                              } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                            />
                          </Switch>
                          {cell.enabled && (
                            <input
                              type="number"
                              value={cell.price}
                              onChange={(e) => handlePriceChange(key, e.target.value)}
                              className="w-24 px-2 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                              min="0"
                              step="0.01"
                            />
                          )}
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PricingMatrixEditor; 
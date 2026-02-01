import React, { useState } from 'react';
import { Edit, Trash2, Clock, DollarSign } from 'lucide-react';
import { menuAPI } from '../utils/api';

const MenuCard = ({ item, onEdit, onDelete, onUpdate }) => {
  const [isAvailable, setIsAvailable] = useState(item.isAvailable);
  const [isTogglingAvailability, setIsTogglingAvailability] = useState(false);

  // Optimistic UI update for availability toggle
  const handleToggleAvailability = async () => {
    const previousState = isAvailable;
    
    try {
      // 1. Update UI immediately (Optimistic Update)
      setIsAvailable(!isAvailable);
      setIsTogglingAvailability(true);
      
      // 2. Make API call
      await menuAPI.toggleAvailability(item._id);
      
      // 3. Call parent update if provided
      if (onUpdate) {
        onUpdate();
      }
    } catch (error) {
      // 4. Rollback on error
      setIsAvailable(previousState);
      alert('Failed to update availability: ' + (error.response?.data?.message || error.message));
    } finally {
      setIsTogglingAvailability(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      {/* Image */}
      <div className="relative h-48 bg-gray-200">
        {item.imageUrl ? (
          <img
            src={item.imageUrl}
            alt={item.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            No Image
          </div>
        )}
        
        {/* Category Badge */}
        <div className="absolute top-2 right-2">
          <span className="px-3 py-1 bg-primary-600 text-white text-xs font-semibold rounded-full">
            {item.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-900 mb-1">{item.name}</h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {item.description || 'No description available'}
        </p>

        {/* Price and Prep Time */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center text-primary-600 font-bold">
            <DollarSign className="h-4 w-4" />
            <span>{item.price.toFixed(2)}</span>
          </div>
          <div className="flex items-center text-gray-500 text-sm">
            <Clock className="h-4 w-4 mr-1" />
            <span>{item.preparationTime} min</span>
          </div>
        </div>

        {/* Availability Toggle */}
        <div className="mb-3">
          <button
            onClick={handleToggleAvailability}
            disabled={isTogglingAvailability}
            className={`w-full py-2 px-4 rounded-md font-medium transition-colors ${
              isAvailable
                ? 'bg-green-100 text-green-700 hover:bg-green-200'
                : 'bg-red-100 text-red-700 hover:bg-red-200'
            } ${isTogglingAvailability ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isTogglingAvailability ? 'Updating...' : isAvailable ? 'Available' : 'Unavailable'}
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(item)}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            <Edit className="h-4 w-4" />
            Edit
          </button>
          <button
            onClick={() => onDelete(item._id)}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
          >
            <Trash2 className="h-4 w-4" />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuCard;

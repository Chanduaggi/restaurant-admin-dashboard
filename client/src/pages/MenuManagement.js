import React, { useState, useEffect, useCallback } from 'react';
import { Search, Plus, Filter, Loader } from 'lucide-react';
import MenuCard from '../components/MenuCard';
import MenuForm from '../components/MenuForm';
import { menuAPI } from '../utils/api';
import { useDebounce } from '../hooks/useDebounce';

const MenuManagement = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [availabilityFilter, setAvailabilityFilter] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Debounce search query (300ms delay)
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  // Fetch menu items
  const fetchMenuItems = useCallback(async () => {
  try {
    setLoading(true);
    let response;

    if (debouncedSearchQuery.trim()) {
      response = await menuAPI.search(debouncedSearchQuery);
    } else {
      const params = {};
      if (selectedCategory) params.category = selectedCategory;
      if (availabilityFilter) params.isAvailable = availabilityFilter;

      response = await menuAPI.getAll(params);
    }

    setMenuItems(response.data || []);
  } catch (error) {
    console.error('Error fetching menu items:', error);
    alert('Failed to load menu items');
  } finally {
    setLoading(false);
  }
}, [debouncedSearchQuery, selectedCategory, availabilityFilter]);

  // Fetch on mount and when filters/search change
useEffect(() => {
  fetchMenuItems();
}, [fetchMenuItems]);


  // Handle create/update
  const handleSubmit = async (formData) => {
    setIsSubmitting(true);
    try {
      if (editingItem) {
        await menuAPI.update(editingItem._id, formData);
      } else {
        await menuAPI.create(formData);
      }
      
      setShowForm(false);
      setEditingItem(null);
      fetchMenuItems();
    } catch (error) {
      alert('Failed to save menu item: ' + (error.response?.data?.message || error.message));
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle delete
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        await menuAPI.delete(id);
        fetchMenuItems();
      } catch (error) {
        alert('Failed to delete menu item: ' + (error.response?.data?.message || error.message));
      }
    }
  };

  // Handle edit
  const handleEdit = (item) => {
    setEditingItem(item);
    setShowForm(true);
  };

  // Handle add new
  const handleAddNew = () => {
    setEditingItem(null);
    setShowForm(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Menu Management</h1>
        <p className="text-gray-600">Manage your restaurant menu items</p>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <div className="md:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search by name or ingredients..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500 appearance-none"
              >
                <option value="">All Categories</option>
                <option value="Appetizer">Appetizer</option>
                <option value="Main Course">Main Course</option>
                <option value="Dessert">Dessert</option>
                <option value="Beverage">Beverage</option>
              </select>
            </div>
          </div>

          {/* Availability Filter */}
          <div>
            <select
              value={availabilityFilter}
              onChange={(e) => setAvailabilityFilter(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="">All Items</option>
              <option value="true">Available Only</option>
              <option value="false">Unavailable Only</option>
            </select>
          </div>
        </div>

        {/* Add New Button */}
        <div className="mt-4">
          <button
            onClick={handleAddNew}
            className="w-full md:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
          >
            <Plus className="h-5 w-5" />
            Add New Menu Item
          </button>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center py-12">
          <Loader className="h-8 w-8 animate-spin text-primary-600" />
          <span className="ml-2 text-gray-600">Loading menu items...</span>
        </div>
      )}

      {/* Menu Items Grid */}
      {!loading && menuItems.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {menuItems.map((item) => (
            <MenuCard
              key={item._id}
              item={item}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onUpdate={fetchMenuItems}
            />
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && menuItems.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg mb-4">
            {searchQuery || selectedCategory || availabilityFilter
              ? 'No menu items found matching your criteria'
              : 'No menu items yet'}
          </p>
          <button
            onClick={handleAddNew}
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-md hover:bg-primary-700"
          >
            <Plus className="h-5 w-5" />
            Add Your First Menu Item
          </button>
        </div>
      )}

      {/* Menu Form Modal */}
      {showForm && (
        <MenuForm
          item={editingItem}
          onClose={() => {
            setShowForm(false);
            setEditingItem(null);
          }}
          onSubmit={handleSubmit}
          isLoading={isSubmitting}
        />
      )}
    </div>
  );
};

export default MenuManagement;

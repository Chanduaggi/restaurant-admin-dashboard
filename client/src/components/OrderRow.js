import React, { useState } from 'react';
import { ChevronDown, ChevronUp, User, Hash } from 'lucide-react';
import { orderAPI } from '../utils/api';

const OrderRow = ({ order, onUpdate }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const statusColors = {
    Pending: 'bg-yellow-100 text-yellow-800',
    Preparing: 'bg-blue-100 text-blue-800',
    Ready: 'bg-green-100 text-green-800',
    Delivered: 'bg-gray-100 text-gray-800',
    Cancelled: 'bg-red-100 text-red-800'
  };

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    
    if (window.confirm(`Change order status to ${newStatus}?`)) {
      setIsUpdating(true);
      try {
        await orderAPI.updateStatus(order._id, newStatus);
        if (onUpdate) {
          onUpdate();
        }
      } catch (error) {
        alert('Failed to update status: ' + (error.response?.data?.message || error.message));
      } finally {
        setIsUpdating(false);
      }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden mb-4">
      {/* Order Header */}
      <div className="p-4 hover:bg-gray-50 cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
        <div className="flex items-center justify-between">
          <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Order Number */}
            <div className="flex items-center">
              <Hash className="h-5 w-5 text-gray-400 mr-2" />
              <div>
                <p className="text-xs text-gray-500">Order Number</p>
                <p className="font-semibold text-gray-900">{order.orderNumber}</p>
              </div>
            </div>

            {/* Customer */}
            <div className="flex items-center">
              <User className="h-5 w-5 text-gray-400 mr-2" />
              <div>
                <p className="text-xs text-gray-500">Customer</p>
                <p className="font-medium text-gray-900">{order.customerName}</p>
                <p className="text-xs text-gray-500">Table {order.tableNumber}</p>
              </div>
            </div>

            {/* Total */}
            <div>
              <p className="text-xs text-gray-500">Total Amount</p>
              <p className="font-bold text-primary-600 text-lg">
                ${order.totalAmount?.toFixed(2) || '0.00'}
              </p>
              <p className="text-xs text-gray-500">
                {order.itemCount || order.items?.length || 0} items
              </p>
            </div>

            {/* Status */}
            <div>
              <p className="text-xs text-gray-500 mb-1">Status</p>
              <select
                value={order.status}
                onChange={handleStatusChange}
                disabled={isUpdating}
                onClick={(e) => e.stopPropagation()}
                className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  statusColors[order.status]
                } ${isUpdating ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
              >
                <option value="Pending">Pending</option>
                <option value="Preparing">Preparing</option>
                <option value="Ready">Ready</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
          </div>

          {/* Expand Button */}
          <button className="ml-4 text-gray-400 hover:text-gray-600">
            {isExpanded ? (
              <ChevronUp className="h-6 w-6" />
            ) : (
              <ChevronDown className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Order Details (Expanded) */}
      {isExpanded && (
        <div className="border-t border-gray-200 bg-gray-50 p-4">
          <h4 className="font-semibold text-gray-900 mb-3">Order Items</h4>
          <div className="space-y-2">
            {order.items?.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-white p-3 rounded-md"
              >
                <div className="flex items-center space-x-3">
                  {item.menuItem?.imageUrl && (
                    <img
                      src={item.menuItem.imageUrl}
                      alt={item.menuItem?.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                  )}
                  <div>
                    <p className="font-medium text-gray-900">
                      {item.menuItem?.name || 'Unknown Item'}
                    </p>
                    <p className="text-sm text-gray-500">
                      {item.menuItem?.category} • ${item.price?.toFixed(2)}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">
                    x {item.quantity}
                  </p>
                  <p className="text-sm text-gray-600">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-3 pt-3 border-t border-gray-200">
            <p className="text-xs text-gray-500">
              Created: {new Date(order.createdAt).toLocaleString()}
            </p>
            {order.updatedAt !== order.createdAt && (
              <p className="text-xs text-gray-500">
                Updated: {new Date(order.updatedAt).toLocaleString()}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderRow;

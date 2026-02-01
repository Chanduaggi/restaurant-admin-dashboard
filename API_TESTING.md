# API Testing Guide - Restaurant Admin Dashboard

This file contains all API endpoints for testing with Postman, Thunder Client, or REST Client.

## Base URL
```
Local: http://localhost:5000/api
Production: https://your-app.onrender.com/api
```

---

## MENU ENDPOINTS

### 1. Get All Menu Items
```http
GET {{baseUrl}}/menu
```

### 2. Get Menu Items with Filters
```http
GET {{baseUrl}}/menu?category=Main Course&isAvailable=true&minPrice=10&maxPrice=25
```

### 3. Search Menu Items
```http
GET {{baseUrl}}/menu/search?q=chicken
```

### 4. Get Single Menu Item
```http
GET {{baseUrl}}/menu/{{menuItemId}}
```

### 5. Create Menu Item
```http
POST {{baseUrl}}/menu
Content-Type: application/json

{
  "name": "Spicy Chicken Wings",
  "description": "Crispy wings tossed in buffalo sauce",
  "category": "Appetizer",
  "price": 12.99,
  "ingredients": ["chicken", "buffalo sauce", "celery", "ranch"],
  "preparationTime": 15,
  "imageUrl": "https://images.unsplash.com/photo-1608039829572-78524f79c4c7?w=400",
  "isAvailable": true
}
```

### 6. Update Menu Item
```http
PUT {{baseUrl}}/menu/{{menuItemId}}
Content-Type: application/json

{
  "name": "Extra Spicy Chicken Wings",
  "price": 13.99,
  "isAvailable": false
}
```

### 7. Toggle Menu Item Availability
```http
PATCH {{baseUrl}}/menu/{{menuItemId}}/availability
```

### 8. Delete Menu Item
```http
DELETE {{baseUrl}}/menu/{{menuItemId}}
```

---

## ORDER ENDPOINTS

### 1. Get All Orders
```http
GET {{baseUrl}}/orders
```

### 2. Get Orders with Pagination
```http
GET {{baseUrl}}/orders?page=1&limit=5
```

### 3. Get Orders by Status
```http
GET {{baseUrl}}/orders?status=Pending
```

### 4. Get Single Order
```http
GET {{baseUrl}}/orders/{{orderId}}
```

### 5. Create Order
```http
POST {{baseUrl}}/orders
Content-Type: application/json

{
  "items": [
    {
      "menuItem": "{{menuItemId1}}",
      "quantity": 2
    },
    {
      "menuItem": "{{menuItemId2}}",
      "quantity": 1
    }
  ],
  "customerName": "Alice Johnson",
  "tableNumber": 7
}
```

### 6. Update Order Status
```http
PATCH {{baseUrl}}/orders/{{orderId}}/status
Content-Type: application/json

{
  "status": "Preparing"
}
```

**Valid Status Values:**
- Pending
- Preparing
- Ready
- Delivered
- Cancelled

---

## ANALYTICS ENDPOINTS

### 1. Get Top Selling Items
```http
GET {{baseUrl}}/orders/analytics/top-sellers
```

---

## HEALTH CHECK

### 1. Server Health Check
```http
GET {{baseUrl}}/health
```

### 2. Root Endpoint
```http
GET http://localhost:5000/
```

---

## Postman Collection

To import into Postman:

1. Open Postman
2. Click "Import" button
3. Create a new collection
4. Add these requests manually or use the following JSON:

```json
{
  "info": {
    "name": "Restaurant Admin API",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "variable": [
    {
      "key": "baseUrl",
      "value": "http://localhost:5000/api"
    }
  ]
}
```

---

## Testing Workflow

### Step 1: Initial Setup
1. Start MongoDB Atlas
2. Start backend server: `npm run dev`
3. Run seed script: `npm run seed`

### Step 2: Test Menu Operations
1. GET all menu items → Note an item ID
2. GET single item using ID
3. Search for "chicken"
4. Create new menu item → Save returned ID
5. Update the created item
6. Toggle availability
7. Delete the created item

### Step 3: Test Order Operations
1. GET all orders
2. Note 2-3 menu item IDs from menu
3. Create new order with those items
4. GET the created order
5. Update order status to "Preparing"
6. Update status to "Ready"
7. Update status to "Delivered"

### Step 4: Test Analytics
1. GET top sellers
2. Verify aggregation results

---

## Common Test Scenarios

### Scenario 1: Search Optimization Test
```http
# Search with different queries
GET {{baseUrl}}/menu/search?q=spicy
GET {{baseUrl}}/menu/search?q=chicken
GET {{baseUrl}}/menu/search?q=pasta
```

### Scenario 2: Filter Combinations
```http
# All appetizers that are available
GET {{baseUrl}}/menu?category=Appetizer&isAvailable=true

# Main courses in price range
GET {{baseUrl}}/menu?category=Main Course&minPrice=10&maxPrice=20

# All unavailable items
GET {{baseUrl}}/menu?isAvailable=false
```

### Scenario 3: Order Status Workflow
```http
# 1. Create order (starts as Pending)
POST {{baseUrl}}/orders
{ ... }

# 2. Update to Preparing
PATCH {{baseUrl}}/orders/{{orderId}}/status
{ "status": "Preparing" }

# 3. Update to Ready
PATCH {{baseUrl}}/orders/{{orderId}}/status
{ "status": "Ready" }

# 4. Update to Delivered
PATCH {{baseUrl}}/orders/{{orderId}}/status
{ "status": "Delivered" }
```

---

## Expected Response Formats

### Success Response
```json
{
  "success": true,
  "data": { ... }
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error (development only)"
}
```

### Validation Error
```json
{
  "success": false,
  "message": "Validation Error",
  "errors": [
    "Name is required",
    "Price must be greater than 0"
  ]
}
```

---

## Response Status Codes

- `200` - Success (GET, PUT, PATCH, DELETE)
- `201` - Created (POST)
- `400` - Bad Request (validation errors)
- `404` - Not Found
- `500` - Server Error

---

## Tips for Testing

1. **Use Variables:** In Postman, save `baseUrl`, `menuItemId`, `orderId` as variables
2. **Save IDs:** After creating items, save their IDs for update/delete operations
3. **Test Validation:** Try creating items with missing required fields
4. **Test Edge Cases:** Empty search queries, invalid IDs, negative prices
5. **Monitor Console:** Check backend logs for detailed error messages

---

## VS Code REST Client Extension

If using VS Code REST Client, create a file `api-tests.http`:

```http
@baseUrl = http://localhost:5000/api

### Get all menu items
GET {{baseUrl}}/menu

### Search menu
GET {{baseUrl}}/menu/search?q=pizza

### Create menu item
POST {{baseUrl}}/menu
Content-Type: application/json

{
  "name": "Test Item",
  "category": "Appetizer",
  "price": 9.99
}
```

Click "Send Request" above each request to test.

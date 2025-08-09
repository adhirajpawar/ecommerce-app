# Stock Functionality Implementation

## Overview
This document describes the stock availability functionality that has been implemented in the ecommerce application.

## Features Added

### 1. Product Stock Management
- **Stock Information**: Each product now has a `stock` field that indicates the available quantity
- **Random Stock Generation**: For demo purposes, products are assigned random stock levels (1-10 items)
- **Out of Stock Simulation**: 20% of products are randomly set to have 0 stock to demonstrate the functionality

### 2. Product Display Components

#### Products List (`src/components/Products.jsx`)
- **Out of Stock Badge**: Products with 0 stock display a "Out of Stock" badge
- **Stock Status**: Shows current stock level or "Out of stock" message
- **Disabled Buttons**: "Add to Cart" and "Buy Now" buttons are disabled for out-of-stock products
- **Visual Feedback**: Buttons change appearance (grayed out, reduced opacity) when disabled
- **Toast Notifications**: Users receive feedback when trying to add out-of-stock items

#### Product Detail Page (`src/pages/Product.jsx`)
- **Stock Badge**: Large "Out of Stock" badge on product image
- **Stock Information**: Displays remaining stock or out-of-stock status
- **Disabled Actions**: Add to Cart button is disabled for out-of-stock products
- **Similar Products**: Similar products also show stock status and have disabled buttons

### 3. Cart Management (`src/pages/Cart.jsx`)
- **Stock Limit Enforcement**: Users cannot add more items than available in stock
- **Stock Status Display**: Shows remaining stock for each cart item
- **Disabled Add Button**: Plus button is disabled when stock limit is reached
- **User Feedback**: Toast notifications inform users when they reach stock limits

## Technical Implementation

### Stock Data Structure
```javascript
{
  id: "product_id",
  title: "Product Name",
  price: 29.99,
  stock: 5, // Number of items available
  // ... other product fields
}
```

### Key Functions

#### Stock Check Function
```javascript
const isInStock = product.stock > 0;
```

#### Add to Cart with Stock Validation
```javascript
const addProduct = (product) => {
  if (product.stock > 0) {
    dispatch(addCart(product));
    toast.success("Added to cart");
  } else {
    toast.error("Product is out of stock");
  }
};
```

#### Cart Quantity Validation
```javascript
const addItem = (product) => {
  const currentQty = product.qty || 0;
  const stock = product.stock || 10;
  
  if (currentQty < stock) {
    dispatch(addCart(product));
  } else {
    toast.error(`Cannot add more items. Only ${stock} available in stock.`);
  }
};
```

## UI/UX Features

### Visual Indicators
- **Badges**: "Out of Stock" badges on product cards and detail pages
- **Color Coding**: 
  - Green text for available stock
  - Red text for out-of-stock items
  - Gray buttons for disabled actions
- **Opacity Changes**: Disabled buttons have reduced opacity
- **Cursor Changes**: Disabled buttons show "not-allowed" cursor

### User Feedback
- **Toast Notifications**: 
  - Success message when adding to cart
  - Error message when trying to add out-of-stock items
  - Warning when reaching stock limits in cart
- **Stock Messages**:
  - "Only 1 left!" for low stock
  - "X in stock" for normal stock levels
  - "Out of stock" for unavailable items

## Bootstrap Classes Used
- `badge bg-secondary` - Out of stock badges
- `text-success` - Available stock text
- `text-danger` - Out of stock text
- `btn-secondary` - Disabled button styling
- `position-absolute` - Badge positioning
- `opacity` and `cursor` - Button state styling

## Future Enhancements
1. **Real Stock Management**: Integrate with actual inventory system
2. **Stock Alerts**: Notify users when items come back in stock
3. **Reserve Stock**: Temporarily reserve stock during checkout process
4. **Stock History**: Track stock changes over time
5. **Low Stock Warnings**: Alert users when stock is running low

## Testing
The functionality can be tested by:
1. Refreshing the page to get new random stock values
2. Trying to add out-of-stock products to cart
3. Attempting to exceed stock limits in the cart
4. Observing visual feedback and toast notifications

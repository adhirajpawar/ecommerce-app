import React, { useState, useCallback } from 'react';
import './ProductCard.css';

const ProductCard = ({ 
  product, 
  onAddToCart, 
  isLoading = false, 
  selectedVariant = null,
  onVariantChange 
}) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  // Handle image loading states
  const handleImageLoad = useCallback(() => {
    setImageLoading(false);
    setImageError(false);
  }, []);

  const handleImageError = useCallback(() => {
    setImageLoading(false);
    setImageError(true);
  }, []);

  // Get current variant data
  const currentVariant = selectedVariant 
    ? product.variants.find(v => v.id === selectedVariant)
    : product.variants[0];

  const isInStock = currentVariant?.stock > 0;
  const stockLevel = currentVariant?.stock || 0;

  // Format price with currency
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  // Handle add to cart
  const handleAddToCartClick = () => {
    if (isInStock && onAddToCart) {
      onAddToCart({
        ...product,
        selectedVariant: currentVariant
      });
    }
  };

  // Handle variant change
  const handleVariantSelect = (variantId) => {
    if (onVariantChange) {
      onVariantChange(variantId);
    }
  };

  if (isLoading) {
    return (
      <div className="product-card product-card--loading">
        <div className="product-card__skeleton">
          <div className="product-card__image-skeleton"></div>
          <div className="product-card__content-skeleton">
            <div className="product-card__title-skeleton"></div>
            <div className="product-card__price-skeleton"></div>
            <div className="product-card__variant-skeleton"></div>
            <div className="product-card__button-skeleton"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <article className="product-card" role="article" aria-label={`Product: ${product.name}`}>
      {/* Product Image */}
      <div className="product-card__image-container">
        {imageLoading && (
          <div className="product-card__image-loading">
            <div className="product-card__spinner"></div>
          </div>
        )}
        
        {imageError ? (
          <div className="product-card__image-fallback">
            <svg width="100" height="100" viewBox="0 0 24 24" fill="currentColor">
              <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
            </svg>
          </div>
        ) : (
          <img
            className="product-card__image"
            src={product.image}
            alt={product.name}
            onLoad={handleImageLoad}
            onError={handleImageError}
            loading="lazy"
          />
        )}

        {/* Sale Badge */}
        {product.isOnSale && (
          <div className="product-card__badge product-card__badge--sale">
            -{product.discountPercentage}%
          </div>
        )}

        {/* Stock Badge */}
        {!isInStock && (
          <div className="product-card__badge product-card__badge--out-of-stock">
            Out of Stock
          </div>
        )}
      </div>

      {/* Product Content */}
      <div className="product-card__content">
        {/* Product Title */}
        <h3 className="product-card__title" title={product.name}>
          {product.name}
        </h3>

        {/* Price Section */}
        <div className="product-card__price-section">
          <span className="product-card__price">
            {formatPrice(product.price)}
          </span>
          {product.isOnSale && product.originalPrice && (
            <span className="product-card__original-price">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>

        {/* Variants Section */}
        {product.variants && product.variants.length > 0 && (
          <div className="product-card__variants">
            <label className="product-card__variant-label">
              Select Variant:
            </label>
            <select
              className="product-card__variant-select"
              value={selectedVariant || product.variants[0]?.id || ''}
              onChange={(e) => handleVariantSelect(e.target.value)}
              aria-label="Select product variant"
            >
              {product.variants.map((variant) => (
                <option
                  key={variant.id}
                  value={variant.id}
                  disabled={variant.stock === 0}
                >
                  {variant.size} - {variant.color} 
                  {variant.stock === 0 ? ' (Out of Stock)' : ` (${variant.stock} left)`}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Stock Status */}
        <div className="product-card__stock-status">
          {isInStock ? (
            <span className="product-card__stock-available">
              {stockLevel === 1 ? 'Only 1 left!' : `${stockLevel} in stock`}
            </span>
          ) : (
            <span className="product-card__stock-unavailable">
              Out of stock
            </span>
          )}
        </div>

        {/* Add to Cart Button */}
        <button
          className={`product-card__button ${!isInStock ? 'product-card__button--disabled' : ''}`}
          onClick={handleAddToCartClick}
          disabled={!isInStock}
          aria-label={isInStock ? 'Add to cart' : 'Out of stock'}
        >
          {isInStock ? 'Add to Cart' : 'Out of Stock'}
        </button>
      </div>
    </article>
  );
};

export default ProductCard;

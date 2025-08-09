import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import { sampleProducts, simulateLoading } from './testData';
import './ProductGrid.css';

const ProductGrid = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedVariants, setSelectedVariants] = useState({});

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const data = await simulateLoading(1500); // Simulate API call
        setProducts(data);
      } catch (error) {
        console.error('Failed to load products:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const handleAddToCart = (product) => {
    console.log('Added to cart:', product);
    // In a real app, this would dispatch to Redux or call an API
    alert(`Added ${product.name} to cart!`);
  };

  const handleVariantChange = (productId, variantId) => {
    setSelectedVariants(prev => ({
      ...prev,
      [productId]: variantId
    }));
  };

  if (loading) {
    return (
      <div className="product-grid">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="product-grid__item">
            <ProductCard
              product={sampleProducts[0]}
              isLoading={true}
            />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="product-grid">
      {products.map((product) => (
        <div key={product.id} className="product-grid__item">
          <ProductCard
            product={product}
            onAddToCart={handleAddToCart}
            selectedVariant={selectedVariants[product.id]}
            onVariantChange={(variantId) => handleVariantChange(product.id, variantId)}
            isLoading={false}
          />
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;

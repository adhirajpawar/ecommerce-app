import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addCart } from "../redux/action";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const Products = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState(data);
  const [loading, setLoading] = useState(false);
  let componentMounted = true;

  const dispatch = useDispatch();

  const addProduct = (product) => {
    // Check if product is in stock before adding to cart
    if (product.stock > 0) {
      dispatch(addCart(product));
      toast.success("Added to cart");
    } else {
      toast.error("Product is out of stock");
    }
  };

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      const response = await fetch("https://fakestoreapi.com/products/");
      if (componentMounted) {
        const productsData = await response.clone().json();
        
        // Add stock information to products (simulating real stock data)
        const productsWithStock = productsData.map(product => ({
          ...product,
          stock: Math.floor(Math.random() * 10) + 1, // Random stock between 1-10 for demo
          // For demo purposes, make some products out of stock
          ...(Math.random() > 0.8 && { stock: 0 }) // 20% chance of being out of stock
        }));
        
        setData(productsWithStock);
        setFilter(productsWithStock);
        setLoading(false);
      }

      return () => {
        componentMounted = false;
      };
    };

    getProducts();
  }, []);

  const Loading = () => {
    return (
      <>
        <div className="col-12 py-5 text-center">
          <Skeleton height={40} width={560} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
      </>
    );
  };

  const filterProduct = (cat) => {
    const updatedList = data.filter((item) => item.category === cat);
    setFilter(updatedList);
  };

  const ShowProducts = () => {
    return (
      <>
        <div className="buttons text-center py-5">
          <button
            className="btn btn-outline-dark btn-sm m-2"
            onClick={() => setFilter(data)}
          >
            All
          </button>
          <button
            className="btn btn-outline-dark btn-sm m-2"
            onClick={() => filterProduct("men's clothing")}
          >
            Men's Clothing
          </button>
          <button
            className="btn btn-outline-dark btn-sm m-2"
            onClick={() => filterProduct("women's clothing")}
          >
            Women's Clothing
          </button>
          <button
            className="btn btn-outline-dark btn-sm m-2"
            onClick={() => filterProduct("jewelery")}
          >
            Jewelery
          </button>
          <button
            className="btn btn-outline-dark btn-sm m-2"
            onClick={() => filterProduct("electronics")}
          >
            Electronics
          </button>
        </div>

        {filter.map((product) => {
          const isInStock = product.stock > 0;
          return (
            <div
              id={product.id}
              key={product.id}
              className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4"
            >
              <div className="card text-center h-100" key={product.id}>
                {/* Out of Stock Badge */}
                {!isInStock && (
                  <div className="position-absolute top-0 end-0 m-2">
                    <span className="badge bg-secondary">Out of Stock</span>
                  </div>
                )}
                <img
                  className="card-img-top p-3"
                  src={product.image}
                  alt="Card"
                  height={300}
                />
                <div className="card-body">
                  <h5 className="card-title">
                    {product.title.substring(0, 12)}...
                  </h5>
                  <p className="card-text">
                    {product.description.substring(0, 90)}...
                  </p>
                </div>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item lead">$ {product.price}</li>
                  {/* Stock Status */}
                  <li className="list-group-item">
                    {isInStock ? (
                      <small className="text-success">
                        {product.stock === 1 ? 'Only 1 left!' : `${product.stock} in stock`}
                      </small>
                    ) : (
                      <small className="text-danger">Out of stock</small>
                    )}
                  </li>
                </ul>
                <div className="card-body">
                  <Link
                    to={"/product/" + product.id}
                    className={`btn ${isInStock ? 'btn-dark' : 'btn-secondary'} m-1`}
                    style={{ pointerEvents: isInStock ? 'auto' : 'none' }}
                  >
                    {isInStock ? 'Buy Now' : 'Out of Stock'}
                  </Link>
                  <button
                    className={`btn ${isInStock ? 'btn-dark' : 'btn-secondary'} m-1`}
                    onClick={() => addProduct(product)}
                    disabled={!isInStock}
                    style={{ 
                      opacity: isInStock ? 1 : 0.6,
                      cursor: isInStock ? 'pointer' : 'not-allowed'
                    }}
                  >
                    {isInStock ? 'Add to Cart' : 'Out of Stock'}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </>
    );
  };
  return (
    <>
      <div className="container my-3 py-3">
        <div className="row">
          <div className="col-12">
            <h2 className="display-5 text-center">Latest Products</h2>
            <hr />
          </div>
        </div>
        <div className="row justify-content-center">
          {loading ? <Loading /> : <ShowProducts />}
        </div>
      </div>
    </>
  );
};

export default Products;

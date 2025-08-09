import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { Link, useParams } from "react-router-dom";
import Marquee from "react-fast-marquee";
import { useDispatch } from "react-redux";
import { addCart } from "../redux/action";

import { Footer, Navbar } from "../components";
import toast from "react-hot-toast";

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState([]);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);

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
    const getProduct = async () => {
      setLoading(true);
      setLoading2(true);
      const response = await fetch(`https://fakestoreapi.com/products/${id}`);
      const data = await response.json();
      
      // Add stock information to product (simulating real stock data)
      const productWithStock = {
        ...data,
        stock: Math.floor(Math.random() * 10) + 1, // Random stock between 1-10 for demo
        // For demo purposes, make some products out of stock
        ...(Math.random() > 0.8 && { stock: 0 }) // 20% chance of being out of stock
      };
      
      setProduct(productWithStock);
      setLoading(false);
      
      const response2 = await fetch(
        `https://fakestoreapi.com/products/category/${data.category}`
      );
      const data2 = await response2.json();
      
      // Add stock information to similar products
      const similarProductsWithStock = data2.map(product => ({
        ...product,
        stock: Math.floor(Math.random() * 10) + 1,
        ...(Math.random() > 0.8 && { stock: 0 })
      }));
      
      setSimilarProducts(similarProductsWithStock);
      setLoading2(false);
    };
    getProduct();
  }, [id]);

  const Loading = () => {
    return (
      <>
        <div className="container my-5 py-2">
          <div className="row">
            <div className="col-md-6 py-3">
              <Skeleton height={400} width={400} />
            </div>
            <div className="col-md-6 py-5">
              <Skeleton height={30} width={250} />
              <Skeleton height={90} />
              <Skeleton height={40} width={70} />
              <Skeleton height={50} width={110} />
              <Skeleton height={120} />
              <Skeleton height={40} width={110} inline={true} />
              <Skeleton className="mx-3" height={40} width={110} />
            </div>
          </div>
        </div>
      </>
    );
  };

  const ShowProduct = () => {
    const isInStock = product.stock > 0;
    
    return (
      <>
        <div className="container my-5 py-2">
          <div className="row">
            <div className="col-md-6 col-sm-12 py-3 position-relative">
              {/* Out of Stock Badge */}
              {!isInStock && (
                <div className="position-absolute top-0 end-0 m-3">
                  <span className="badge bg-secondary fs-6">Out of Stock</span>
                </div>
              )}
              <img
                className="img-fluid"
                src={product.image}
                alt={product.title}
                width="400px"
                height="400px"
              />
            </div>
            <div className="col-md-6 col-md-6 py-5">
              <h4 className="text-uppercase text-muted">{product.category}</h4>
              <h1 className="display-5">{product.title}</h1>
              <p className="lead">
                {product.rating && product.rating.rate}{" "}
                <i className="fa fa-star"></i>
              </p>
              <h3 className="display-6  my-4">${product.price}</h3>
              <p className="lead">{product.description}</p>
              
              {/* Stock Status */}
              <div className="mb-3">
                {isInStock ? (
                  <small className="text-success">
                    {product.stock === 1 ? 'Only 1 left!' : `${product.stock} in stock`}
                  </small>
                ) : (
                  <small className="text-danger">Out of stock</small>
                )}
              </div>
              
              <button
                className={`btn ${isInStock ? 'btn-outline-dark' : 'btn-secondary'}`}
                onClick={() => addProduct(product)}
                disabled={!isInStock}
                style={{ 
                  opacity: isInStock ? 1 : 0.6,
                  cursor: isInStock ? 'pointer' : 'not-allowed'
                }}
              >
                {isInStock ? 'Add to Cart' : 'Out of Stock'}
              </button>
              <Link to="/cart" className="btn btn-dark mx-3">
                Go to Cart
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  };

  const Loading2 = () => {
    return (
      <>
        <div className="my-4 py-4">
          <div className="d-flex">
            <div className="mx-4">
              <Skeleton height={400} width={250} />
            </div>
            <div className="mx-4">
              <Skeleton height={400} width={250} />
            </div>
            <div className="mx-4">
              <Skeleton height={400} width={250} />
            </div>
            <div className="mx-4">
              <Skeleton height={400} width={250} />
            </div>
          </div>
        </div>
      </>
    );
  };

  const ShowSimilarProduct = () => {
    return (
      <>
        <div className="py-4 my-4">
          <div className="d-flex">
            {similarProducts.map((item) => {
              const isInStock = item.stock > 0;
              return (
                <div key={item.id} className="card mx-4 text-center position-relative">
                  {/* Out of Stock Badge */}
                  {!isInStock && (
                    <div className="position-absolute top-0 end-0 m-2">
                      <span className="badge bg-secondary">Out of Stock</span>
                    </div>
                  )}
                  <img
                    className="card-img-top p-3"
                    src={item.image}
                    alt="Card"
                    height={300}
                    width={300}
                  />
                  <div className="card-body">
                    <h5 className="card-title">
                      {item.title.substring(0, 15)}...
                    </h5>
                    {/* Stock Status */}
                    <small className={isInStock ? 'text-success' : 'text-danger'}>
                      {isInStock ? 
                        (item.stock === 1 ? 'Only 1 left!' : `${item.stock} in stock`) : 
                        'Out of stock'
                      }
                    </small>
                  </div>
                  <div className="card-body">
                    <Link
                      to={"/product/" + item.id}
                      className={`btn ${isInStock ? 'btn-dark' : 'btn-secondary'} m-1`}
                      style={{ pointerEvents: isInStock ? 'auto' : 'none' }}
                    >
                      {isInStock ? 'Buy Now' : 'Out of Stock'}
                    </Link>
                    <button
                      className={`btn ${isInStock ? 'btn-dark' : 'btn-secondary'} m-1`}
                      onClick={() => addProduct(item)}
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
              );
            })}
          </div>
        </div>
      </>
    );
  };
  return (
    <>
      <Navbar />
      <div className="container">
        <div className="row">{loading ? <Loading /> : <ShowProduct />}</div>
        <div className="row my-5 py-5">
          <div className="d-none d-md-block">
          <h2 className="">You may also Like</h2>
            <Marquee
              pauseOnHover={true}
              pauseOnClick={true}
              speed={50}
            >
              {loading2 ? <Loading2 /> : <ShowSimilarProduct />}
            </Marquee>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Product;

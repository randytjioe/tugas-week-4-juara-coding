// ProductCatalog.js
import React, { useContext, useEffect, useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import Spinner from "react-bootstrap/Spinner";
import axios from "axios";
import NavBar from "./Navbar";
const ProductCatalog = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user, logout } = useAuth();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://fakestoreapi.com/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    if (user) {
      fetchProducts();
      setIsLoading(false);
    }
  }, [user]);

  const handleAddToCart = (productId) => {
    const productToAdd = products.find((product) => product.id === productId);
    if (!productToAdd) {
      console.error("Product not found");
      return;
    }

    let cartItems = localStorage.getItem("cartItems");
    if (!cartItems) {
      cartItems = [];
    } else {
      cartItems = JSON.parse(cartItems);
    }

    cartItems.push(productToAdd);

    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    alert("Product added to cart!");
  };

  return (
    <>
      {isLoading ? (
        <>
          <Spinner animation="border" role="status"></Spinner>
        </>
      ) : (
        <>
          <NavBar />
          <Container>
            <h2>Product Catalog</h2>
            <Row>
              {products.map((product) => (
                <Col key={product.id} md={4} className="p-3">
                  <Card className="w-100 h-100 justify-content-center align-content-center align-items-center p-3 ">
                    <Card.Img
                      className="w-50 h-50"
                      variant="top"
                      src={product.image}
                    />
                    <Card.Body>
                      <Card.Title>{product.title}</Card.Title>
                      <Card.Text>Price: ${product.price}</Card.Text>

                      <Button
                        variant="primary"
                        onClick={() => handleAddToCart(product.id)}
                      >
                        Add to Cart
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Container>
        </>
      )}
    </>
  );
};

export default ProductCatalog;

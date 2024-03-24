import React, { useContext, useEffect, useState } from "react";
import { ListGroup, Button, Container, Card } from "react-bootstrap";
import { CartContext } from "../contexts/CartContext";
import NavBar from "./Navbar";

const ShoppingCart = () => {
  const { removeFromCart } = useContext(CartContext);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem("cartItems"));
    if (storedCartItems) {
      setCartItems(storedCartItems);
    }
  }, []);
  const handleRemoveFromCart = (index) => {
    const updatedCartItems = [...cartItems];
    updatedCartItems.splice(index, 1);
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
    setCartItems(updatedCartItems);
  };
  return (
    <>
      <NavBar />
      <Container>
        <h2>Shopping Cart</h2>
        <ListGroup>
          {cartItems.map((item, index) => (
            <ListGroup.Item key={index}>
              <Card>
                <Card.Body>
                  <Card.Text>{item.title}</Card.Text>
                  <Card.Img
                    variant="top"
                    src={item.image}
                    style={{ width: "100px", height: "100px" }}
                  />
                  <Card.Text>Price: {item.price}</Card.Text>
                  <Button
                    variant="danger"
                    onClick={() => handleRemoveFromCart(index)}
                  >
                    Remove
                  </Button>
                </Card.Body>
              </Card>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Container>
    </>
  );
};

export default ShoppingCart;

// Navbar.js
import React, { useContext } from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";

const NavBar = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <Navbar
      bg="light"
      expand="lg"
      className="justify-content-center align-content-center align-items-center pl-5 pr-7"
    >
      <Navbar.Brand href="/">My Store</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto  align-content-between">
          <Nav.Link href="/" className="pr-5">
            Catalog
          </Nav.Link>
          {user ? (
            <>
              <Nav.Link className="pr-5" href="/shopping-cart">
                Cart
              </Nav.Link>
              <Button variant="outline-primary" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <Nav.Link href="/login">Login</Nav.Link>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;

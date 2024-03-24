// Login.js
import React, { useContext, useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { user, login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate(`/`, { replace: true });
    } catch (error) {
      setError("Invalid email or password");
      console.log("Login failed:", error);
    }
  };

  return (
    <div className="login m-5 gap-5">
      <h2>Login</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleLogin}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            className="mb-3"
            type="text"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button className="mt-3" variant="primary" type="submit">
          Login
        </Button>
      </Form>
    </div>
  );
};

export default Login;

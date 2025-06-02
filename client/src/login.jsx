import  { useState } from "react";
import { Form, Button, Container, Card, Alert, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import instance from "./axiosConfig";
import './styles/login.css';
  

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await instance.post("/loginstudents/login", {
        email,
        password,
      });

      if (response.status === 200) {
        setMessage(response.data.message);
        if (response.data.user.firstTimesignin) {
          navigate("/changePassword");
        } else {
          navigate("/");
        }
      } else {
        setMessage(response.data.message);
      }
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
        "An error occurred. Please try again later."
      );
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <Row className="w-100 justify-content-center">
        <Col xs={12} sm={8} md={6} lg={4}>
          <Card className="login-card">
            <Card.Body>
              <h3 className="text-center">Login</h3>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="email" className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="password" className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Form.Group>

                <Button type="submit" className="btn-login w-100">
                  Login
                </Button>
              </Form>

              {message && <Alert variant="danger" className="mt-3 text-center">{message}</Alert>}

            
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;

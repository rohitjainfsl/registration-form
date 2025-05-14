import React, { useState } from "react";
import { Form, Button, Container, Card, Alert, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import instance from "../axiosConfig";

function AdminLogin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await instance.post("/new/adminLogin", { email, password }, { withCredentials: true });

            if (response.status === 200) {
                setMessage(response.data.message);
                navigate("");
            } else {
                setMessage(response.data.message);
            }
        } catch (error) {
            setMessage(
                error.response?.data?.message || "Something went wrong. Please try again."
            );
        }
    };

    return (
        <Container className="d-flex justify-content-center align-items-center min-vh-100">
            <Row className="w-100 justify-content-center">
                <Col xs={12} sm={8} md={6} lg={4}>
                    <Card className="login-card">
                        <Card.Body>
                            <h3 className="text-center">Admin Login</h3>
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

                            {message && (
                                <Alert
                                    variant={messageType === "success" ? "success" : "danger"}
                                    className="mt-3 text-center"
                                >
                                    {message}
                                </Alert>
                            )}

                            <div className="text-center mt-3">
                                <p className="small">
                                    Not an admin? <a href="/login" className="text-primary">Go to User Login</a>
                                </p>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default AdminLogin;

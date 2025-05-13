import React, { useEffect, useRef } from 'react';
import { Container, Form, Button, Card } from 'react-bootstrap';
import '../styles/AdminLogin.css'; 

function AdminLogin() {
    const emailRef = useRef(null);


    return (
        <Container className="admin-login-container">
            <Card className="admin-login-card">
                <Card.Body>
                    <Card.Title className="admin-login-title">Admin Login</Card.Title>
                    <Form>
                        <Form.Group controlId="formBasicEmail" className="mb-3">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter your Email"
                                autoFocus
                            />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword" className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Enter your Password" />
                        </Form.Group>

                        <div className="admin-login-button">
                            <Button variant="primary" type="submit">
                                Login
                            </Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
}

export default AdminLogin;

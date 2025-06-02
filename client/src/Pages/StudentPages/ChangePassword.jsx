import React, { useState } from "react";
import { Form, Button, Container, Card, Alert, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import instance from "../../axiosConfig";
import "../../styles/changePassword.css";

function ChangePassword() {
  const [email, setEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChangePassword = async (e) => {
    e.preventDefault();
    try {
      const response = await instance.post("/loginstudents/changePassword", {
        email,
        password: oldPassword,
        newPassword,
      });

      if (response.status === 200) {
        setMessage(response.data.message);
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        setMessage(response.data.message);
      }
    } catch (error) {
      setMessage(
        error.response?.data?.message || "An error occurred. Please try again."
      );
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <Row className="w-100 justify-content-center">
        <Col xs={12} sm={8} md={6} lg={4}>
          <Card className="change-password-card">
            <Card.Body>
              <h3 className="text-center">Change Password</h3>
              <Form onSubmit={handleChangePassword}>
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

                <Form.Group controlId="oldPassword" className="mb-3">
                  <Form.Label>Old Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter your old password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="newPassword" className="mb-3">
                  <Form.Label>New Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter your new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />
                </Form.Group>

                <Button type="submit" className="btn-update w-100">
                  Update Password
                </Button>
              </Form>

              {message && (
                <Alert
                  variant={
                    message === "Password updated successfully."
                      ? "success"
                      : "danger"
                  }
                  className="mt-3 text-center"
                >
                  {message}
                </Alert>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default ChangePassword;

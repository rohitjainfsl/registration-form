import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import instance from "./axiosConfig";

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
      setMessage(error.response?.data?.message || "An error occurred. Please try again.");
    }
  };

  return (
    <div className="change-password-container">
      <div className="change-password-card">
        <h3 className="change-password-title">Change Password</h3>
        <form onSubmit={handleChangePassword}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="oldPassword">Old Password</label>
            <input
              type="password"
              id="oldPassword"
              placeholder="Enter your old password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="newPassword">New Password</label>
            <input
              type="password"
              id="newPassword"
              placeholder="Enter your new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="change-password-button">
            Update Password
          </button>
        </form>
        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
}

export default ChangePassword;

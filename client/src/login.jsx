// import React, { useState } from "react";
// // import instance from "../utils/axiosInstance";
// import instance from "./axiosConfig";
// import { useNavigate } from "react-router-dom";

// function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [message, setMessage] = useState("");
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await instance.post("/loginstudents/login", {
//         email,
//         password,
//       });

//       if (response.status === 200) {
//         setMessage(response.data.message);
//         // console.log(response.data);
//         if (response.data.user.firstTimesignin) {
//           navigate("/changePassword");
//         } else {
//           navigate("/");
//         }
//       } else {
//         setMessage(response.data.message);
//       }
//     } catch (error) {
//       setMessage(
//         error.response?.data?.message ||
//           "An error occurred. Please try again later."
//       );
//     }
//   };

//   return (
//     <div className="login-container">
//       <div className="login-card">
//         <h3 className="login-title">Login</h3>
//         <form onSubmit={handleSubmit}>
//           <div className="form-group">
//             <label htmlFor="email">Email</label>
//             <input
//               type="email"
//               id="email"
//               placeholder="Enter your email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="password">Password</label>
//             <input
//               type="password"
//               id="password"
//               placeholder="Enter your password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//           </div>
//           <button type="submit" className="login-button">
//             Login
//           </button>
//         </form>
//         {message && <p className="message">{message}</p>}
//         <div className="register-link">
//           Don't have an account? <a href="/register">Register here</a>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Login;


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import instance from "./axiosConfig";

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
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h3 className="text-xl font-semibold text-center mb-4">Login</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 p-2 w-full border rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 p-2 w-full border rounded-lg"
            />
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition">
            Login
          </button>
        </form>
        {message && <p className="text-center text-red-500 mt-2">{message}</p>}
        <div className="text-center mt-4">
          <p className="text-sm">Don't have an account? <a href="/register" className="text-blue-500 hover:underline">Register here</a></p>
        </div>
      </div>
    </div>
  );
}

export default Login;
